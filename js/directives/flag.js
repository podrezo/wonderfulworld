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
      /*link: function(scope, element, attrs) {
        scope.size = scope.size || 16;
        var setFlagImage = function() {
          scope.imgUrl = scope.countryCode ? '/wonderfulworld/img/flags/'+scope.size+'/' + scope.countryCode + '.png' : '/wonderfulworld/img/flags/'+scope.size+'/_United Nations.png'
        };
        scope.$watch('countryCode', setFlagImage);
        setFlagImage();
      },
      template: '<img ng-src="{{imgUrl}}" alt="{{countryCode}}" class="flag"/>'*/
      template: '<img ng-src="/wonderfulworld/img/flags/{{size || \'16\'}}/{{countryCode || \'_United Nations\'}}.png" alt="{{countryCode}}" class="flag"/>'
    };
  });
})();
