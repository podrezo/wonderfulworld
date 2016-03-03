(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.directive('flag', function() {
    return {
      restrict: 'A',
      scope: {
        countryCode: '=countryCode',
        size: '=size'
      },
      link: function(scope, element, attrs) {
        scope.size = scope.size || 16;
        scope.$watch('countryCode', function() {
          scope.imgUrl = scope.countryCode !== '*' ? '/wonderfulworld/img/flags/'+scope.size+'/' + scope.countryCode + '.png' : '/wonderfulworld/img/flags/'+scope.size+'/_United Nations.png'
        });
      },
      template: '<img ng-src="{{imgUrl}}" alt="{{countryCode}}" class="flag"/>'
    };
  });
})();
