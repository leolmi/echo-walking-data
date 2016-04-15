'use strict';

angular.module('echoWalkingDataApp')
  .directive('buttonsBar', [
    function () {
      return {
        restrict: "E",
        templateUrl: 'controls/buttons-bar.html',
        scope: {buttons: '=', caption:'='},
        link: function (scope, ele, atr) {
          scope.getValue = function(b, pn) {
            if (_.isFunction(b[pn]))
              return b[pn]();
            return b[pn];
          }
        }
      }
    }]);
