angular.module('starter.controllers')
  .controller('afegirVisitaCrtl', function($scope, VisitaFact, CameraFact, $stateParams, $ionicModal, $location) {
    var Id_Finca = $stateParams.id;
    var name = $stateParams.nom;
    $scope.visita = new Visita();
    $scope.imatges = false;

    /** Captura Imatge **/
    //--------------------------------->
    var OnSucces = function(img) {
      $scope.visita.Fotos.push("data:image/jpeg;base64," + img);
      //$scope.visita.Fotos.push(img);
    };
    var errorHandler = function(error) {
      console.log('Error' + error);
    };

    $scope.capture = function() {
      var limit = $scope.visita.Fotos.length;
      CameraFact.getPicture(OnSucces, errorHandler, limit);
    };
    //--------------------------------->

    /** afegir nova visita **/
    $scope.afegirVisita = function() {
      $scope.visita.Id = generateUUID();
      $scope.visita.Id_Finca = Id_Finca;
      VisitaFact.addVisita($scope.visita);
      VisitaFact.persistVisites(Id_Finca);
      $location.path("/app/visita-llista/" + Id_Finca + "/" + name + "");
    };

    /** slider de imatges **/
    //--------------------------------->
    $scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
    };

    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };
    //--------------------------------->

    /** Ubicacio: **/
    //--------------------------------->
    $scope.errorGps = false;
    $scope.getCurrentPosition = function() {
      VisitaFact.Ubicacio($scope);
    };
    //--------------------------------->
  })
  .controller('EditarVisitaCrtl', function($scope, VisitaFact, CameraFact, $stateParams, $ionicModal, $location, cordovaGeolocationService, $ionicLoading) {
    var Id_Finca = $stateParams.id;
    var name = $stateParams.nom;
    var inx = $stateParams.inx;
    $scope.visita = VisitaFact.getVisita(inx);
    if ($scope.visita.Data) {
      $scope.visita.Data = new Date($scope.visita.Data);
    }

    $scope.imatges = false;
    $scope.guardarVisita = function() {
      VisitaFact.replaceVisita($scope.visita, inx);
      VisitaFact.persistVisites(Id_Finca);
      $location.path("/app/visita-llista/" + Id_Finca + "/" + name + "");
    };

    //Captura Imatges...
    var OnSucces = function(img) {
      $scope.visita.Fotos.push("data:image/jpeg;base64," + img);
      //$scope.visita.Fotos.push(img);
    };
    var errorHandler = function(error) {
      console.log('Error' + error);
    };
    $scope.capture = function() {
      var limit = $scope.visita.Fotos.length;
      CameraFact.getPicture(OnSucces, errorHandler, limit);
    };


    //slider de fotos
    $scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
    };

    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };

    // Ubicacio:
    //--------------------------------->
    $scope.errorGps = false;
    $scope.getCurrentPosition = function() {
      VisitaFact.Ubicacio($scope);
    };
    //--------------------------------->
  })


.controller('visitallistaCtrl', function($scope, $stateParams, $location, VisitaFact) {
  var Id_Finca = $stateParams.id;
  $scope.name = $stateParams.nom;

  $scope.afegir = function() {
    $location.path("/app/visites/afegir/" + Id_Finca + "/" + $stateParams.nom);
  }
  $scope.editar = function() {

  }
  $scope.eliminar = function(index) {
    // $scope.visites.splice(index, 1);
    VisitaFact.delVisita(index);
    VisitaFact.persistVisites(Id_Finca);
  }

  // $scope.visita = new Visita();
  $scope.visites = VisitaFact.getVisites(Id_Finca);
  if ($scope.visites === undefined || !Array.isArray($scope.visites)) {
    $scope.visites = [];
  }

  //quan editem seleccionem aquella visita!
  $scope.setSelectedVisit = function(visit) {
    $scope.selectedVisita = visit;
  };
})


.controller('VisitesCtrl', function($scope, $stateParams, carregarLocal, VisitaFact) {
  var Finques = carregarLocal("finques");
  $scope.Visites = [];
  for (var i = 0; i < Finques.length; i++) {
    var visi = VisitaFact.getVisites(Finques[i].Id);
    for (var x = 0; x < visi.length; x++) {
      $scope.Visites.push(visi[x]);
    }
  }
  console.log($scope.Visites);
});
