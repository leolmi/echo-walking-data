'use strict';

angular.module('echoWalkingDataApp')
  .factory('ResourceCsv', [
    function() {
      var ResourceCsv = function () {};
      ResourceCsv.prototype = {
        path: ''
      };

      return (ResourceCsv);
    }]);
