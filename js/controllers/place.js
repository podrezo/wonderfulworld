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
          // map entire DB into array containing similarity values
          var similarities = _.map(db, function(cmp) {
            var similarityIndex = 0;
            if (cmp.id === $stateParams.id) {
              // do not count similarities between a place and itself
              similarityIndex = -1;
            } else {
              for (var i in cmp.meta.tags) {
                for (var j in $scope.place.meta.tags) {
                  if (cmp.meta.tags[i] === $scope.place.meta.tags[j]) {
                    similarityIndex++;
                  }
                }
              }
            }
            return {
              value: cmp,
              similarityIndex: similarityIndex
            };
          });
          similarities = _.sortBy(similarities, 'similarityIndex');
          $scope.similarPlaces = [];
          for (var i = 0; i < 4; i++) {
            var currentPlace = similarities[similarities.length - 1 - i];
            // at least two tags should be the same for it to be considered similar
            if (currentPlace.similarityIndex < 2) {
              break;
            }
            $scope.similarPlaces.push(currentPlace.value);
          }
          // load map
          var replaceMarker = function(e) {
            for (var i = 0; i < e.features.length; i++) {
              var f = e.features[i],
                  c = f.element,
                  g = f.element = po.svg("image");
              g.setAttributeNS(po.ns.xlink, "href", "/wonderfulworld/img/map-marker.png");
              g.setAttribute("width", 32);
              g.setAttribute("height", 32);
              g.setAttribute("x", -16);
              g.setAttribute("y", -32);
              g.setAttribute("transform", c.getAttribute("transform"));
              c.parentNode.replaceChild(g, c);
            }
          };

          var po = org.polymaps;

          var map = po.map()
            .container(document.getElementById("map").appendChild(po.svg("svg")))
            .zoomRange([0, 9])
            .zoom(4)
            .center({
              lat:$scope.place.geometry.coordinates[1],
              lon:$scope.place.geometry.coordinates[0]
            })
            .add(po.image().url("http://s3.amazonaws.com/com.modestmaps.bluemarble/{Z}-r{Y}-c{X}.jpg"))
            .add(po.interact())
            .add(po.compass().pan("none"))
            .add(po.geoJson().features([$scope.place]).on("load", replaceMarker));

        } else {
          $scope.place = {
            id: $stateParams.id,
            name: 'Invalid ID',
            country: '',
            tags: [],
            image: 'INVALID.jpg',
            link: '/wonderfulworld',
            description: 'There is no place in the database with that ID.'
          };
        }
      });
    }
  ]);
})();
