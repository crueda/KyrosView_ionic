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

  function archiveNotification ($http, notificationId) {
    var urlArchiveNotification_complete = urlArchiveNotification + "?username="+ localStorage.getItem("username") + "&notificationId="+notificationId;
    $http.get(urlArchiveNotification_complete).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      })
      .then(function(result){
        things = result.data;
      });
  }

  function saveToken ($http) {
    var urlSaveToken_complete = urlSaveToken + "?username="+ localStorage.getItem("username") + "&token="+ localStorage.getItem("token");
    console.log(urlSaveToken_complete);
    $http.get(urlSaveToken_complete).success(function(data, status, headers,config){            
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


angular.module('starter.controllers', [])

//.controller('MapCtrl', function($scope) {})
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Cuando el mapa esta cargado, pintar los eventos
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     
     var bounds = new google.maps.LatLngBounds();
     for (var i=0; i<notifications.length; i++) {
      var latLngNotification = new google.maps.LatLng(notifications[i].latitude, notifications[i].longitude);
      var image = {
        url: notifications[i].icon,
        size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(25, 25)
      };
      var marker = new google.maps.Marker({
          map: $scope.map,
          icon: image,
          animation: google.maps.Animation.DROP,
          position: latLngNotification
      });   
      
      var infoWindow = new google.maps.InfoWindow({
          content: notifications[i].name
      });
     
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });   

      bounds.extend(marker.position);
    }
    if (notifications.length>0) {
      $scope.map.fitBounds(bounds);      
    }
     
    });

 
  }, function(error){
    console.log("Could not get location");
  });
})

.controller('NotificationsCtrl', function($scope, $http, Notifications, $ionicLoading, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  /*
  $scope.notifications = Notifications.all();
  $scope.remove = function(notification) {
    Notifications.remove(notification);
  };*/


$scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      console.log("aa");
      //simulate async response
      //scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      //$scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
  };

  $scope.remove = function(notification) {
    //console.log("-->"+ notifications.indexOf(notification));
    notifications.splice(notifications.indexOf(notification), 1);
    archiveNotification($http, notification['mongoId']);
  }

  var urlGetNotifications_complete = urlGetNotifications + "?username="+localStorage.getItem("username");
  console.log(urlGetNotifications_complete);
  notifications = [];
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $http.get(urlGetNotifications_complete)
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
                  latitude: data[i].latitude,
                  longitude: data[i].longitude,
                  speed: data[i].speed,
                  heading: data[i].heading,
                  altitude: data[i].altitude,
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

.controller('NotificationDetailCtrl', function($scope, $http, $state, $stateParams, Notifications) {
  //$scope.notification = Notifications.get($stateParams.notificationId);
  $scope.notification = notifications[$stateParams.notificationId];

$scope.notificationArchiveChange = function() {
  //console.log("archive:" + $scope.notification.value);

  if ($scope.notification.value) {
    //notifications.splice($stateParams.notificationId, 1);

    archiveNotification($http, $scope.notification['mongoId']);
    $state.go('tab.notifications');
  }

};

  /*
  $scope.tasks = [
    {
      name: 'first task 1',
      checked: false,
      tree: [
        {
          name: 'first task 1.1',
           checked: true
        }
      ]
    },
    {
      name: 'first task 2',
       checked: false

    }
  ];
  */

/*
$scope.$on('$ionTreeList:ItemClicked', function(event, item) {
  // process 'item'
  console.log(item);
});

$scope.$on('$ionTreeList:LoadComplete', function(event, items) {
  // process 'items'
  console.log(items);
});
*/
  

})

.controller('ConfigCtrl', function($scope, $state) {
  $scope.settings = {
    enableStartStop: true,
    enableAlarm: true,
    enableZone: true,
    enableRoute: true,
    enablePoi: true
  };

  $scope.logout = function() {
    localStorage.setItem("username", "");
    $scope.data = {};
    $state.go('login');
  };


})

.controller('DevicesCtrl', function($scope, $http, $ionicLoading, $timeout) {
    var urlTreeDevices_complete = urlTreeDevices + "/" + localStorage.getItem("username");
    console.log(urlTreeDevices_complete);
    $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
              });
    $http.get(urlTreeDevices_complete)
    .success(function(data, status, headers,config){   
        $ionicLoading.hide();         
        $scope.tasks = data[0].monitor;
    })
    .error(function(data, status, headers,config){
        $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Error de red',
            scope: $scope
          });
        $timeout(function() {
             $ionicLoading.hide();
          }, 1500);
    })
})

.controller('LoginCtrl', function($scope, $http, LoginService, $ionicPopup, $state) {
    //$scope.data = {};
    $scope.data = {username: 'crueda', password: 'dat1234'};
    $scope.login = function() {
          var urlLogin_complete = urlLogin + "?username="+ $scope.data.username +"&password="+$scope.data.password;
          console.log(urlLogin_complete);
          $http.get(urlLogin_complete)
            .success(function(data, status, headers,config){            
              if (data=="ok") {
                localStorage.setItem("username", $scope.data.username);
                saveToken($http);
                console.log("nuevo username:" +  localStorage.getItem("username"));

                console.log("ir a notificaciones");
                $state.go('tab.notifications');
              } else {
                var alertPopup = $ionicPopup.alert({
                  title: 'Login incorrecto!',
                  template: 'Por favor, compruebe sus credenciales'
                });
              }
              //$scope.result = data; // for UI
          })
          .error(function(data, status, headers,config){
            //console.log('login error');
            var alertPopup = $ionicPopup.alert({
                title: 'Login incorrecto!',
                template: 'Por favor, compruebe sus credenciales'
            });
          })
          .then(function(result){
            things = result.data;
          });


      /*
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.notifications');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login incorrecto!',
                template: 'Por favor, compruebe sus credenciales'
            });
        });
        */
    }
});