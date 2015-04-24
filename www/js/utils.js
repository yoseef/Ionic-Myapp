 //creacio de id per finca
 function generateUUID() {
     var d = new Date().getTime();
     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
         var r = (d + Math.random() * 16) % 16 | 0;
         d = Math.floor(d / 16);
         return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
     });
     return uuid;
 };

 //obtenir coordenades GPS:
 var obtenirCoordenades = function() {
   alert('buscant ubicacio...');

   var onSuccess = function(position) {
     return position;
   };

   function onError(error) {
     alert('code: ' + error.code + '\n' +
       'message: ' + error.message + '\n');
   }

   navigator.geolocation.getCurrentPosition(onSuccess, onError, {
     maximumAge: 5000,
     timeout: 60000,
     enableHighAccuracy: true
   });

   //watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 5000, timeout: 60000, enableHighAccuracy: true});
 };
