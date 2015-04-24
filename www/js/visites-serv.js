angular.module('starter.controllers')
  .factory('VisitaFact', function(carregarLocal, guardarLocal ,  cordovaGeolocationService, $ionicLoading) {
    var visites = [];
    return {
      getVisites: function(Id_Finca) {
        visites = carregarLocal("vis-" + Id_Finca);
        if (!visites) {
          visites = [];
        }
        return visites;
      },
      persistVisites: function(Id_Finca) {
        guardarLocal("vis-" + Id_Finca, visites);
      },
      addVisita: function(v) {
        visites.push(v);
      },
      delVisita: function(index) {
        visites.splice(index, 1);
      },
      getVisita: function(index) {
        return visites[index];
      },
      replaceVisita: function(visita, index) {
        visites[index] = visita;
      },
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
          scope.visita.position.lat = position.coords.latitude;
          scope.visita.position.long = position.coords.longitude;
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
