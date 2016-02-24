(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('ListController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase',
    function($scope, $stateParams, $location, $state, db) {
      // always start on first page
      $scope.currentPage = 1;
      $scope.itemsPerPage = $state.current.data.itemsPerPage;
      $scope.itemsPerRow = $state.current.data.itemsPerRow;
      var splitIntoRows = $scope.itemsPerRow > 1;
      $scope.totalItems = db.length;
      $scope.pageChanged = function() {
        // filter out which things to display
        var offset = ($scope.currentPage-1) * $scope.itemsPerPage;
        var items;
        if(splitIntoRows) {
          items = [[]];
        } else {
          items = [];
        }
        var currentRow = 0;
        for(var j=0; (j< $scope.itemsPerPage && offset + j < $scope.totalItems); j++) {
          if(splitIntoRows) {
            if(items[currentRow].length === $scope.itemsPerRow) {
              items.push([]);
              currentRow++;
            }
            items[currentRow].push(db[offset + j]);
          } else {
            items.push(db[offset + j]);
          }
        }
        $scope.places = items;
        window.scrollTo(0,0); // scroll to top
      };
      $scope.pageChanged();
    }
  ]);
})();
