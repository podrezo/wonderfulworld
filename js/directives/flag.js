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
        var setFlagImage = function() {
          var countryCode = scope.countryCode || 'un';
          var size = scope.size || '16';
          attrs.$set('class', 'flag flag-' + size + '-' + countryCode.toLowerCase());
        };
        setFlagImage();
        scope.$watch('countryCode', setFlagImage);
      }
      //template: '<img ng-src="/wonderfulworld/img/flags/{{size || \'16\'}}/{{countryCode || \'_United Nations\'}}.png" alt="{{countryCode}}" class="flag"/>'
    };
  });
})();
