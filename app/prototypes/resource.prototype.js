'use strict';

/**
 * Le risorse sono a disposizione per essere lette (restituiscono un elenco di record)
 * possono essere anche scritte.
 */
angular.module('echoWalkingDataApp')
  .factory('Resource', ['$q',
    function($q) {
      var Resource = function () {};
      Resource.prototype = {
        type: '',
        nameVolatile: '',
        read: function() {
          //return $q(function(resolve, reject){
          //
          //});
          throw new Error('Not implemented!');
        },
        write: function() {
          //return $q(function(resolve, reject){
          //
          //});
          throw new Error('Not implemented!');
        }
      };

      return (Resource);
    }]);
