'use strict';

angular.module('echoWalkingDataApp')
  .factory('Document', ['$rootScope','util',
    function($rootScope, util) {
      var Document = function () {};
      Document.prototype = {
        title: 'New Walking-Data',
        resources: []
      };

      return (Document);
    }]);
