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
angular.module('main', ['ionic', 'main.intro', 'main.controllers', 'main.graphs', 'main.login', 'main.notification', 'main.device', 'main.map', 'main.config', 'main.services', 'ngCordova', 'ionic.ion.autoListDivider', 'pascalprecht.translate', 'chart.js'])

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

    // carga de iconos desde la bbdd
    /*
    eventIcons = {};
    defaultIcon = {
      svg: '<svg id="Layer_1" class="scaling-svg" style="enable-background:new 0 0 496.158 496.158;" x="0px" y="0px" width="500px" height="500px" viewBox="0 0 496.158 496.158" xmlns="http://www.w3.org/2000/svg"><path d="M496.158,248.085c0-137.022-111.069-248.082-248.075-248.082C111.07,0.003,0,111.063,0,248.085&#10;&#9;c0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.158,385.086,496.158,248.085z" style="fill: rgb(94, 81, 232);"/><g><path style="fill:#FFFFFF;" d="M315.249,359.555c-1.387-2.032-4.048-2.755-6.27-1.702c-24.582,11.637-52.482,23.94-57.958,25.015&#10;&#9;&#9;c-0.138-0.123-0.357-0.348-0.644-0.737c-0.742-1.005-1.103-2.318-1.103-4.015c0-13.905,10.495-56.205,31.192-125.719&#10;&#9;&#9;c17.451-58.406,19.469-70.499,19.469-74.514c0-6.198-2.373-11.435-6.865-15.146c-4.267-3.519-10.229-5.302-17.719-5.302&#10;&#9;&#9;c-12.459,0-26.899,4.73-44.146,14.461c-16.713,9.433-35.352,25.41-55.396,47.487c-1.569,1.729-1.733,4.314-0.395,6.228&#10;&#9;&#9;c1.34,1.915,3.825,2.644,5.986,1.764c7.037-2.872,42.402-17.359,47.557-20.597c4.221-2.646,7.875-3.989,10.861-3.989&#10;&#9;&#9;c0.107,0,0.199,0.004,0.276,0.01c0.036,0.198,0.07,0.5,0.07,0.933c0,3.047-0.627,6.654-1.856,10.703&#10;&#9;&#9;c-30.136,97.641-44.785,157.498-44.785,182.994c0,8.998,2.501,16.242,7.432,21.528c5.025,5.393,11.803,8.127,20.146,8.127&#10;&#9;&#9;c8.891,0,19.712-3.714,33.08-11.354c12.936-7.392,32.68-23.653,60.363-49.717C316.337,364.326,316.636,361.587,315.249,359.555z"/><path style="fill:#FFFFFF;" d="M314.282,76.672c-4.925-5.041-11.227-7.597-18.729-7.597c-9.34,0-17.475,3.691-24.176,10.971&#10;&#9;&#9;c-6.594,7.16-9.938,15.946-9.938,26.113c0,8.033,2.463,14.69,7.32,19.785c4.922,5.172,11.139,7.794,18.476,7.794&#10;&#9;&#9;c8.958,0,17.049-3.898,24.047-11.586c6.876-7.553,10.363-16.433,10.363-26.393C321.646,88.105,319.169,81.684,314.282,76.672z"/></g></svg>'
    }
    eventIcons[0] = defaultIcon;

    var url = APP.api_base + URL.getAllIcons + "?type=1";
    console.log(url);
    $http.get(url)
    .success(function(data, status, headers,config){   
        for (var j=0; j<data.length; j++) {
          eventIcons[data[j].subtype] = data[j];
        }

    })
    .error(function(data, status, headers,config){
      $ionicLoading.show({
        template: 'Error de red',
        duration: 1500,
        scope: $scope
      });
    })
    .then(function(rest) {
      localStorage.setItem("eventIconStorage", JSON.stringify(eventIcons));  
    });*/

    var isWebView = ionic.Platform.isWebView();
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var isWindowsPhone = ionic.Platform.isWindowsPhone();

    try {
      localStorage.setItem("device_model", device.model);
      localStorage.setItem("device_platform", device.platform);
      localStorage.setItem("device_version", device.version);
      localStorage.setItem("device_manufacturer", device.manufacturer);
      localStorage.setItem("device_serial", device.serial);
      localStorage.setItem("device_uuid", device.uuid);      
    } catch (error) {}

    localStorage.setItem("device_height", window.innerHeight);
    localStorage.setItem("device_width", window.innerWidth);
    

    try {   
    navigator.globalization.getPreferredLanguage(
        function (language) {
          localStorage.setItem("device_language", language.value);
        },
        function () {localStorage.setItem("device_language", "unknow")}
    );
    } catch (error) {}

    /*
    navigator.globalization.getLocaleName(
        function (locale) {
          alert('locale2: ' + locale.value + '\n');
          localStorage.setItem("device_language", language.value);
        },
        function () {alert('Error getting locale\n');}
    );*/

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
    
   


    // inicializar valores de storage
    localStorage.setItem("token", "");      
    localStorage.setItem("token_api", "");      
    localStorage.setItem("username", "");
    localStorage.setItem("max_show_notifications", 50);

  //Soporte SMS
  /*
 if ( isIPad || isIOS || isAndroid || isWindowsPhone) {
  SMS.startWatch(function(){
    console.log('Watching SMS');
  }, function(){
    console.log('Not Watching SMS');
  });

    document.addEventListener('onSMSArrive', function(e){
      var data = e.data;
      var alertPopup = $ionicPopup.alert({
            title: '*SMS*',
            template: '->:' + data
      });
      $smsarrive.periksa(data);
    });
  }*/

var push = PushNotification.init({
    "android": {
        //"senderID": "379445772580"
        "senderID": "972815935814"
        
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
            template: '->' + data.additionalData.username + "-" + data.additionalData._id + "-" + data.additionalData.vehicle_license
        });
    */
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
    localStorage.setItem("notificationPushLongitude", data.additionalData.coordinates[0]);
    localStorage.setItem("notificationPushLatitude", data.additionalData.coordinates[1]);
    localStorage.setItem("notificationPushEventType", data.additionalData.event_type);
    localStorage.setItem("notificationPushTimestamp", data.additionalData.timestamp);
    localStorage.setItem("notificationSelectedVehicleLicense", data.additionalData.vehicle_license);
    if (data.additionalData.username!=undefined) {
        localStorage.setItem("username", data.additionalData.username);      
    }

    localStorage.setItem("mapmode", 3);

    $state.go('tab.map');


});

push.on('error', function(e) {
    // e.message
});




    });
})


.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider, $translateProvider, ChartJsProvider) {

ChartJsProvider.setOptions({ chartColors : [ '#00ADF9', '#b30000', '#FDB45C', '#46BFBD', '#ff3399', '#949FB1', '#4D5360'] });


var language = localStorage.getItem("language");
if (language==undefined) {
  if (localStorage.getItem("device_language")!=undefined) {
    var device_lang = localStorage.getItem("device_language");
    language = device_lang.substring(0, 2);
  } else {
    language = 'es';    
  }
}

$translateProvider
      .useStaticFilesLoader({
        prefix: 'locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'es'], {
        'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
        'es' : 'es', 'es_SP': 'es', 'es_ES': 'es'
      })
      .preferredLanguage(language)
      .fallbackLanguage(language)
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');

  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

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

  .state('tab.graphs', {
    url: '/graphs',
    cache: false,
    views: {
      'tab-graphs': {
        templateUrl: 'templates/graph/tab-graphs.html',
        controller: 'GraphCtrl'
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
      cache: true,
      views: {
        'tab-notifications': {
          templateUrl: function ($stateParams){
                /*
                if (localStorage.getItem("group_notifications") == 0) {
                    return 'templates/notification/tab-notifications.html'
                }
                else {
                    return 'templates/notification/tab-notifications-group.html'
                }*/
                return 'templates/notification/tab-notifications.html'
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
  //$urlRouterProvider.otherwise('login');
  $urlRouterProvider.otherwise('intro');

});



