'use strict';

angular.module('echoWalkingDataApp')
  .controller('MainCtrl', ['$scope', '$rootScope','echoService', 'util', 'Scenario', 'Document',
    function ($scope, $rootScope, echoService, util, Scenario, Document) {
      $scope.loading = false;
      $rootScope.currentScenario = new Scenario();
      $rootScope.currentDocument = new Document();



      function openSettings(e) {
        alert('apre le opzioni');
      }

      $scope.buttons = [{
        icon:'view_agenda',
        tooltip:'Add Query'
      }, {
        divider: true
      },{
        icon:'save',
        tooltip:'Save Document'
      },{
        icon:'settings',
        tooltip:'Settings',
        action: openSettings
      }];


      function reload(cb) {
        if ($scope.loading) return;
        $scope.loading = true;
        echoService.call('get', echoService.url.scenario + '/current')
          .then(function (scenario) {
            $rootScope.currentScenario.load(scenario);
            $scope.loading = false;
            if (cb) cb();
          }, function (err) {
            util.error(err);
            $scope.loading = false;
            if (cb) cb();
          });
      }

      $scope.getUserName = function() {
        return echoService.currentUser().name;
      };

      reload();
    }]);
