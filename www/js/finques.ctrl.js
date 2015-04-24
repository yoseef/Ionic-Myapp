  angular.module('starter.controllers', ['ionic'])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('FinquesCtrl', function($scope, $ionicModal, guardarLocal, carregarLocal, FinquesFact, eliminarDelLocalStorage) {

    /** Inicialitzacio de les Variables del Scope **/
    //--------------------------------->
    //id del obj a editar
    var fEditar;
    $scope.finca = new Finca();
    $scope.Finques = [];
    $scope.Finques = carregarLocal("finques");
    if ($scope.Finques === undefined || !Array.isArray($scope.Finques)) {
      $scope.Finques = [];
    }
    //--------------------------------->

    /** modal nova finca **/
    //--------------------------------->
    $ionicModal.fromTemplateUrl('templates/finques/nova-finca.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.ModalNovaFinca = modal;
    });
    $scope.openModalAfegir = function() {
      $scope.errorGps = false;
      $scope.ModalNovaFinca.show();
      $scope.finca = new Finca();
    };
    $scope.closeModalAfegir = function() {
      $scope.errorGps = false;
      $scope.ModalNovaFinca.hide();
    };
    //--------------------------------->

    /** afegir una nova finca **/
    $scope.afegirFinca = function() {
      $scope.finca.Id = generateUUID();
      $scope.Finques.push(
        $scope.finca
      );
      // $scope.finca = Object.create(finca);
      // $scope.finca.Coor = Object.create(coor);
      guardarLocal("finques", $scope.Finques);
    };

    /** Ubicar la finca **/
    //--------------------------------->
    $scope.getCurrentPosition = function() {
      FinquesFact.Ubicacio($scope);
    };
    //--------------------------------->

    /** modal editar finca **/
    //--------------------------------->
    $ionicModal.fromTemplateUrl('templates/finques/editar-finca.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.ModalEditarFinca = modal;
    });
    $scope.openModalEditar = function(finca_num) {
      $scope.errorGps = false;
      fEditar = finca_num;
      $scope.finca = $scope.Finques[fEditar];
      $scope.ModalEditarFinca.show();
    };
    $scope.closeModalEditar = function() {
      $scope.errorGps = false;
      $scope.ModalEditarFinca.hide();
      $scope.finca = new Finca();
    };
    //--------------------------------->

    /** Metode per editar una finca **/
    //--------------------------------->
    $scope.editarFinca = function() {
      guardarLocal("finques", $scope.Finques);
    };
    //--------------------------------->

    /** Eliminar la Finca i les visites que te **/
    //--------------------------------->
    $scope.eliminarFinca = function(fincInx) {
      //eliminar del localstroage les visites relacionades
      eliminarDelLocalStorage("vis-" + $scope.Finques[fincInx].Id)
        //eliminar de l'array
      $scope.Finques.splice(fincInx, 1);
      //persisitr els canvis al localstorage
      guardarLocal("finques", $scope.Finques);
    };
    //--------------------------------->
  })
