(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.service('utilityService', ['$uibModal',
    function($uibModal) {
      // copied from http://stackoverflow.com/questions/8678371/how-to-convert-gps-degree-to-decimal-and-vice-versa-in-jquery-or-javascript-and
      var getDMS2DD = function(days, minutes, seconds, direction) {
          direction.toUpperCase();
          var dd = days + minutes / 60 + seconds / (60 * 60);
          //alert(dd);
          if (direction == 'S' || direction == 'W') {
            dd = dd * -1;
          } // Don't do anything for N or E
          return dd;
        }
        // copied from http://stackoverflow.com/questions/8678371/how-to-convert-gps-degree-to-decimal-and-vice-versa-in-jquery-or-javascript-and
      var getDD2DMS = function(dms, type) {

        var sign = 1,
          Abs = 0;
        var days, minutes, secounds, direction;

        if (dms < 0) {
          sign = -1;
        }
        Abs = Math.abs(Math.round(dms * 1000000.));
        //Math.round is used to eliminate the small error caused by rounding in the computer:
        //e.g. 0.2 is not the same as 0.20000000000284
        //Error checks
        if (type == 'lat' && Abs > (90 * 1000000)) {
          //alert(' Degrees Latitude must be in the range of -90. to 90. ');
          return false;
        } else if (type == 'lon' && Abs > (180 * 1000000)) {
          //alert(' Degrees Longitude must be in the range of -180 to 180. ');
          return false;
        }

        days = Math.floor(Abs / 1000000);
        minutes = Math.floor(((Abs / 1000000) - days) * 60);
        secounds = (Math.floor(((((Abs / 1000000) - days) * 60) - minutes) * 100000) * 60 / 100000).toFixed();
        days = days * sign;
        if (type == 'lat') direction = days < 0 ? 'S' : 'N';
        if (type == 'lon') direction = days < 0 ? 'W' : 'E';
        //else return value
        return (days * sign) + 'º ' + minutes + '\' ' + secounds + '\'\' ' + direction;
      }

      // extension for polymaps to convert markers from a black dot into something more interesting
      // returns a *function* that will do the conversion, based on options provided
      var convertMarkers = function(po, opts) {
        // opts:
        // clickable [bool]: Whether or not the marker can be clicked, which will link to that place
        var replaceMarker = function(e) {
          for (var i = 0; i < e.features.length; i++) {
            var f = e.features[i],
              c = f.element,
              g = f.element = po.svg('image');
            g.setAttributeNS(po.ns.xlink, 'href', '/wonderfulworld/img/map-marker.png');
            g.setAttribute('width', 32);
            g.setAttribute('height', 32);
            g.setAttribute('x', -16);
            g.setAttribute('y', -32);
            g.setAttribute('transform', c.getAttribute('transform'));
            g.setAttribute('data-index', i); // store the index within the element itself for reference
            g.setAttribute('data-id', f.data.id); // store the index within the element itself for reference
            //
            if (opts && opts.clickable) {
              g.style['cursor'] = 'pointer';
              g.onclick = function(self) {
                // whenever a marker is clicked, do this
                var modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: '/wonderfulworld/template/modals/place.html',
                  controller: 'LocationModalController',
                  size: 'md',
                  resolve: {
                    placeIndex: function() {
                      // due to scoping, we can't actually return 'f.data' because it would be whatever the last element was
                      // instead, we get the index and return that
                      return parseInt(self.srcElement.getAttribute('data-index'));
                    }
                  }
                });

                modalInstance.result.then(function(selectedItem) {
                  //$scope.selected = selectedItem;
                }, function() {
                  //$log.info('Modal dismissed at: ' + new Date());
                });
              };
            }
            c.parentNode.replaceChild(g, c);
          }
        };
        return replaceMarker;
      };
      return {
        getDMS2DD: getDMS2DD,
        getDD2DMS: getDD2DMS,
        convertMarkers: convertMarkers
      };
    }
  ]);
})();
