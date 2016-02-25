(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('LocationController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase',
    function($scope, $stateParams, $location, $state, PlacesDatabase) {
      PlacesDatabase.data().then(function(db) {
        db = db.features;
        $scope.place = _.findWhere(db, {id:$stateParams.id});
        if($scope.place) {
          // map entire DB into array containing similarity values
          var similarities = _.map(db, function(cmp) {
            var similarityIndex = 0;
            if(cmp.id === $stateParams.id) {
              // do not count similarities between a place and itself
              similarityIndex = -1;
            } else {
              for(var i in cmp.meta.tags) {
                for(var j in $scope.place.meta.tags) {
                  if(cmp.meta.tags[i] === $scope.place.meta.tags[j]) {
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
            // at least two tags should be the same for it to be considered similar
            if(currentPlace.similarityIndex < 2) {
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
      });
    }
  ]);
})();
