notifications = [];
iconos = [];
var num_notifications = 0;

 function pad(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
  }

  function getEventDescription(eventType) {
    //var evento = EVENT_ENUM.getByValue('value', eventType);
    var evento = EventEnum[eventType];
    if (evento!=undefined) {
      return EventEnum.properties[evento].description;      
    }
    return "";
  }

  function getEventIcon(eventType) {
    if (eventType==0) {
      return 'img/event.png'; 
    } else {
       var evento = EventEnum[eventType];
       if (evento!=undefined) {
        return 'img/events/' + EventEnum.properties[evento].icon; 
      } else {
        return "";
      }
    }
  }

  function getEventDate(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = pad(date.getMonth() + 1);
    var day = pad(date.getDate());
    var hours = pad(date.getHours());
    var minutes = pad(date.getMinutes());
    var seconds = pad(date.getSeconds());
    var strDate = day + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds;
    return strDate;
  }

  //todo
  function archiveAllNotification ($http, $scope, URL, APP) {
    //console.log('You are not sure');
    var url = APP.api_base + URL.archiveAllNotifications + "/" + localStorage.getItem("username");
    console.log(url);
    $http({
      method: 'GET',
      url: url,
      headers: {
        'x-access': localStorage.getItem("token_api")
      }})
    .success(function(data, status, headers,config){            
      
      notifications = [];
      $scope.notifications = notifications;
      $scope.num_notifications = 0;
      if (ionic.Platform.isIOS()) {
        $scope.top_bubble = 24;
      } else {
        $scope.top_bubble = 6;            
      }

      })
      .error(function(data, status, headers,config){
      });
      
  }

  function archiveNotification ($http, notificationId, URL, APP) {
    var url = APP.api_base + URL.archiveNotification + "?username="+ localStorage.getItem("username") + "&notificationId="+notificationId;
    console.log(url);
    $http({
      method: 'GET',
      url: url,
      headers: {
        'x-access': localStorage.getItem("token_api")
      }})
    .success(function(data, status, headers,config){       
      })
      .error(function(data, status, headers,config){
      });
  }
  
  function onConfirm(buttonIndex) {
    //alert('You selected button ' + buttonIndex);
    if (buttonIndex==1) {
      archiveAllNotification ($http, $scope, URL, APP);
    }
  }

 
angular.module('main.notification', [])
.controller('NotificationsCtrl', function($rootScope, $scope, $state, $http, Notifications, $ionicPopup, $ionicLoading, $timeout, URL, APP, $sce) {


    $scope.archiveNotifications = function() {

    /*
    navigator.notification.confirm(
        'Tienes ' + num_notifications + ' notificaciones.\r\n¿Deseas eliminarlas todas?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Confirmar',           // title
        ['Si','No']     // buttonLabels
    );
    */

  
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar',
     template: 'Tienes ' + num_notifications + ' notificaciones.\r\n¿Deseas eliminarlas todas?'
   });

   confirmPopup.then(function(res) {
     if(res) {
        archiveAllNotification ($http, $scope, URL, APP);
     } else {
       //console.log('You are not sure');
     }
   });
   

  }

/*
$scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
};
$scope.body = '<div style="width:200px; height:200px; border:1px solid blue;"></div>';
*/

//$scope.html = '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" transform="matrix(1.227483 0 0 1.207261 -7.147999 -6.763805)"><path d="m22.888 58c-1.061 0-2.078-.422-2.828-1.172l-12.887-12.887c-.751-.75-1.172-1.767-1.172-2.828l-.001-18.226c0-1.061.422-2.078 1.172-2.828l12.887-12.888c.75-.75 1.767-1.171 2.829-1.171h18.225c1.06 0 2.078.421 2.828 1.171l12.887 12.888c.75.751 1.172 1.768 1.172 2.829v18.224c0 1.061-.422 2.078-1.172 2.828l-12.887 12.888c-.75.75-1.768 1.172-2.828 1.172z" fill="#dedcd9"/><path d="m6 58h10.989l30.023-52h-41.012z" fill="#fff" opacity=".300003"/><path d="m53 29.563c0-2.531-.954-4.563-5.5-4.563h-3.5v14.001h3v-5h .5c4 0 5.5-1.938 5.5-4.438m-11 2.438c0-4.252-1.963-7.001-5-7.001-3.037 0-5 2.749-5 7.001 0 4.251 1.963 7 5 7 3.037 0 5-2.749 5-7m-11-7.001h-9v3h3v11.001h3v-11.001h3zm-9 9.677c0-3.318-2.284-3.803-4.917-4.433-1.543-.368-1.735-.769-1.809-1.181-.077-.441.211-1.063 1.321-1.063.78 0 1.386.301 1.564.919l2.883-.83c-.549-1.905-2.339-3.089-4.447-3.089-1.557 0-2.715.526-3.516 1.481-.695.827-.965 1.931-.758 3.103.479 2.72 3.848 3.343 4.83 3.579 1.72.411 1.849.866 1.849 1.514 0 .804-.785 1.324-2 1.324-.595 0-1.634-.128-1.921-.982l-2.844.955c.636 1.895 2.417 3.027 4.765 3.027 3.282 0 5-2.175 5-4.324m33-12.203v19.053l-13.474 13.474h-19.052l-13.474-13.473v-19.054l13.473-13.474h19.053zm-18 5.526c-1.578 0-2 2.514-2 4.001 0 1.486.422 4 2 4 1.579 0 2-2.514 2-4 0-1.487-.421-4.001-2-4.001m13 1.5c0 .688-.23 1.501-1.5 1.501h-1.5v-3.001h1.5c1.27 0 1.5.729 1.5 1.5" fill="#de7047"/></g></svg>';
//var e  = '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" transform="matrix(1.227483 0 0 1.207261 -7.147999 -6.763805)"><path d="m22.888 58c-1.061 0-2.078-.422-2.828-1.172l-12.887-12.887c-.751-.75-1.172-1.767-1.172-2.828l-.001-18.226c0-1.061.422-2.078 1.172-2.828l12.887-12.888c.75-.75 1.767-1.171 2.829-1.171h18.225c1.06 0 2.078.421 2.828 1.171l12.887 12.888c.75.751 1.172 1.768 1.172 2.829v18.224c0 1.061-.422 2.078-1.172 2.828l-12.887 12.888c-.75.75-1.768 1.172-2.828 1.172z" fill="#dedcd9"/><path d="m6 58h10.989l30.023-52h-41.012z" fill="#fff" opacity=".300003"/><path d="m53 29.563c0-2.531-.954-4.563-5.5-4.563h-3.5v14.001h3v-5h .5c4 0 5.5-1.938 5.5-4.438m-11 2.438c0-4.252-1.963-7.001-5-7.001-3.037 0-5 2.749-5 7.001 0 4.251 1.963 7 5 7 3.037 0 5-2.749 5-7m-11-7.001h-9v3h3v11.001h3v-11.001h3zm-9 9.677c0-3.318-2.284-3.803-4.917-4.433-1.543-.368-1.735-.769-1.809-1.181-.077-.441.211-1.063 1.321-1.063.78 0 1.386.301 1.564.919l2.883-.83c-.549-1.905-2.339-3.089-4.447-3.089-1.557 0-2.715.526-3.516 1.481-.695.827-.965 1.931-.758 3.103.479 2.72 3.848 3.343 4.83 3.579 1.72.411 1.849.866 1.849 1.514 0 .804-.785 1.324-2 1.324-.595 0-1.634-.128-1.921-.982l-2.844.955c.636 1.895 2.417 3.027 4.765 3.027 3.282 0 5-2.175 5-4.324m33-12.203v19.053l-13.474 13.474h-19.052l-13.474-13.473v-19.054l13.473-13.474h19.053zm-18 5.526c-1.578 0-2 2.514-2 4.001 0 1.486.422 4 2 4 1.579 0 2-2.514 2-4 0-1.487-.421-4.001-2-4.001m13 1.5c0 .688-.23 1.501-1.5 1.501h-1.5v-3.001h1.5c1.27 0 1.5.729 1.5 1.5" fill="#de7047"/></g></svg>';
//console.log($rootScope.eventIcon[911].svg);
//a.push($sce.trustAsHtml($rootScope.eventIcon[911].svg));
//$scope.trustedHtmlIcon = a;
//console.log($scope.trustedHtmlIcon);
//$scope.trustedHtml = $rootScope.eventIcon[911].trust_svg;

  $scope.doRefresh = function() {
    $timeout( function() {
    var url = APP.api_base + URL.getNotificationsLimit + "?username="+localStorage.getItem("username") + "&max=" + localStorage.getItem("max_show_notifications");
    console.log(url);
    notifications = [];
    iconos = [];

    $http.get(url)
    .success(function(data, status, headers,config){

      for (var i=0; i<data.result.length; i++) {

          if (data.result[i].location!=undefined) {
            lat = data.result[i].location.coordinates[1].toFixed(4);
            lon = data.result[i].location.coordinates[0].toFixed(4);            
          } else {
            lat = 0;
            lon = 0;                        
          }


        notification = { mongoId: data.result[i]._id,
          id: i,
          vehicleLicense: data.result[i].vehicle_license,
          name: getEventDescription(data.result[i].subtype),
          icon: getEventIcon(data.result[i].subtype),
          date: getEventDate(data.result[i].timestamp),
          eventType: data.result[i].subtype,
          latitude: lat,
          longitude: lon,
          speed: data.result[i].speed.toFixed(1),
          heading: data.result[i].heading.toFixed(1),
          altitude: data.result[i].altitude.toFixed(0),
          geocoding: data.result[i].geocoding,
          battery: data.result[i].battery          
        }
        notifications.push(notification);
        iconos.push($sce.trustAsHtml($rootScope.eventIcon[data.result[i].subtype].svg));


        }
          $scope.notifications = notifications;
        $scope.trustedHtmlIcon = iconos;

          // Texto del indicador
          num_notifications = data.result.length;
          /*if (num_notifications>99) {
            $scope.num_notifications = "99+"
            var alertPopup = $ionicPopup.alert({
                title: 'Mensaje',
                template: 'Tienes ' + num_notifications + ' notificaciones.\r\nSolo se muestran las 50 más recientes'
              });
          } else {
            $scope.num_notifications = num_notifications          
          }*/
          $scope.num_notifications = num_notifications;

          // Anchura del indicador
          if (num_notifications > 999) {
            $scope.width_bubble = 57;
          } else if (num_notifications > 99) {
            $scope.width_bubble = 47;
          } else if (num_notifications > 9){
            $scope.width_bubble = 37;            
          } else {
            $scope.width_bubble = 27;                        
          }

          // Altura del indicador  
          if (ionic.Platform.isIOS()) {
            $scope.top_bubble = 24;
          } else {
            $scope.top_bubble = 6;            
          }

          $scope.$broadcast('scroll.refreshComplete');
        })
        .error(function(data, status, headers,config){
          //$scope.notifications = notifications;
          $ionicLoading.show({
            template: 'Error de red',
            scope: $scope
          });
          $timeout(function() {
             $scope.$broadcast('scroll.refreshComplete');
             //$state.go('login');
          }, 1500);
          //$state.go('login');            
        });

      //simulate async response
      //scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      //$scope.$broadcast('scroll.refreshComplete');
    
    }, 2000);
  };

  $scope.remove = function(notification, URL) {
    //console.log("-->"+ notifications.indexOf(notification));
    notifications.splice(notifications.indexOf(notification), 1);
    //archiveNotification($http, notification['mongoId'], URL, APP);


    var url = APP.api_base + URL.archiveNotification + "?username="+ localStorage.getItem("username") + "&notificationId="+notification['mongoId'];
    $http({
      method: 'GET',
      url: url,
      headers: {
        'x-access': localStorage.getItem("token_api")
    }})
    .success(function(data, status, headers,config){            
    })
    .error(function(data, status, headers,config){
    });

  }

  if (localStorage.getItem("username")=="") {
    $state.go('login');
  } else {

  var url = APP.api_base + URL.getNotificationsLimit + "?username="+localStorage.getItem("username") + "&max=" + localStorage.getItem("max_show_notifications");
  //var url = URL.getNotificationsLimit + "?username=robertodat";
  console.log(url);  
  notifications = [];
  iconos = [];
  $ionicLoading.show({
    //template: '<ion-spinner icon="bubbles"></ion-spinner><p>LOADING...</p>'
    //templateUrl: 'loading.html',
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $http({
    method: 'GET',
    url: url,
    headers: {
        'x-access': localStorage.getItem("token_api")
    }})
    .success(function(data, status, headers,config){
      $ionicLoading.hide(); 

      if (data.result==undefined) {
        /*var alertPopup = $ionicPopup.alert({
          title: 'Mensaje',
          template: 'Error de red'
        });*/
        $ionicLoading.show({
          template: 'Error de red',
          scope: $scope
        });
        $timeout(function() {
          $ionicLoading.hide();
          $state.go('login');
        }, 1500);        
      } else {

        for (var i=0; i<data.result.length; i++) {        
          if (data.result[i].location!=undefined) {
            lat = data.result[i].location.coordinates[1].toFixed(4);
            lon = data.result[i].location.coordinates[0].toFixed(4);            
          } else {
            lat = 0;
            lon = 0;                        
          }

          //console.log ("-->"+ $sce.trustAsHtml(data.result[i].subtype));
          notification = { mongoId: data.result[i]._id,
            id: i,
            vehicleLicense: data.result[i].vehicle_license,
            name: getEventDescription(data.result[i].subtype),
            eventType: data.result[i].subtype,
            icon: getEventIcon(data.result[i].subtype),            
            date: getEventDate(data.result[i].timestamp),
            latitude: lat,
            longitude: lon,
            speed: data.result[i].speed.toFixed(1),
            heading: data.result[i].heading.toFixed(1),
            altitude: data.result[i].altitude.toFixed(0),
            geocoding: data.result[i].geocoding,
            battery: data.result[i].battery,

          }
          notifications.push(notification);

          eventType = data.result[i].subtype;
          //913
          iconos.push($sce.trustAsHtml($rootScope.eventIcon[eventType].svg));

        }
        $scope.notifications = notifications;
        $scope.trustedHtmlIcon = iconos;

        num_notifications = data.num_notifications;

        // Texto del indicador
        /*if (num_notifications>99) {
          $scope.num_notifications = "99+"
          var alertPopup = $ionicPopup.alert({
            title: 'Mensaje',
            template: 'Tienes ' + num_notifications + ' notificaciones.\r\nSolo se muestran las 50 más recientes'
          });
        } else {
          $scope.num_notifications = num_notifications;        
        }*/
        $scope.num_notifications = num_notifications;        

        // Altura del indicador
        if (ionic.Platform.isIOS()) {
              $scope.top_bubble = 24;
        } else {
              $scope.top_bubble = 6;            
        }

        // Anchura del indicador
        if (num_notifications > 999) {
          $scope.width_bubble = 57;
        } else if (num_notifications > 99) {
          $scope.width_bubble = 47;
        } else if (num_notifications > 9){
          $scope.width_bubble = 37;            
        } else {
          $scope.width_bubble = 27;                        
        }
      } // else
  }) // success
  .error(function(data, status, headers,config){
    $ionicLoading.hide();
    $ionicLoading.show({
      template: 'Error de red',
      scope: $scope
    });
    $timeout(function() {
      $ionicLoading.hide();
      $state.go('login');
    }, 1500);             
  });
  
  } // else
})

.controller('NotificationDetailCtrl', function($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $cordovaNativeAudio, $stateParams, Notifications, MAP_MODE, URL, APP, $sce) {
  //$scope.notification = Notifications.get($stateParams.notificationId);

  //console.log($scope.mongoId);
  if (localStorage.getItem("notificationPushMongoId")==undefined || localStorage.getItem("notificationPushMongoId")==0) {
    localStorage.setItem("notificationSelected", $stateParams.notificationId);  
    $scope.notification = notifications[$stateParams.notificationId];    
    $scope.trustedHtmlIcon = $sce.trustAsHtml($rootScope.eventIcon[notifications[$stateParams.notificationId].eventType].svg);
  } else {
    // viene de un click sobre un mensaje push -> buscar la notificacion
    var notificationPush = {};

    var url = APP.api_base + URL.getNotification + "/"+localStorage.getItem("notificationPushMongoId");
    localStorage.setItem("notificationPushMongoId", 0);

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $http.get(url)
      .success(function(data, status, headers,config){
        $ionicLoading.hide();


        if (data[0]!=undefined) {   

          notificationPush = { 
            mongoId: data[0]._id,
            vehicleLicense: data[0].vehicle_license,
            name: getEventDescription(data[0].subtype),
            icon: getEventIcon(data[0].subtype),
            date: getEventDate(data[0].timestamp),
            latitude: data[0].location.coordinates[1].toFixed(4),
            longitude: data[0].location.coordinates[0].toFixed(4),
            speed: data[0].speed.toFixed(1),
            heading: data[0].heading.toFixed(1),
            altitude: data[0].altitude.toFixed(0),
            geocoding: data[0].geocoding,
            battery: data[0].battery            
          }
          $scope.notification = notificationPush;  
          $scope.trustedHtmlIcon = $sce.trustAsHtml($rootScope.eventIcon[data[0].subtype].svg);
      } 
      
    })
    .error(function(data, status, headers,config){
      $ionicLoading.hide();
      $ionicLoading.show({
        template: 'Error de red',
        scope: $scope
      });
      $timeout(function() {
        $ionicLoading.hide();
        $state.go('login');
      }, 1500);
      
    });

    //console.log(notificationPush.vehicleLicense);
    //$scope.notification = notificationPush;   
  }

  $scope.archiveSelectNotification = function(notificationId) { 
    /*
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar',
     template: '¿Deseas eliminar esta notificación?'
   });
   confirmPopup.then(function(res) {
     if(res) {
        archiveNotification ($http, notificationId, URL, APP);
        $state.go('tab.notifications', {cache: false, mode: localStorage.getItem("group_notifications")});
     } 
   });
   */

 


    go_notificationId =  parseInt(localStorage.getItem("notificationSelected")) + 1;
    if (go_notificationId > notifications.length -2) {
      go_notificationId = notifications.length -1;
    }
    $scope.notification = notifications[go_notificationId];    
    localStorage.setItem("notificationSelected", go_notificationId);

    archiveNotification ($http, notificationId, URL, APP);
    notifications.splice(go_notificationId-1, 1);


      $ionicLoading.show({
        template: 'Notificación borrada',
        duration: 666,
        scope: $scope
      });

    if (notifications.length>0) {
      $state.go('tab.notifications-detail', {cache: false});
    } else {
      $state.go('tab.notifications', {cache: false, mode: localStorage.getItem("group_notifications")});      
    }

  }

  $scope.goPreviousNotification = function() {
    go_notificationId =  parseInt(localStorage.getItem("notificationSelected")) - 1;
    if (go_notificationId < 0) {
      go_notificationId = 0;
    }
    $scope.notification = notifications[go_notificationId];    
    localStorage.setItem("notificationSelected", go_notificationId);
    $state.go('tab.notifications-detail', {cache: false});
  }

  $scope.goNextNotification = function() {
    go_notificationId =  parseInt(localStorage.getItem("notificationSelected")) + 1;
    if (go_notificationId > notifications.length -2) {
      go_notificationId = notifications.length -1;
    }
    $scope.notification = notifications[go_notificationId];    
    localStorage.setItem("notificationSelected", go_notificationId);
    $state.go('tab.notifications-detail', {cache: false});
  }

    $scope.showMapNotification = function() {
    
    //$scope.notification = notifications[$stateParams.notificationId];
    $scope.notification = notifications[parseInt(localStorage.getItem("notificationSelected"))];
    localStorage.setItem("notificationSelected", $scope.notification.id);  
    localStorage.setItem("notificationSelectedVehicleLicense", $scope.notification.vehicleLicense);  
    localStorage.setItem("notificationSelectedLatitude", $scope.notification.latitude);  
    localStorage.setItem("notificationSelectedLongitude", $scope.notification.longitude);  
    localStorage.setItem("notificationSelectedIcon", $scope.notification.icon);  
    localStorage.setItem("notificationSelectedEventType", $scope.notification.eventType);  
    localStorage.setItem("notificationSelectedName", $scope.notification.name); 
    localStorage.setItem("notificationSelectedDate", $scope.notification.date); 

    localStorage.setItem("mapmode", MAP_MODE.notification);

    //$scope.titulo_mapa = localStorage.getItem("notificationSelected");          
    $state.go('tab.map');

  };

$scope.notificationArchiveChange = function() {
  //console.log("archive:" + $scope.notification.value);

  if ($scope.notification.value) {
    //notifications.splice($stateParams.notificationId, 1);

    archiveNotification($http, $scope.notification['mongoId'], URL, APP);
    $state.go('tab.notifications',  {cache: false, mode: localStorage.getItem("group_notifications")});
  }

};

  
})





