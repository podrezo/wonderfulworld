(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.service('PlacesDatabase', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    var dbCache = null;
    var filtersDataCache = null;
    var data = function() {
      var deffered = $q.defer();
      if (dbCache) {
        deffered.resolve([dbCache, filtersDataCache]);
      } else {
        $q.all([
          $http({
              method: 'GET',
              url: '/wonderfulworld/generated/location-index.geojson'
            }),
          $http({
              method: 'GET',
              url: '/wonderfulworld/generated/filters-data.json'
            })
        ])
        .then(function successCallback(results) {
          // store database in cache
          dbCache = results[0].data;
          // store filters data in cache
          filtersDataCache = results[1].data;
          $rootScope.dbLoaded = true;
          console.log('Loaded databases!')
          deffered.resolve([dbCache, filtersDataCache]);
        }, function errorCallback(response) {
          alert('Could not load the static database file. Please refresh the page and try again.');
          deferred.reject();
        });
      }
      return deffered.promise;
    };
    return {
      data: data
    };
  }]);
})();
