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
angular.module('main', ['ionic', 'main.controllers', 'main.login', 'main.notification', 'main.device', 'main.map', 'main.config', 'main.services', 'ngCordova', 'ionic.ion.autoListDivider'])

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

        /*
        var alertPopup = $ionicPopup.alert({
            title: '**',
            template: '1'
        });*/


    localStorage.setItem("token", "");      
    localStorage.setItem("token_api", "");      
    localStorage.setItem("username", "");


var push = PushNotification.init({
    "android": {
        "senderID": "379445772580"
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    "ios": {
        "alert": "true",
        "badge": "true",
        "sound": "true"
    },
    "windows": {}
});

push.on('registration', function(data) {
  localStorage.setItem("token", data.registrationId); 
  
  /*if (localStorage.getItem("token")!=null && localStorage.getItem("token")!="") {
                  saveToken($http, URL);
              }*/


    // data.registrationId
    /*
     var alertPopup = $ionicPopup.alert({
            title: '**',
            template: '2:' + data.registrationId
        });
        */

});

push.on('notification', function(data) {
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
    
    /*var alertPopup = $ionicPopup.alert({
            title: '****',
            template: '->' + data.additionalData.foreground + "-" + data.count + "-" + data.additionalData._id + "-" + data.additionalData.vehicle_license + "-" + data.additionalData.info
        });*/
    
    /*
    localStorage.setItem("notificationSelectedVehicleLicense", data.additionalData.vehicle_license);
    localStorage.setItem("notificationPushMongoId", data.additionalData._id);
    //$state.go('tab.map', {cache: false});
    $state.go('tab.notification-detail',  {cache: false});
    */



    //$state.go('tab.notifications',  {cache: false, mode: localStorage.getItem("group_notifications")});      

    //localStorage.setItem("notificationSelectedLatitude", data.additionalData.latitude);
    //localStorage.setItem("notificationSelectedLongitude", data.additionalData.longitude);
    localStorage.setItem("notificationPushMongoId", data.additionalData._id);
    localStorage.setItem("notificationSelectedVehicleLicense", data.additionalData.vehicle_license);
    localStorage.setItem("mapmode", 3);
    $state.go('tab.map');


});

push.on('error', function(e) {
    // e.message
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
    cache: false,
    views: {
      'tab-map': {
        templateUrl: 'templates/map/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.devices', {
    url: '/devices',
    cache: false,
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
      url: '/notifications/:mode/',
      cache: false,
      views: {
        'tab-notifications': {
          templateUrl: function ($stateParams){
                //if ($stateParams.mode == 0) {
                if (localStorage.getItem("group_notifications") == 0) {
                    return 'templates/notification/tab-notifications.html'
                }
                else {
                    return 'templates/notification/tab-notifications-group.html'
                }
            },
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
          controller: 'NotificationDetailCtrl',
          params: {
            mongoId: 7
          }
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
  })

  .state('tab.test', {
    url: '/test',
    cache: false,
    views: {
      'tab-test': {
        templateUrl: 'templates/others/test.html',
        controller: 'TestCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('login');

});



