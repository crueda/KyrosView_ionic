var notifications = [];


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

  //todo
  function archiveAllNotification ($http, $scope, URL) {
    //console.log('You are not sure');
    var url = URL.archiveAllNotifications + "/" + localStorage.getItem("username");
    console.log(url);
    $http.get(url).success(function(data, status, headers,config){            
      
      notifications = [];
      $scope.notifications = notifications;

      })
      .error(function(data, status, headers,config){
      });
      
  }

  function archiveNotification ($http, notificationId, URL) {
    var url = URL.archiveNotification + "?username="+ localStorage.getItem("username") + "&notificationId="+notificationId;
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      })
      .then(function(result){
        things = result.data;
      });
  }
  
 function pad(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
  }

angular.module('main.notification', [])
.controller('NotificationsCtrl', function($scope, $http, Notifications, $ionicPopup, $ionicLoading, $timeout, URL) {

  var urlArchive = URL.archiveNotification;

    $scope.archiveNotifications = function() {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Archivar',
     template: '¿Deseas archivar todas las notificaciones?'
   });

   confirmPopup.then(function(res) {
     if(res) {
        archiveAllNotification ($http, $scope, URL);
     } else {
       //console.log('You are not sure');
     }
   });

  }

  $scope.doRefresh = function() {
    
    //console.log('Refreshing!');
    $timeout( function() {
      notifications = [];

  var url = URL.getNotifications + "?username="+localStorage.getItem("username");
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

      for (var i=0; i<data.length; i++) {
        var date = new Date(data[i].timestamp);
        var year = date.getFullYear();
        var month = pad(date.getMonth() + 1);
        var day = pad(date.getDate());
        var hours = pad(date.getHours());
        var minutes = pad(date.getMinutes());
        var seconds = pad(date.getSeconds());
        var strDate = day + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds;

        notification = { mongoId: data[i]._id,
                  id: i,
                  vehicleLicense: data[i].vehicle_license,
                  name: getEventDescription(data[i].subtype),
                  icon: getEventIcon(data[i].subtype),
                  date: strDate,
                  latitude: data[i].location.coordinates[1].toFixed(4),
                  longitude: data[i].location.coordinates[0].toFixed(4),
                  speed: data[i].speed.toFixed(1),
                  heading: data[i].heading.toFixed(1),
                  altitude: data[i].altitude.toFixed(0),
                  geocoding: data[i].geocoding,
                  battery: data[i].battery
                  
          }
        notifications.push(notification);
        }
          $scope.notifications = notifications;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .error(function(data, status, headers,config){
          //$scope.notifications = notifications;
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Error de red',
            scope: $scope
          });
          $timeout(function() {
             $ionicLoading.hide();
             $scope.$broadcast('scroll.refreshComplete');
             //$state.go('login');
          }, 1500);
          //$state.go('login');            
        });

      //simulate async response
      //scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      //$scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
  };

  $scope.remove = function(notification, URL) {
    //console.log("-->"+ notifications.indexOf(notification));
    notifications.splice(notifications.indexOf(notification), 1);
    //archiveNotification($http, notification['mongoId'], URL);


    var url = urlArchive + "?username="+ localStorage.getItem("username") + "&notificationId="+notification['mongoId'];
    $http.get(url).success(function(data, status, headers,config){            
    })
    .error(function(data, status, headers,config){
    });

  }

  var url = URL.getNotifications + "?username="+localStorage.getItem("username");
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

      for (var i=0; i<data.length; i++) {
        var date = new Date(data[i].timestamp);
        var year = date.getFullYear();
        var month = pad(date.getMonth() + 1);
        var day = pad(date.getDate());
        var hours = pad(date.getHours());
        var minutes = pad(date.getMinutes());
        var seconds = pad(date.getSeconds());
        var strDate = day + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds;

        notification = { mongoId: data[i]._id,
                  id: i,
                  vehicleLicense: data[i].vehicle_license,
                  name: getEventDescription(data[i].subtype),
                  icon: getEventIcon(data[i].subtype),
                  date: strDate,
                  latitude: data[i].location.coordinates[1].toFixed(4),
                  longitude: data[i].location.coordinates[0].toFixed(4),
                  speed: data[i].speed.toFixed(1),
                  heading: data[i].heading.toFixed(1),
                  altitude: data[i].altitude.toFixed(0),
                  geocoding: data[i].geocoding,
                  battery: data[i].battery
                  
          }
        notifications.push(notification);
        }
          $scope.notifications = notifications;
        })
        .error(function(data, status, headers,config){
          //$scope.notifications = notifications;
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
        })
        .then(function(result){
          things = result.data;
  });
})

.controller('NotificationDetailCtrl', function($scope, $http, $state, $cordovaNativeAudio, $stateParams, Notifications, MAP_MODE) {
  //$scope.notification = Notifications.get($stateParams.notificationId);
  $scope.notification = notifications[$stateParams.notificationId];


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

    archiveNotification($http, $scope.notification['mongoId']);
    $state.go('tab.notifications');
  }

};

  
})





