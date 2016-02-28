(function() {
  'use strict';
  var app = angular.module('WonderfulWorld', ['ui.router', 'ngAnimate', 'ui.bootstrap']);
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      //
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/grid');
      //
      // Now set up the states
      $stateProvider
        .state('grid', {
          url: '/grid',
          templateUrl: '/wonderfulworld/template/three.html',
          controller: 'ListController',
          data: {
            itemsPerPage: 9,
            itemsPerRow: 3
          }
        })
        .state('thumbnails', {
          url: '/thumbnails',
          templateUrl: '/wonderfulworld/template/four.html',
          controller: 'ListController',
          data: {
            itemsPerPage: 16,
            itemsPerRow: 4
          }
        })
        .state('list', {
          url: '/list',
          templateUrl: '/wonderfulworld/template/one.html',
          controller: 'ListController',
          data: {
            itemsPerPage: 6,
            itemsPerRow: 1
          }
        })
        .state('map', {
          url: '/map',
          templateUrl: '/wonderfulworld/template/map.html',
          controller: 'MapController'
        })
        .state('place', {
          url: '/place/:id',
          templateUrl: '/wonderfulworld/template/place.html',
          controller: 'LocationController'
        })
        .state('about', {
          url: '/about',
          templateUrl: '/wonderfulworld/template/about.html'
        });

      $locationProvider.html5Mode(false);
    }
  ]);
  app.run(['PlacesDatabase', '$rootScope', function(PlacesDatabase, $rootScope) {
    $rootScope.dbLoaded = false;
    // load data when module is ready
    PlacesDatabase.data();
  }]);
})();
