// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.jso
//angular.module("starter", ["ionic", "ion-datetime-picker"]);

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ion-tree-list'])
//angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    
    var push = new Ionic.Push({
      "debug": false
    });

    push.register(function(token) {
      console.log("My Device token:",token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform

      localStorage.setItem("token", token.token);

    });
    


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })


  .state('tab.map', {
    url: '/map',
    cache: false,
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.devices', {
    url: '/devices',
    cache: false,
    views: {
      'tab-devices': {
        templateUrl: 'templates/tab-devices.html',
        controller: 'DevicesCtrl'
      }
    }
  })

  .state('tab.device-detail', {
    url: '/device-detail',
    cache: false,
    views: {
      'tab-devices': {
        templateUrl: 'templates/device-detail.html',
        controller: 'DeviceDetailCtrl'
      }
    }
  })

  .state('tab.notifications', {
      url: '/notifications',
      cache: false,
      views: {
        'tab-notifications': {
          templateUrl: 'templates/tab-notifications.html',         
          controller: 'NotificationsCtrl'
        }
      }
    })
    .state('tab.notification-detail', {
      url: '/notifications/:notificationId',
      cache: false,
      views: {
        'tab-notifications': {
          templateUrl: 'templates/notification-detail.html',
          controller: 'NotificationDetailCtrl'
        }
      }
    })

  .state('tab.config', {
    url: '/config',
    cache: false,
    views: {
      'tab-config': {
        templateUrl: 'templates/tab-config.html',
        controller: 'ConfigCtrl'
      }
    }
  });



  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('login');

});



