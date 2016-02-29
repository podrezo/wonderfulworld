(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.service('PlacesDatabase', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    var dbCache = null;
    var data = function() {
      var deffered = $q.defer();
      if (dbCache) {
        deffered.resolve(dbCache);
      } else {
        $http({
            method: 'GET',
            url: '/wonderfulworld/locations.geojson'
          })
          .then(function successCallback(response) {
            // store database in cache
            dbCache = response.data;
            // sort the database
            dbCache.features = _.sortBy(dbCache.features, function(place) {
              return place.properties.name;
            });
            $rootScope.dbLoaded = true;
            deffered.resolve(dbCache);
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
