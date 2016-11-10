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
      return '/img/event.png'; 
    } else {
       var evento = EventEnum[eventType];
       if (evento!=undefined) {
        return '/img/events/' + EventEnum.properties[evento].icon; 
      } else {
        return "";
      }
    }
  }

  function archiveNotification ($http, notificationId) {
    //var URL = "http://view.kyroslbs.com/api/login?username=crueda&password=dat1234";
    var URL = "http://localhost:3000/api/notification/archive?username="+ localStorage.getItem("username") + "&notificationId="+notificationId;
    $http.get(URL).success(function(data, status, headers,config){            
        //console.log(data); // for browser console
      })
      .error(function(data, status, headers,config){
        //console.log('error:'+data);
      })
      .then(function(result){
        things = result.data;
      });
  }

angular.module('starter.controllers', [])

.controller('ScheduleCtrl', function($scope) {})

.controller('NotificationsCtrl', function($scope, $http, Notifications) {
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

  $scope.remove = function(notification) {
    notifications.splice(notifications.indexOf(notification), 1);
    archiveNotification($http, notification['mongoId']);
  }

  var URL = "http://localhost:3000/api/notification?username=crueda";
  //var URL = "http://view.kyroslbs.com/api/notification?username="+localStorage.getItem("username");
  $http.get(URL)
    .success(function(data, status, headers,config){
      //console.log('>>'+localStorage.getItem("username"));
              
      for (var i=0; i<data.length; i++) {
                notification = { mongoId: data[i]._id,
                  id: i,
                  vehicleLicense: data[i].vehicle_license,
                  name: getEventDescription(data[i].subtype),
                  icon: getEventIcon(data[i].subtype),
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
              //$scope.notifications = Notifications.all();
           })
          .error(function(data, status, headers,config){
            //console.log('api error');
            $state.go('login');            
          })
          .then(function(result){
            things = result.data;
  });

})

.controller('NotificationDetailCtrl', function($scope, $stateParams, Notifications) {
  //$scope.notification = Notifications.get($stateParams.notificationId);
  $scope.notification = notifications[$stateParams.notificationId];
})

.controller('ConfigCtrl', function($scope) {
  $scope.settings = {
    enableStartStop: true,
    enableAlarm: true,
    enableZone: true,
    enableRoute: true,
    enablePoi: true
  };
})

.controller('LoginCtrl', function($scope, $http, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.login = function() {
          //var URL = "http://view.kyroslbs.com/api/login?username="+$scope.data.username+"&password="+$scope.data.password;
          var URL = "http://view.kyroslbs.com/api/login?username=crueda&password=dat1234";
          $http.get(URL)
            .success(function(data, status, headers,config){            
              if (data=="ok") {
                localStorage.setItem("username", $scope.data.username);
                $state.go('tab.notifications');
              } else {
                var alertPopup = $ionicPopup.alert({
                  title: 'Login incorrecto!',
                  template: 'Por favor, compruebe sus credenciales'
                });
              }
              //console.log(data); // for browser console
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