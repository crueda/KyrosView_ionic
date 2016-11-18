// KyrosView Main App
angular.module('main', ['ionic', 'main.controllers', 'main.login', 'main.notification', 'main.device', 'main.map', 'main.config', 'main.services', 'ngCordova', 'ion-tree-list'])

.run(function($ionicPlatform, $http, $ionicPopup) {
  $ionicPlatform.ready(function() {
    
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

    var isWebView = ionic.Platform.isWebView();
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var isWindowsPhone = ionic.Platform.isWindowsPhone();

      localStorage.setItem("token", "");
    //if (isAndroid) {
      // Registrar la aplicacion en el servicio PUSH
      pushNotification = window.plugins.pushNotification;

      window.onNotification = function(e){

        switch(e.event){
          case 'registered':
            if(e.regid.length > 0){
              
              var device_token = e.regid;
              localStorage.setItem("token", device_token);
            }
          break;
        
          case 'message':
            var alertPopup = $ionicPopup.alert({
                  title: 'Mensaje push!!!',
                  template: JSON.stringify(e)
                });
          break;

          case 'error':
              //alert('error occured');
              /*var alertPopup = $ionicPopup.alert({
                  title: 'Mehh',
                  template: 'error'
                });
              */
          break;
        }
      };

      window.errorHandler = function(error){
        //console.log('an error occured');
      }

      pushNotification.register(
        onNotification,
        errorHandler,
        {
          'badge': 'true',
          'sound': 'true',
          'alert': 'true',
          'senderID': '379445772580',        
          'ecb': 'onNotification'
        }
      );      
    //}

  });






})


.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

$ionicConfigProvider.tabs.position('bottom');

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
      cache: false,
      templateUrl: 'templates/login/login.html',
      controller: 'LoginCtrl'
  })


  .state('tab.map', {
    url: '/map',
    cache: true,
    views: {
      'tab-map': {
        templateUrl: 'templates/map/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.devices', {
    url: '/devices',
    cache: true,
    views: {
      'tab-devices': {
        templateUrl: 'templates/device/tab-devices.html',
        controller: 'DevicesCtrl'
      }
    }
  })

  .state('tab.device-detail', {
    url: '/device-detail',
    cache: true,
    views: {
      'tab-devices': {
        templateUrl: 'templates/device/device-detail.html',
        controller: 'DeviceDetailCtrl'
      }
    }
  })

  .state('tab.notifications', {
      url: '/notifications',
      cache: true,
      views: {
        'tab-notifications': {
          templateUrl: 'templates/notification/tab-notifications.html',         
          controller: 'NotificationsCtrl'
        }
      }
    })
    .state('tab.notification-detail', {
      url: '/notifications/:notificationId',
      cache: true,
      views: {
        'tab-notifications': {
          templateUrl: 'templates/notification/notification-detail.html',
          controller: 'NotificationDetailCtrl'
        }
      }
    })

  .state('tab.config', {
    url: '/config',
    cache: true,
    views: {
      'tab-config': {
        templateUrl: 'templates/config/tab-config.html',
        controller: 'ConfigCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('login');

});



