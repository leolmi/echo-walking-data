'use strict';

angular.module('echoWalkingDataApp')
  .factory('Scenario', ['$rootScope','util',
    function($rootScope, util) {
      var Scenario = function () {};
      Scenario.prototype = {
        version: {
          num: '?',
          notes: '',
          updated: false
        },
        name: undefined,
        info: undefined,
        auth: false,
        title: undefined,
        load: function (s) {
          if (!s) return;
          var self = this;
          self.name = s.name;
          self.version.num = s.version.num;
          self.version.notes = s.version.notes;
          self.isnew = s.isnew;
          self._id = s._id;
          self.title = util.getTitle(s.name);
          self.info = s.info;
          self.auth = s.auth ? true : false;
          $rootScope.$broadcast('ECHO-SCENARIO-LOADED', self);
        }
      };

      return (Scenario);
    }]);
