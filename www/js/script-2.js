var module = angular.module('app', ['onsen']);
var finca = {
  Id: 0,
  Nom: "",
  Data: new Date(),
  Descripcio: "",
  Coor: {
    lat: 0,
    long: 0
  }
};
var visita = {
  Id: 0,
  Id_Finca: 0,
  Data: new Date(),
  Observ: "",
  Fotos: [],
  Coor: {
    lat: 0,
    long: 0
  }
};


module.controller("MainCtrl", ['$scope', '$http', function($scope, $http) {

  $scope.finques = [];
  $scope.visites = [];
  $scope.finca = Object.create(finca);
  $scope.visita = Object.create(visita);
  $scope.selectedFinca;
  $scope.selectedVisita;

  //obtencio del JSON REMOT(http)
  //--->
  var config = function(m, u) {
    this.method = m;
    this.url = u;
  };
  /*
   $http(new config("GET", "finques.json"))
   .success(function (data, status, headers, config) {
   $scope.finques = data;
   })
   .error(function (data, status, headers, config) {
   alert("No s'ha pogut obtenir el rec curs. codi HTTP:" + status);
   });
   $http(new config("GET", "visites.json"))
   .success(function (data, status, headers, config) {
   $scope.visites = data;
   })
   .error(function (data, status, headers, config) {
   alert("No s'ha pogut obtenir el recurs. codi HTTP:" + status);
   });
   */

  //--->

  // guardar json en local
  //-->
  function saveLocal() {
    var dataToStore = JSON.stringify($scope.finques);
    window.localStorage.clear();
    window.localStorage.setItem("finques", dataToStore);
  }

  function loadLocal() {
    var localData = JSON.parse(window.localStorage.getItem("finques"));
    if (localData !== null) {
      $scope.finques = localData;
    }
  }


  //-->
  //figueres : 42.270045, 2.958074
  //celra : 42.025406, 2.879075
  //olot : 42.182745, 2.488055
  //vic : 41.929765, 2.254327
  function coor(lat, long) {
    this.lat = lat;
    this.long = long;
  };

  var fig = new coor("42.270045", "2.958074");
  var cel = new coor("42.025406", "2.879075");
  var olo = new coor("42.182745", "2.488055");
  var vic = new coor("41.929765", "2.254327");

  var citys = [cel, olo, vic];

  function enchufarDistancia(element, index, array) {
    element.prototype.dist = calculDistancia(fig, element);
  }
  citys.forEach(enchufarDistancia);


  //operacions:
  loadLocal();

  $scope.novaFinca = function() {
    $scope.finca = Object.create(finca);
    $scope.app.navi.pushPage('NovaFinca.html');
  };

  $scope.guardarFinca = function() {
    $scope.finca.Id = nouFincaId();
    $scope.finques.push($scope.finca);
    $scope.finca = Object.create(finca);
    saveLocal();
    $scope.menu.setMainPage('finques.html', {
      closeMenu: true
    });
  };
  $scope.editarFinca = function(fin) {
    $scope.app.navi.pushPage('EditarFinca.html');
    $scope.setSelectedFinca(fin);
    var dataString = $scope.selectedFinca.Data.toString();
    $scope.selectedFinca.Data = new Date(dataString);
  };
  $scope.modificarFinca = function() {
    $scope.finca = $scope.selectedFinca;
    saveLocal();
  };
  //quan editem seleccionem aquella finca.
  $scope.setSelectedFinca = function(finca) {
    $scope.selectedFinca = finca;
  };

  var nouFincaId = function() {
    return generateUUID();
  };

  $scope.guardarVisita = function() {
    $scope.visita.Id = generateUUID();
    $scope.visita.Id_Finca = $scope.selectedFinca.Id;
    $scope.visites.push($scope.visita);
    $scope.visita = Object.create(visita);
  };

  $scope.novaVisita = function() {
    $scope.visita = Object.create(visita);
    app.navi.pushPage('NovaVisita.html');
  };
  //quan editem seleccionem aquella visita!
  $scope.setSelectedVisit = function(visit) {
    $scope.selectedVisita = visit;
  };


  //nomes agafa les  visites de aquella finca.
  $scope.filtre = function(visita) {
    if (visita.Id_Finca === $scope.selectedFinca.Id) {
      return visita;
    } else {
      return null;
    }
  };
}]);
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
//ordenar per coordenades gps
function calculDistancia(coor1, coor2) {
  var fromLat = coor1.lat;
  var fromLon = coor1.long;

  var toLat = coor2.lat;
  var toLon = coor2.long;

  var radius = 6378137; // approximate Earth radius, *in meters*

  var deltaLat = toLat - fromLat;
  var deltaLon = toLon - fromLon;

  var angle = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin(deltaLat / 2), 2) +
    Math.cos(fromLat) * Math.cos(toLat) *
    Math.pow(Math.sin(deltaLon / 2), 2)));
  return radius * angle;
};

//creacio de id per finca
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};
