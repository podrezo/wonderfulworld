(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('LocationController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase',
    function($scope, $stateParams, $location, $state, db) {
      $scope.place = _.findWhere(db, {id:$stateParams.id});
      if($scope.place) {
        // map entire DB into array containing similarity values
        var similarities = _.map(db, function(cmp) {
          var similarityIndex = 0;
          if(cmp.id === $stateParams.id) {
            // do not count similarities between a place and itself
            similarityIndex = -1;
          } else {
            for(var i in cmp.tags) {
              for(var j in $scope.place.tags) {
                if(cmp.tags[i] === $scope.place.tags[j]) {
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
        for(var i = 0; i < 4; i++) {
          var currentPlace = similarities[similarities.length-1-i];
          if(currentPlace.similarityIndex < 1) {
            break;
          }
          $scope.similarPlaces.push(currentPlace.value);
        }
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
    }
  ]);
})();
