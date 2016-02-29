(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('LocationModalController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase', 'utilityService', '$uibModalInstance', 'placeIndex',
    function($scope, $stateParams, $location, $state, PlacesDatabase, util, $uibModalInstance, placeIndex) {
      PlacesDatabase.data().then(function(db) {
        db = db.features;
        $scope.place = db[placeIndex];
        $scope.friendlyLat = util.getDD2DMS($scope.place.geometry.coordinates[1],'lat');
        $scope.friendlyLon = util.getDD2DMS($scope.place.geometry.coordinates[0],'lon');

        $scope.ok = function () {
          $state.go('place', {id: $scope.place.id});
          $uibModalInstance.close();
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      });
    }
  ]);
})();
