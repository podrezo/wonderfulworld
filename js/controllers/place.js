(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('LocationController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase', 'utilityService',
    function($scope, $stateParams, $location, $state, PlacesDatabase, util) {
      PlacesDatabase.data().then(function(db) {
        db = db.features;
        $scope.place = _.findWhere(db, {
          id: $stateParams.id
        });
        $scope.friendlyLat = util.getDD2DMS($scope.place.geometry.coordinates[1],'lat');
        $scope.friendlyLon = util.getDD2DMS($scope.place.geometry.coordinates[0],'lon');
        if ($scope.place) {
          // get similar places
          $scope.similarPlaces = _.map($scope.place.properties.similarPlaces, function(similarPlaceId) {
            return _.findWhere(db, { id: similarPlaceId });
          });
          // load map
          var po = org.polymaps;

          var map = po.map()
            .container(document.getElementById("map").appendChild(po.svg("svg")))
            .zoomRange([2, 9])
            .zoom(4)
            .center({
              lat:$scope.place.geometry.coordinates[1],
              lon:$scope.place.geometry.coordinates[0]
            })
            .add(po.image().url("http://s3.amazonaws.com/com.modestmaps.bluemarble/{Z}-r{Y}-c{X}.jpg"))
            .add(po.interact())
            .add(po.compass().pan("none"))
            .add(po.geoJson().features([$scope.place]).on("load", util.convertMarkers(po)));

        } else {
          alert('Invalid ID'); // TODO Do something better here
        }
      });
    }
  ]);
})();
