(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('ListController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase',
    function($scope, $stateParams, $location, $state, PlacesDatabase) {
      PlacesDatabase.data().then(function(db) {
        var list = db[0].features;
        $scope.currentCountryFilter = null;
        $scope.currentTagFilter = null;
        // listen for country filter change
        $scope.countrySelect = function(countryCode) {
          $scope.currentCountryFilter = countryCode;
          $scope.updateFilteredResults();
        };
        // listen for tag filter change
        $scope.tagSelect = function(tag) {
          $scope.currentTagFilter = tag;
          $scope.updateFilteredResults();
        };
        // update filtered results
        $scope.updateFilteredResults = function() {
          list = _.filter(db[0].features, function(entry) {
            var visible = true;
            if($scope.currentCountryFilter && entry.properties.countryCode !== $scope.currentCountryFilter) {
              visible = false;
            }
            if($scope.currentTagFilter && !_.contains(entry.properties.tags, $scope.currentTagFilter)) {
              visible = false;
            }
            return visible;
          });
          $scope.currentPage = 1;
          $scope.totalItems = list.length;
          $scope.pageChanged();
        };
        // clear filters
        $scope.clearFilters = function() {
          $scope.currentCountryFilter = null;
          $scope.currentTagFilter = null;
          $scope.updateFilteredResults();
        };
        // always start on first page
        $scope.currentPage = 1;
        $scope.itemsPerPage = $state.current.data.itemsPerPage;
        $scope.itemsPerRow = $state.current.data.itemsPerRow;
        var splitIntoRows = $scope.itemsPerRow > 1;
        $scope.totalItems = list.length;
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
              items[currentRow].push(list[offset + j]);
            } else {
              items.push(list[offset + j]);
            }
          }
          $scope.places = items;
          window.scrollTo(0,0); // scroll to top
        };
        $scope.pageChanged();
      });
    }
  ]);
})();
