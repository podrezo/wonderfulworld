(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.controller('LocationController', ['$scope', '$stateParams', '$location', '$state', 'PlacesDatabase',
    function($scope, $stateParams, $location, $state, db) {
      $scope.place = _.findWhere(db, {id:$stateParams.id});
      if($scope.place) {
        // do something maybe?
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
