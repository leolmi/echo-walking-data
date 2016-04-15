'use strict';

/**
 * @ngdoc overview
 * @name echoWalkingDataApp
 * @description
 * # echoWalkingDataApp
 *
 * Main module of the application.
 */
angular
  .module('echoWalkingDataApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'ngMaterial',
    'ngFileSaver'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .dark()
      .primaryPalette('orange');
  });
