(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.directive('flag', function() {
    return {
      scope: {
        countryCode: '=countryCode',
        size: '=size'
      },
      template: '<img ng-src="/wonderfulworld/img/flags/{{size}}/{{countryCode}}.png" alt="{{countryCode}}" class="flag"/>'
    };
  });
})();
