angular.module('starter.controllers')
.factory('FinquesFact', function(cordovaGeolocationService, $ionicLoading) {
  return {
    Ubicacio: function(scope) {
      $ionicLoading.show({
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        template: '<ion-spinner icon="ripple"/>'
      });
      var successHandler = function(position) {
        scope.errorGps = false;
        $ionicLoading.hide();
        scope.finca.Pos.lat = position.coords.latitude;
        scope.finca.Pos.long = position.coords.longitude;
      };
      var errorHandler = function(error) {
        scope.errorGps = true;
        ionicLoading.hide();
        console.log('Error al obtenir coords' + error);
      };
      var options = {
        maximumAge: 5000,
        timeout: 60000,
        enableHighAccuracy: true
      };
      if (cordovaGeolocationService.checkGeolocationAvailability()) {
        cordovaGeolocationService.getCurrentPosition(successHandler, errorHandler, options);
      } else {
        alert('Geolocation API is not available.');
      }
    }
  };
})
