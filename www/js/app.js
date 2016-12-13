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

.run(function($rootScope, $ionicPlatform, $http, $ionicPopup, $cordovaTouchID, $cordovaPushV5, $state, URL, APP) {
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

    // Leer los iconos
    //$rootScope.eventIconSVG = {};

    //$rootScope.eventIcon = '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" transform="matrix(1.227483 0 0 1.207261 -7.147999 -6.763805)"><path d="m22.888 58c-1.061 0-2.078-.422-2.828-1.172l-12.887-12.887c-.751-.75-1.172-1.767-1.172-2.828l-.001-18.226c0-1.061.422-2.078 1.172-2.828l12.887-12.888c.75-.75 1.767-1.171 2.829-1.171h18.225c1.06 0 2.078.421 2.828 1.171l12.887 12.888c.75.751 1.172 1.768 1.172 2.829v18.224c0 1.061-.422 2.078-1.172 2.828l-12.887 12.888c-.75.75-1.768 1.172-2.828 1.172z" fill="#dedcd9"/><path d="m6 58h10.989l30.023-52h-41.012z" fill="#fff" opacity=".300003"/><path d="m53 29.563c0-2.531-.954-4.563-5.5-4.563h-3.5v14.001h3v-5h .5c4 0 5.5-1.938 5.5-4.438m-11 2.438c0-4.252-1.963-7.001-5-7.001-3.037 0-5 2.749-5 7.001 0 4.251 1.963 7 5 7 3.037 0 5-2.749 5-7m-11-7.001h-9v3h3v11.001h3v-11.001h3zm-9 9.677c0-3.318-2.284-3.803-4.917-4.433-1.543-.368-1.735-.769-1.809-1.181-.077-.441.211-1.063 1.321-1.063.78 0 1.386.301 1.564.919l2.883-.83c-.549-1.905-2.339-3.089-4.447-3.089-1.557 0-2.715.526-3.516 1.481-.695.827-.965 1.931-.758 3.103.479 2.72 3.848 3.343 4.83 3.579 1.72.411 1.849.866 1.849 1.514 0 .804-.785 1.324-2 1.324-.595 0-1.634-.128-1.921-.982l-2.844.955c.636 1.895 2.417 3.027 4.765 3.027 3.282 0 5-2.175 5-4.324m33-12.203v19.053l-13.474 13.474h-19.052l-13.474-13.473v-19.054l13.473-13.474h19.053zm-18 5.526c-1.578 0-2 2.514-2 4.001 0 1.486.422 4 2 4 1.579 0 2-2.514 2-4 0-1.487-.421-4.001-2-4.001m13 1.5c0 .688-.23 1.501-1.5 1.501h-1.5v-3.001h1.5c1.27 0 1.5.729 1.5 1.5" fill="#de7047"/></g></svg>';
    

    //-------------
    
    /*eventIconsStorage = localStorage.getItem("eventIcons");
    if (eventIconsStorage==undefined) {
      eventIconsStorage = {};
    }*/

    localStorage.setItem("eventIconStorage", {});
    eventIcons = {};
    eventIconsLocal = localStorage.getItem("eventIconStorage");
    //eventIconsLocal = JSON.parse(localStorage.getItem("eventIconStorage"));

    var url = APP.api_base + URL.getIconsInfo;
    console.log(url);
    $http.get(url)
    .success(function(data, status, headers,config){   
      var ask_icons = [];  
      for (var i=0; i<data.length; i++) { 
        if (eventIconsLocal[data[i].subtype]!=undefined) {
          if (data[i].version > eventIconsLocal[data[i].subtype].version) {
            ask_icons.push(data[i].subtype);
          }
        } else {
          eventIcons[data[i].subtype] = data[i];
          ask_icons.push(data[i].subtype);
        }
      }
      // pedir los iconos que faltan
       var urlIcons = APP.api_base + URL.getIcons + "?subtypeList="+ask_icons.join(",");
       console.log(urlIcons);
       $http.get(urlIcons)
      .success(function(data, status, headers,config){   
        for (var j=0; j<data.length; j++) {
          eventIcons[data[j].subtype].version = data[j].version;
          eventIcons[data[j].subtype].svg = data[j].svg;
          //eventIconsStorage[data[j].subtype].trust_svg = $sce.trustAsHtml(data[j].svg);

        }
      })
      .error(function(data, status, headers,config){
      })
      .then(function(rest) {
        //localStorage.setItem("eventIcons", eventIconsStorage);  
        localStorage.setItem("eventIconStorage", JSON.stringify(eventIcons));  
      });

      
    
    })
    .error(function(data, status, headers,config){
      $ionicLoading.show({
        template: 'Error de red',
        duration: 1500,
        scope: $scope
      });
    });


    // inicializar velores de storage
    localStorage.setItem("token", "");      
    localStorage.setItem("token_api", "");      
    localStorage.setItem("username", "");
    localStorage.setItem("max_show_notifications", 50);


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



