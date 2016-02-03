'use strict';

/* Services */

angular.module('app.services', [])

.constant('swbCategories', [
  'big_picture_f',
  'civic_f',
  'healthy_habits_f',
  'health_conditions_f',
  'family_life_f',
  'family_stress_f',
  'summer_leisure_f',
  'job_market_f',
  'job_search_f',
  'personal_security_f',
  'fin_security_f',
  'home_finance_f'
])

.constant('swbSeries', [
  'life_eval',
  'life_eval_5',
  'happiness',
  'learn',
  'respect',
  'anger',
  'stress',
  'worry',
  'sadness',
  'laugh'
])

.constant('wellBeingAspects', [
  'current_life',
  'leisure',
  'housing',
  'loved_ones'
])

.constant('regionsMetadata', {
  USA: {
    name: 'États-Unis',
    prefix: 'US',
    label: 'All USA states + DC',
    values: {
      "DC": "District de Columbia",
      "AK": "Alaska",
      "AL": "Alabama",
      "AR": "Arkansas",
      "AZ": "Arizona",
      "CA": "Californie",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "FL": "Floride",
      "GA": "Géorgie",
      "HI": "Hawaï",
      "IA": "Iowa",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiane",
      "MA": "Massachusetts",
      "MD": "Maryland",
      "ME": "Maine",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MO": "Missouri",
      "MS": "État du Mississippi",
      "MT": "Montana",
      "NC": "Caroline du Nord",
      "ND": "Dakota du Nord",
      "NE": "Nebraska",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "Nouveau-Mexique",
      "NV": "Nevada",
      "NY": "État de New York",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PA": "Pennsylvanie",
      "RI": "Rhode Island",
      "SC": "Caroline du Sud",
      "SD": "Dakota du Sud",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VA": "Virginie",
      "VT": "Vermont",
      "WA": "État de Washington",
      "WI": "Wisconsin",
      "WV": "Virginie-Occidentale",
      "WY": "Wyoming"
    }
  },
  FR: {
    name: 'France',
    prefix: 'FR',
    label: 'All France regions',
    values: {
      "A": "Alsace",
      "B": "Aquitaine",
      "C": "Auvergne",
      "D": "Bourgogne",
      "E": "Bretagne",
      "F": "Centre",
      "G": "Champagne-Ardenne",
      "H": "Corse",
      "I": "Franche-Comté",
      "J": "Île-de-France",
      "K": "Languedoc-Roussillon",
      "L": "Limousin",
      "M": "Lorraine",
      "N": "Midi-Pyrénées",
      "O": "Nord-Pas-de-Calais",
      "P": "Basse-Normandie",
      "Q": "Haute-Normandie",
      "R": "Pays-de-la-Loire",
      "S": "Picardie",
      "T": "Poitou-Charentes",
      "U": "Provence-Alpes-Côte d'Azur",
      "V": "Rhône-Alpes",
    }
  }
})

// Facets declaration
.factory('usStatesHex', function () {
  // Namespace
  var ns = {};
  
  ns.matrix = [
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1,1,0],
    [0,1,1,1,1,1,0,1,0,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [1,0,0,0,1,0,0,1,0,0,0,0]
  ];

  ns.states = [
    { abbr: "AK", name: "Alaska" },
    { abbr: "ME", name: "Maine"},

    { abbr: "VT", name: "Vermont" },
    { abbr: "NH", name: "New Hampshire"},

    { abbr: "WA", name: "Washington" },
    { abbr: "MT", name: "Montana" },
    { abbr: "ND", name: "North Dakota" },
    { abbr: "MN", name: "Minnesota" },
    { abbr: "WI", name: "Wisconsin" },
    { abbr: "MI", name: "Michigan" },
    { abbr: "NY", name: "New York" },
    { abbr: "MA", name: "Massachusetts" },
    { abbr: "RI", name: "Rhode Island"},

    { abbr: "ID", name: "Idaho" },
    { abbr: "WY", name: "Wyoming" },
    { abbr: "SD", name: "South Dakota" },
    { abbr: "IA", name: "Iowa" },
    { abbr: "IL", name: "Illinois" },
    { abbr: "IN", name: "Indiana" },
    { abbr: "OH", name: "Ohio" },
    { abbr: "PA", name: "Pennsylvania" },
    { abbr: "NJ", name: "New Jersey" },
    { abbr: "CT", name: "Connecticut"},

    { abbr: "OR", name: "Oregon" },
    { abbr: "NV", name: "Nevada" },
    { abbr: "CO", name: "Colorado" },
    { abbr: "NE", name: "Nebraska" },
    { abbr: "MO", name: "Missouri" },
    { abbr: "KY", name: "Kentucky" },
    { abbr: "WV", name: "West Virgina" },
    { abbr: "VA", name: "Virginia" },
    { abbr: "MD", name: "Maryland" },
    { abbr: "DE", name: "Delaware"},

    { abbr: "CA", name: "California" },
    { abbr: "UT", name: "Utah" },
    { abbr: "NM", name: "New Mexico" },
    { abbr: "KS", name: "Kansas" },
    { abbr: "AR", name: "Arkansas" },
    { abbr: "TN", name: "Tennessee" },
    { abbr: "NC", name: "North Carolina" },
    { abbr: "SC", name: "South Carolina" },
    { abbr: "DC", name: "District of Columbia"},

    { abbr: "AZ", name: "Arizona" },
    { abbr: "OK", name: "Oklahoma" },
    { abbr: "LA", name: "Louisiana" },
    { abbr: "MS", name: "Mississippi" },
    { abbr: "AL", name: "Alabama" },
    { abbr: "GA", name: "Georgia"},

    { abbr: "HI", name: "Hawaii" },
    { abbr: "TX", name: "Texas" },
    { abbr: "FL", name: "Florida" }
  ];

  // Process data
  ns.data = []
  // hexagon shape variables
  var hex_di = 100
  // radius
  var hex_rad = hex_di / 2
  // apothem
  var hex_apo = hex_rad * Math.cos(Math.PI / 6)
  // stroke width around hexagon
  var stroke  = 0
  // the hover state zoom scale
  var scale = 1
  // initial x
  var x = hex_rad * scale / 2 + stroke * scale
  // initial y
  var y = hex_rad * scale + stroke * scale
  // used constants
  var pi_six = Math.PI/6;
  var cos_six = Math.cos(pi_six);
  var sin_six = Math.sin(pi_six);

  // loop variables
  var offset = false
  // initial state index
  var state_index = 0
  var i, loop_x, loc_x, s
  for(i = 0; i < ns.matrix.length; i++) {
    loop_x = offset ? hex_apo * 2 : hex_apo;
    
    loc_x = x;
    for(s = 0; s < ns.matrix[i].length; s++) {
      // grid plot in 0 and 1 array
      var grid_plot = ns.matrix[i][s];

      // if we have a plot in the grid
      if (grid_plot != 0) {
        // get the state
        var item = ns.states[state_index];
        
        // hexagon polygon points
        item.hex = [
          [loc_x + loop_x, y - hex_rad],
          [loc_x + loop_x + cos_six * hex_rad, y - sin_six * hex_rad],
          [loc_x + loop_x + cos_six * hex_rad, y + sin_six * hex_rad],
          [loc_x + loop_x, y + hex_rad],
          [loc_x + loop_x - cos_six * hex_rad, y + sin_six * hex_rad],
          [loc_x + loop_x - cos_six * hex_rad, y - sin_six * hex_rad]
        ]

        // stats
        item.xExtent = d3.extent(item.hex.map(function(d){return d[0]}))
        item.yExtent = d3.extent(item.hex.map(function(d){return d[1]}))

        ns.data.push(item);
      
        // increase the state index reference
        state_index++;
      }

      // move our x plot to next hex position
      loc_x += hex_apo * 2;
    }
    // move our y plot to next row position
    y += hex_di * 0.75; 
    // toggle offset per row
    offset = !offset;
  }

  return ns;
})

// Facets declaration
.factory('Facets', function ( wellBeingAspects ,  regionsMetadata ) {
  // Namespace
  var ns = {};
  
  Facettage.debug = true;

  // Retrieve data from cache
  ns.coeffs = Facettage.newFacet('coefficients.csv', {
    cached: true,
    type: 'csv',
    unserialize: function (data) {
      return data.map( function (d) {
        wellBeingAspects.forEach( function (key) {
          d[key] = Number(d[key]);
        });
        return d;
      })
    }
  })

  ns.getSeries = function (country, region, topic) {
    // The name is an id as well as the path in the data cache
    // FIXME: the '/'' may not be the right path separator
    var name = region + '_' + topic + '.csv';
    // Require a facet (ie. create or get already created)
    return Facettage.requireFacet(name, {
      cached: true,
      /**
       * We use csvRows instead of csv because the first line
       * is not a header
       */
      type: 'csvRows',
      unserialize: function (data) {
        // Remove header
        data.shift();
        // Parse as numbers
        return data.map(Number);
      }
    });
  }

  return ns;
})