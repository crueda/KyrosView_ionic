var notifications = [];
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
    $http.get(url).success(function(data, status, headers,config){            
      
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
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      })
      .then(function(result){
        things = result.data;
      });
  }
  
  function onConfirm(buttonIndex) {
    //alert('You selected button ' + buttonIndex);
    if (buttonIndex==1) {
      archiveAllNotification ($http, $scope, URL, APP);
    }
  }

 
angular.module('main.notification', [])
.controller('NotificationsCtrl', function($scope, $http, Notifications, $ionicPopup, $ionicLoading, $timeout, URL, APP) {

  var urlArchive = APP.api_base + URL.archiveNotification;

    $scope.archiveNotifications = function() {

    navigator.notification.confirm(
        'Tienes ' + num_notifications + ' notificaciones.\r\n¿Deseas eliminarlas todas?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Confirmar',           // title
        ['Si','No']     // buttonLabels
    );

  /*
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar',
     template: '¿Deseas eliminar todas las notificaciones?'
   });

   confirmPopup.then(function(res) {
     if(res) {
        archiveAllNotification ($http, $scope, URL);
     } else {
       //console.log('You are not sure');
     }
   });
   */

  }

  $scope.doRefresh = function() {
    $timeout( function() {
    var url = APP.api_base + URL.getNotificationsLimit + "?username="+localStorage.getItem("username");
    console.log(url);
    notifications = [];

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
          latitude: lat,
          longitude: lon,
          speed: data.result[i].speed.toFixed(1),
          heading: data.result[i].heading.toFixed(1),
          altitude: data.result[i].altitude.toFixed(0),
          geocoding: data.result[i].geocoding,
          battery: data.result[i].battery          
        }
        notifications.push(notification);
        }
          $scope.notifications = notifications;

          // Texto del indicador
          num_notifications = data.result.length;
          if (num_notifications>99) {
            $scope.num_notifications = "99+"
          } else {
            $scope.num_notifications = num_notifications          
          }

          // Anchura del indicador
          if (num_notifications > 99) {
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


    var url = urlArchive + "?username="+ localStorage.getItem("username") + "&notificationId="+notification['mongoId'];
    $http.get(url).success(function(data, status, headers,config){            
    })
    .error(function(data, status, headers,config){
    });

  }

  var url = APP.api_base + URL.getNotificationsLimit + "?username="+localStorage.getItem("username");
  //var url = URL.getNotificationsLimit + "?username=robertodat";
  console.log(url);
  notifications = [];
  $ionicLoading.show({
    //template: '<ion-spinner icon="bubbles"></ion-spinner><p>LOADING...</p>'
    //templateUrl: 'loading.html',
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $http.get(url)
    .success(function(data, status, headers,config){
      $ionicLoading.hide(); 

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
          latitude: lat,
          longitude: lon,
          speed: data.result[i].speed.toFixed(1),
          heading: data.result[i].heading.toFixed(1),
          altitude: data.result[i].altitude.toFixed(0),
          geocoding: data.result[i].geocoding,
          battery: data.result[i].battery            
          }
        notifications.push(notification);
      }
      $scope.notifications = notifications;
      num_notifications = data.num_notifications;

      // Texto del indicador
      if (num_notifications>99) {
        $scope.num_notifications = "99+"
      } else {
        $scope.num_notifications = num_notifications;        
      }

      // ALtura del indicador
      if (ionic.Platform.isIOS()) {
            $scope.top_bubble = 24;
      } else {
            $scope.top_bubble = 6;            
      }

      // Anchura del indicador
      if (num_notifications > 99) {
        $scope.width_bubble = 47;
      } else if (num_notifications > 9){
        $scope.width_bubble = 37;            
      } else {
        $scope.width_bubble = 27;                        
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
    //$state.go('login');            
    });
})

.controller('NotificationDetailCtrl', function($scope, $http, $state, $ionicPopup, $cordovaNativeAudio, $stateParams, Notifications, MAP_MODE, URL, APP) {
  //$scope.notification = Notifications.get($stateParams.notificationId);
  $scope.notification = notifications[$stateParams.notificationId];

  $scope.archiveSelectNotification = function(notificationId) {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar',
     template: '¿Deseas eliminar esta notificación?'
   });
   confirmPopup.then(function(res) {
     if(res) {
        archiveNotification ($http, notificationId, URL, APP);
        $state.go('tab.notifications');
     } 
   });
  }

    $scope.showMapNotification = function() {
    
    $scope.notification = notifications[$stateParams.notificationId];
    localStorage.setItem("notificationSelected", $scope.notification.id);  
    localStorage.setItem("notificationSelectedVehicleLicense", $scope.notification.vehicleLicense);  
    localStorage.setItem("notificationSelectedLatitude", $scope.notification.latitude);  
    localStorage.setItem("notificationSelectedLongitude", $scope.notification.longitude);  
    localStorage.setItem("notificationSelectedIcon", $scope.notification.icon);  
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
    $state.go('tab.notifications');
  }

};

  
})





