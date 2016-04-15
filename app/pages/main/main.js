'use strict';

/**
 * @ngdoc function
 * @name echoWalkingDataApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the echoWalkingDataApp
 */
angular.module('echoWalkingDataApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'util', 'Scenario','echoService',
    function ($scope, $rootScope, util, Scenario, echoService) {
      $scope.loading = false;
      $rootScope.currentScenario = new Scenario();

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
