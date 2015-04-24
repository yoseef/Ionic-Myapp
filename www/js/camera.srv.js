angular.module('starter.controllers')

.factory('CameraFact', ['$rootScope', function($rootScope) {
  return {
    getPicture: function(successCallback, errorCallback, numImatges) {
      if (numImatges < 5) {
        navigator.camera.getPicture(function(captura) {
            $rootScope.$apply(successCallback(captura));
          },
          function(error) {
            $rootScope.$apply(errorCallback(error));
          }, {
            //destinationType: Camera.DestinationType.FILE_URI
             destinationType: Camera.DestinationType.DATA_URL,
             quality: 40
          })
      }
    }
  };
}])
