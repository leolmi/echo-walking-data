'use strict';

angular.module('echoWalkingDataApp')
  .factory('util', ['$mdToast','$mdDialog',
    function($mdToast,$mdDialog) {

      function getToastPosition(position) {
        return Object.keys(position)
          .filter(function (pos) {
            return position[pos];
          })
          .join(' ');
      }

      /**
       * Notifica il messaggio
       * @param {string} message
       * @param {object} [position] //default: in basso a destra
       * @param {number} [delay]  //default: 3000
       */
      function toast(message, position, delay) {
        position = position || {
            bottom: true,
            top: false,
            left: false,
            right: true
          };
        delay = delay || 3000;

        if (!_.isString(message)) {
          if (message.message)
            message = message.message;
          else
            message = JSON.stringify(message);
        }

        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position(getToastPosition(position))
            .hideDelay(delay)
        );
      }

      function error(err) {
        var msg = getErrorMessage(err);
        toast(msg);
      }

      function getErrorMessage(err) {
        if (err && err.message)
          return err.message;
        if (_.isString(err))
          return err;
        if (err && err.data)
          return getErrorMessage(err.data);
        return 'Generic error!';
      }

      function getTitle(value) {
        if (!value) return value;
        value = value.replace(/([a-z])([A-Z])/g, '$1 $2');
        value = value.replace(/_/g, ' ');
        return value;
      }

      /**
       * Generate new GUID
       * @returns {string}
       */
      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

      function confirm(e, message, cancel) {
        return $mdDialog.show({
          controller: function ($scope,$mdDialog) {
            $scope.message = message;
            $scope.cancelVisible = cancel;
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
          },
          templateUrl: 'services/utilities/confirm.html',
          parent: angular.element(document.body),
          targetEvent: e,
          clickOutsideToClose: true
        })
      }

      function getDataType(type) {
        switch (type.toLowerCase()) {
          case 'number':
          case 'numeric':
          case 'float':
          case 'double':
          case 'decimal':
          case 'int':
          case 'integer':
          case 'currency':
          case 'money':
            return 'number';
          case 'date':
          case 'time':
          case 'datetime':
          case 'timestamp':
            return 'date';
          case 'string':
          case 'nchar':
          case 'nvarchar':
          case 'char':
          case 'varchar':
          case 'text':
            return 'string';
          case 'bit':
          case 'bool':
          case 'boolean':
            return 'bool';
          default:
            return 'object';
        }
      }
      function checkDatetimeValue(value) {
        if (value == null || value == undefined)
          return null;
        else if (!_.isDate(value))
          return new Date(value);
        return value;
      }
      function checkNumberValue(value) {
        if (value == null || value == undefined)
          return null;
        else if (!_.isNumber(value))
          return parseFloat(value);
        return value;
      }

      function getTypedValue(value, type) {
        if (value == null || value == undefined) return null;
        type = getDataType(type);
        switch (type) {
          case 'number':
            return checkNumberValue(value);
          case 'date':
            return checkDatetimeValue(value);
          default:
            return value;
        }
      }

      return {
        confirmResult: {
          yes: 'yes',
          no: 'no'
        },
        confirm: confirm,
        guid: guid,
        toast: toast,
        error: error,
        getTitle: getTitle,
        getErrorMessage: getErrorMessage,
        getDataType: getDataType,
        getTypedValue: getTypedValue
      }
    }]);
