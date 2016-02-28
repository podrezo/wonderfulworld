(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('MapController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase',
    function($scope, $stateParams, $location, $state, PlacesDatabase) {
      PlacesDatabase.data().then(function(db) {
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
          .zoom(2)
          .center({
            lat:0,
            lon:0
          })
          .add(po.image().url("http://s3.amazonaws.com/com.modestmaps.bluemarble/{Z}-r{Y}-c{X}.jpg"))
          .add(po.interact())
          .add(po.compass().pan("none"))
          .add(po.geoJson().features(db.features).on("load", replaceMarker));
      });
    }
  ]);
})();
