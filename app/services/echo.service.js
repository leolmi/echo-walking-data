'use strict';

angular.module('echoWalkingDataApp')
  .factory('echoService', ['$q','$http','$rootScope',
    function($q, $http, $rootScope) {
      var TOKEN = 'echo-wd-token';
      var BASE_URL = 'http://localhost:9001/api';
      var _counter = 0;
      var _currentUser = {};

      function getConfig() {
        var config = { headers: {} };
        var token = localStorage.getItem(TOKEN);
        if (token)
          config.headers.Authorization = 'Bearer ' + token;
        return config;
      }

      function call(method, route, data) {
        _counter++;
        method = method || 'get';
        return $q(function(resolve, reject){
          var promise;
          var config = getConfig();
          var url = BASE_URL + route;
          switch (method.toLowerCase()){
            case 'post': promise = $http.post(url, data, config); break;
            case 'get': promise = $http.get(url, config); break;
            case 'delete': promise = $http.delete(url, config); break;
            case 'put': promise = $http.put(url, data, config); break;
            default: return reject();
          }
          promise.then(function(resp) {
            resolve(resp.data);
          }, function(err) {
            var status = err.status;
            switch(err.status){
              case -1:
                err = new Error('Connection refused');
                break;
              case 401:
                err = new Error('Login required!');
                $rootScope.$broadcast('ECHO-LOGIN-REQUEST');
                break;
              case 403:
                err = new Error('Permissions required!');
                break;
            }
            err.status = status;
            reject(err);
          });
        });
      }

      function logout() {
        localStorage.removeItem(TOKEN);
        _currentUser = {};
      }

      function login(user) {
        return $q(function (resolve, reject) {
          call('post', '/auth/local', {name: user.name, password: user.password})
            .then(function (data) {
              localStorage.setItem(TOKEN, data.token);
              _currentUser = user;
              resolve(_currentUser);
            }, function (err) {
              logout();
              reject(err);
            });
        });
      }

      function checkLogin() {
        var token = localStorage.getItem(TOKEN);
        if (token) {
          call('get', '/api/user/me')
            .then(function (user) {
              _currentUser = user;
            }, function (err) {
              logout();
            });
        }
      }

      function hasToken() {
        return localStorage.getItem(TOKEN) ? true : false;
      }

      $rootScope.$on('ECHO-SCENARIO-LOADED', function(e, scenario){
        if (!scenario.auth) logout();
      });

      checkLogin();

      return {
        url: {
          scenario: '/scenario',
          store: '/store',
          preview: '/store/preview',
          dataquery: '/dataquery',
          connection: '/connection',
          dataentry: '/dataentry',
          security: '/security'
        },
        currentUser: function() { return _currentUser; },
        login:login,
        logout:logout,
        call:call,
        hasToken: hasToken
      }
    }]);
