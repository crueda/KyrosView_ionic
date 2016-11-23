function saveToken ($http, URL) {
    var url = URL.saveToken + "?username="+ localStorage.getItem("username") + "&token="+ localStorage.getItem("token");
    console.log(url);
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
}

// KyrosView Main App
//angular.module('main', ['ionic', 'main.controllers', 'main.login', 'main.notification', 'main.device', 'main.map', 'main.config', 'main.services', 'ngCordova', 'ion-tree-list'])
angular.module('main', ['ionic', 'main.controllers', 'main.login', 'main.notification', 'main.device', 'main.map', 'main.config', 'main.services', 'ngCordova'])

.run(function($ionicPlatform, $http, $ionicPopup, $cordovaTouchID, $cordovaPushV5, $state, URL) {
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


    // Soporte para TouchID
    /*
    if (isIOS || isIPad) {
      $cordovaTouchID.checkSupport().then(function() {
        $cordovaTouchID.authenticate("Debes autenticarte para entrar").then(function() {
          $state.go('tab.notifications', {cache: false});
        }, function(error) {
          console.log(JSON.stringify(error));
            navigator.notification.alert("Autenticación no correcta, introduzca usuario y contraseña", null, "Kyros", "Cerrar");
        });
      }, function(error) {
          console.log(JSON.stringify(error));
      });
    }*/

    localStorage.setItem("token", "");      
    localStorage.setItem("username", "");

    $cordovaPushV5.initialize(  // important to initialize with the multidevice structure !!
    {
            android: {
                senderID: "379445772580"
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false',
                clearBadge: true
            },
            windows: {}
    }
    ).then(function (result) {
        $cordovaPushV5.onNotification();
        $cordovaPushV5.onError();
        $cordovaPushV5.register().then(function (resultreg) {
            //navigator.notification.alert("-->"+resultreg, null, "Kyros App", "Ok");
             if (localStorage.getItem("token")!=null && localStorage.getItem("token")!="") {
                  saveToken($http, URL);
              }

             localStorage.setItem("token", resultreg); 
            // SEND THE TOKEN TO THE SERVER, best associated with your device id and user
        }, function (err) {
            // handle error
            //navigator.notification.alert("-err->"+err, null, "Kyros App", "Ok");
        });
      });
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
      cache: false,
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



