'use strict';

angular.module('app.exploreIndex', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/explore-index', {
    templateUrl: 'src/views/exploreIndex.html',
    controller: 'ExploreIndexController'
  })
}])

.controller('ExploreIndexController', function (
  $scope,
  $rootScope,
  $location,
  $timeout,
  swbCategories,
  swbSeries,
  seriesMetadata,
  regionsMetadata,
  Facets,
  colors,
  $translate,
  $translatePartialLoader
) {
  $scope.dataCountryCodes = ['USA', 'FR']
  $scope.dataCountry = 'USA'

  var startDate = new Date(seriesMetadata[$scope.dataCountry].startDate)

  $scope.colors = colors
  $scope.month = 0
  $scope.monthNames = []
  $scope.regions = d3.keys(regionsMetadata[$scope.dataCountry].values)
  $scope.region
  $scope.regionsStatuses = {}
  $scope.regionsData = {}
  $scope.seriesDomain = []
  $scope.seriesMeasure = []
  $scope.topics = []
  $scope.topic
  $scope.topicsStatuses = {}
  $scope.topicsData = {}
  $scope.summary = summarize()
  $scope.loading = false

  // Translation
  $translatePartialLoader.addPart('generic');
  $translatePartialLoader.addPart('exploreIndex');
  $translatePartialLoader.addPart('data');
  $translate.refresh();
  $rootScope.$on('$translateChangeSuccess', updateTranslations)
  $timeout(updateTranslations)
  function updateTranslations(){
    var monthCodes = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER"
    ]
    $translate(swbCategories[$scope.dataCountry]).then(function (translations) {
      $scope.seriesDomain = swbCategories[$scope.dataCountry].map(function (d) { return {topic: d, name: translations[d]} })
      $translate(swbSeries[$scope.dataCountry]).then(function (translations) {
        $scope.seriesMeasure = swbSeries[$scope.dataCountry].map(function (d) { return {topic: d, name: translations[d]} })
        $scope.topics = $scope.seriesDomain.concat($scope.seriesMeasure)
      });
    });
    $translate(monthCodes).then(function (translations) {
      $scope.monthNames = monthCodes.map(function(d){ return translations[d] })
    });
  }

  $scope.$watch('topic', function (newValue, oldValue, $scope) {
    if (newValue !== oldValue) {
      $scope.regions.forEach(function (region) {
        $scope.regionsStatuses[region] = {loading: true}
      })
      cascadeLoadRegions($scope.topic)
    }
  })

  $scope.$watch('region', function (newValue, oldValue, $scope) {
    if (newValue !== oldValue) {
      $scope.topics.forEach(function (t) {
        $scope.topicsStatuses[t.topic] = {loading: true}
      })
      cascadeLoadTopics($scope.region)
    }
  })

  $scope.$watch('month', function (newValue, oldValue, $scope) {
    if (newValue !== oldValue) {
      $scope.summary = summarize()
    }
  })

  $scope.$watch('regionsStatuses', function (newValue, oldValue, $scope) {
    $scope.summary = summarize()
  }, true)

  $scope.regions.forEach(function (region) {
    $scope.regionsStatuses[region] = {loading: true}
  })

  $scope.topics.forEach(function (t) {
    $scope.topicsStatuses[t.topic] = {loading: true}
  })

  cascadeLoadRegions($scope.topic)
  if ($scope.region) {
    cascadeLoadTopics($scope.region)
  }

  $scope.setState = function (region) {
    $timeout(function () {
      $scope.region = region
      $scope.$apply()
    }, 0);
  }

  $scope.unselectRegion = function () {
    $scope.region = ''
  }

  $scope.regionName = function (r) {
    if (r === 'US') {
      return 'the United States'
    } else {
      return regionsMetadata.USA.values[r]
    }
  }

  $scope.topicName = function (t) {
    return $translate.instant(t)
  }

  function cascadeLoadRegions(serie) {
    if ( $scope.topic && serie == $scope.topic ) {
      $scope.regions.some(function (region) {
        if ($scope.regionsStatuses[region].loading) {
          // Load region data
          var facet = Facets.getSeries('US', region, serie)
          if (facet) {
            facet.retrieveData(function (data) {
              if ( serie == $scope.topic ) {
                $timeout(function () {
                  $scope.regionsStatuses[region].loading = false
                  $scope.regionsStatuses[region].available = data !== undefined && data.length > 0
                  $scope.regionsData[region] = data
                  cascadeLoadRegions(serie)
                  $scope.$apply()
                }, 0);
              }
            });
          } else {
            console.error('Cannot retrieve series\' facet', newValues[0], newValues[1]);
            $scope.regionsStatuses[region].loading = true
            $scope.regionsStatuses[region].available = false
            cascadeLoadRegions(serie)
          }
          return true
        }
        return false
      })
    }
  }

  function cascadeLoadTopics(region) {
    if ( $scope.region && region == $scope.region ) {
      $scope.topics.some(function (t) {
        if ($scope.topicsStatuses[t.topic].loading) {
          // Load topic data
          var facet = Facets.getSeries('US', region, t.topic)
          if (facet) {
            facet.retrieveData(function (data) {
              if ( region == $scope.region ) {
                $timeout(function () {
                  $scope.topicsStatuses[t.topic].loading = false
                  $scope.topicsStatuses[t.topic].available = data !== undefined && data.length > 0
                  $scope.topicsData[t.topic] = data
                  cascadeLoadTopics(region)
                  $scope.$apply()
                }, 0);
              }
            });
          } else {
            console.error('Cannot retrieve series\' facet', newValues[0], newValues[1]);
            $scope.topicsStatuses[t.topic].loading = true
            $scope.topicsStatuses[t.topic].available = false
            cascadeLoadTopics(region)
          }
          return true
        }
        return false
      })
    }
  }

  function summarize() {
    var date = addMonths(startDate, $scope.month)
    var d = new Date(date)
    var monthName = $scope.monthNames[d.getMonth()] || ''
    var monthDate = monthName + ' ' + d.getFullYear()
    var summary = {
      maxRegion: undefined,
      max: -Infinity,
      minRegion: undefined,
      min: +Infinity,
      date: date,
      monthDate: monthDate
    }
    var region
    for ( region in $scope.regionsData ) {
      var data = $scope.regionsData[region]
      if ( data ) {
        var score = data[$scope.month]
        if (score < summary.min) {
          summary.min = score
          summary.minRegion = region
        }
        if (score > summary.max) {
          summary.max = score
          summary.maxRegion = region
        }
      }
    }
    if ( $scope.region ) {
      var data = $scope.regionsData[$scope.region]
      if ( data ) summary.currentScore = data[$scope.month]
    }

    return summary

    function addMonths(d, m) {
      return new Date(d.getTime()).setMonth(d.getMonth() + m)
    }
  }


});