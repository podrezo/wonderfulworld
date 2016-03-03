(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.directive('imageWithPlaceholder', function() {
    return {
      restrict: 'A',
      scope: {
        srefRouteName: '@srefRouteName',
        srefRouteParams: '=srefRouteParams',
        imagePath: '@imagePath',
        altText: '@altText'
      },
      link: function(scope, element, attrs) {
      },
      templateUrl: '/wonderfulworld/template/directives/image-with-placeholder.html'
    };
  });
})();
