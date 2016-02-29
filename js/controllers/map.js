(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('MapController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase', 'utilityService',
    function($scope, $stateParams, $location, $state, PlacesDatabase, util) {
      PlacesDatabase.data().then(function(db) {
        // load map
        var po = org.polymaps;

        var map = po.map()
          .container(document.getElementById("map").appendChild(po.svg("svg")))
          .zoomRange([0, 9])
          .zoom(2)
          .center({
            lat:0,
            lon:0
          })
          .add(po.image().url("http://s3.amazonaws.com/com.modestmaps.bluemarble/{Z}-r{Y}-c{X}.jpg"))
          .add(po.interact())
          .add(po.compass().pan("none"))
          .add(po.geoJson().features(db.features).on("load", util.convertMarkers(po, {clickable: true})));
      });
    }
  ]);
})();
