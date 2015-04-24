// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

  .state('app.finques', {
      url: "/finques",
      views: {
        'menuContent': {
          templateUrl: "templates/finques/finques.html",
          //templateUrl: "templates/visita-llista.html",
          controller: 'FinquesCtrl'
        }
      }
    })
    .state('app.visitallista', {
      url: "/visita-llista/:id/:nom",
      views: {
        'menuContent': {
          templateUrl: "templates/visites/visita-llista.html",
          controller: 'visitallistaCtrl'
        }
      }
    })
    .state('app.afegirVisita', {
      url: "/visites/afegir/:id/:nom",
      views: {
        'menuContent': {
          templateUrl: "templates/visites/nova-visita.html",
          controller: "afegirVisitaCrtl"
        }
      }
    })
    .state('app.editarVisita', {
      url: "/visites/editar/:id/:nom/:inx",
      views: {
        'menuContent': {
          templateUrl: "templates/visites/editar-visita.html",
          controller: "EditarVisitaCrtl"
        }
      }
    })
    .state('app.visites', {
      url: "/visites",
      views: {
        'menuContent': {
          templateUrl: "templates/visites/visites.html",
          controller: "VisitesCtrl"
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/finques');
});
