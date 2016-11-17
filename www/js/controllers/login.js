  function saveToken ($http, URL) {
    var urlSaveToken_complete = URL.saveToken + "?username="+ localStorage.getItem("username") + "&token="+ localStorage.getItem("token");
    console.log(urlSaveToken_complete);
    $http.get(urlSaveToken_complete).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      })
      .then(function(result){
        things = result.data;
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

    if (localStorage.getItem("check_remember")=="true") {
      $scope.data = {username: localStorage.getItem("login_username"), password: localStorage.getItem("login_password")};
    } else {
      $scope.data = {};      
    }
    //$scope.data = {username: 'crueda', password: 'dat1234'};

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
      var url = URL.login + "?version="+APP.version+"&username="+ $scope.data.username +"&password="+$scope.data.password;
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
              saveToken($http, URL);

              if (localStorage.getItem("check_remember")=="true") {
                localStorage.setItem("login_username", $scope.data.username); 
                localStorage.setItem("login_password", $scope.data.password); 
              }

              // ir a estaña de notificaciones
              $state.go('tab.notifications');
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