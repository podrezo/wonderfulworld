(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.directive('locationFilter', ['PlacesDatabase', function(PlacesDatabase) {
    return {
      restrict: 'A',
      scope: {
        countrySelect: '&countrySelect'
      },
      link: function(scope, element, attrs) {
        PlacesDatabase.data().then(function(db) {
          scope.filtersData = db[1];
          scope.selectCountry = function(countryCode) {
            scope.selectedCountry = countryCode;
            scope.selectedCountryLabel = scope.selectedCountry === '*' ? 'All Countries' : _.findWhere(db[1].countries, {countryCode: scope.selectedCountry}).country;
            scope.countrySelect({countryCode: countryCode});
          };
          scope.selectCountry('*');
        });
      },
      templateUrl: '/wonderfulworld/template/directives/location-filter.html'
    };
  }]);
})();
