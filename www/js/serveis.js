  angular.module('starter.controllers')
    .factory('guardarLocal', function() {
      return function(key, value) {
        var dataToStore = JSON.stringify(value);
        // window.localStorage.clear(); --> borra tot?!
        window.localStorage.setItem(key, dataToStore);
      };
    })

    .factory('carregarLocal', function() {
      return function(key) {
        var localData = JSON.parse(window.localStorage.getItem(key));
        if (localData !== null) {
          return localData;
        }
      };
    })
    .factory('eliminarDelLocalStorage', function() {
      return function(key) {
        window.localStorage.removeItem(key);
      };
    })

  .factory('cordovaGeolocationService', ['$rootScope', '$log',  function($rootScope, $log) {
    return {

      /**
       * Check the geolocation plugin availability.
       * @returns {boolean}
       */
      checkGeolocationAvailability: function() {
        $log.debug('cordovaGeolocationService.checkGeolocationAvailability.');
        if (!navigator.geolocation) {
          $log.warn('Geolocation API is not available.');
          return false;
        }
        return true;
      },

      /**
       * Returns the device's current position to the geolocationSuccess callback with a Position object as the parameter.
       * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationgetcurrentposition
       */
      getCurrentPosition: function(successCallback, errorCallback, options) {
        $log.debug('cordovaGeolocationService.getCurrentPosition.');

        // Checking API availability
        // if (!this.checkGeolocationAvailability()) {
        //   return;
        // }

        // API call
        navigator.geolocation.getCurrentPosition(
          function(position) {
            $rootScope.$apply(successCallback(position));
          },
          function(error) {
            $rootScope.$apply(errorCallback(error));
          },
          options
        );
      },

      /**
       * Returns the device's current position when a change in position is detected.
       * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationwatchposition
       */
      watchPosition: function(successCallback, errorCallback, options) {
        $log.debug('cordovaGeolocationService.watchPosition.');

        // Checking API availability
        if (!this.checkGeolocationAvailability()) {
          return;
        }

        // API call
        return navigator.geolocation.watchPosition(
          function(position) {
            $rootScope.$apply(successCallback(position));
          },
          function(error) {
            $rootScope.$apply(errorCallback(error));
          },
          options
        );
      },

      /**
       * Stop watching for changes to the device's location referenced by the watchID parameter.
       * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationclearwatch
       */
      clearWatch: function(watchID) {
        $log.debug('cordovaGeolocationService.clearWatch.');

        // Checking API availability
        if (!this.checkGeolocationAvailability()) {
          return;
        }

        // API call
        navigator.geolocation.clearWatch(watchID);
      }
    };
  }])
