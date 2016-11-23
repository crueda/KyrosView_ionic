  function saveToken ($http, URL, APP) {
    var url = APP.api_base + URL.saveToken + "?username="+ localStorage.getItem("username") + "&token="+ localStorage.getItem("token");
    //console.log(url);
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
  }

angular.module('main.login', [])
.controller('LoginCtrl', function($scope, $http, LoginService, $ionicLoading, $timeout, $ionicPopup, $state, URL, MAP_MODE, APP) {

  $scope.clean = function() {
      $scope.data = {}; 
       $scope.settings = {
        remember: false
      };  
  }

  $scope.version = function() {
    //navigator.notification.alert("Versión: " + APP.version, null, "Kyros App", "Ok");
    var alertPopup = $ionicPopup.alert({
      title: 'Kyros App',
      template: 'Vesión: ' + APP.version
    });
  }

    if (localStorage.getItem("check_remember")=="true") {
      $scope.data = {username: localStorage.getItem("login_username"), password: localStorage.getItem("login_password")};
    } else {
      $scope.data = {};      
    }
    $scope.data = {username: 'crueda', password: 'dat1234'};

    if (localStorage.getItem("check_remember")=="true") {
      $scope.settings = {
        remember: true
      };          
    } else {
      $scope.settings = {
        remember: false
      };                
    }

    //$scope.check_remember = localStorage.getItem("check_remember");
    $scope.remember = function() {      
      console.log ($scope.settings.remember);
      if ($scope.settings.remember){
        localStorage.setItem("check_remember", "true");         
      } else {
        localStorage.setItem("check_remember", "false");         
      }
    }

    $scope.login = function() {      
      // Mostrar loading
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      
      // peticion de login
      var url = APP.api_base + URL.login + "?version="+APP.version+"&username="+ $scope.data.username +"&password="+$scope.data.password;
      console.log(url);
        $http.get(url)
          .success(function(data, status, headers,config){     
            $ionicLoading.hide();        
            if (data.status=="msg") {
              var alertPopup = $ionicPopup.alert({
                  title: data.title,
                  template: data.message
              });
            }
            else if (data.status=="ok") {
              if (data.result[0].vehicle_license!=undefined) {
                localStorage.setItem("vehicleLicense", data.result[0].vehicle_license);                  
              } else {
                localStorage.setItem("vehicleLicense", "");                  
              }
              localStorage.setItem("username", $scope.data.username);
              localStorage.setItem("notificationSelected", "");  
              localStorage.setItem("deviceSelected", "");  
              localStorage.setItem("mapmode", MAP_MODE.init);  
              /*localStorage.setItem("group_notifications", "1");
              if (data.result[0].group_notifications!=undefined) {
                localStorage.setItem("group_notifications", data.result[0].group_notifications);
              } */ 
              //if (ionic.Platform.isAndroid() && localStorage.getItem("token")!="") {
              if (localStorage.getItem("token")!=null && localStorage.getItem("token")!="") {
                  saveToken($http, URL, APP);
              }

              if (localStorage.getItem("check_remember")=="true") {
                localStorage.setItem("login_username", $scope.data.username); 
                localStorage.setItem("login_password", $scope.data.password); 
              }

              // ir a estaña de notificaciones
              $state.go('tab.notifications', {cache: false});                
              /*if (localStorage.getItem("group_notifications")==0) {
                $state.go('tab.notifications', {cache: false});                
              } else {
                $state.go('tab.notifications-group', {cache: false});                
              }*/
            } else {
              var alertPopup = $ionicPopup.alert({
                title: 'Login incorrecto!',
                template: 'Por favor, compruebe sus credenciales'
              });
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
            }, 1500);
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