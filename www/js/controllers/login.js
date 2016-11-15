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
.controller('LoginCtrl', function($scope, $http, LoginService, $ionicPopup, $state, URL, MAP_MODE) {
    //$scope.data = {};
    $scope.data = {username: 'crueda', password: 'dat1234'};
    $scope.login = function() {      
          var urlLogin_complete = URL.login + "?username="+ $scope.data.username +"&password="+$scope.data.password;
          console.log(urlLogin_complete);
          $http.get(urlLogin_complete)
            .success(function(data, status, headers,config){            
              if (data!="nok") {
                if (data[0].vehicle_license!=undefined) {
                  //localStorage.setItem("defaultVehicleLicense", data[0].vehicle_license);                  
                  localStorage.setItem("vehicleLicense", data[0].vehicle_license);                  
                } else {
                  localStorage.setItem("vehicleLicense", "");                  
                }
                localStorage.setItem("username", $scope.data.username);
                localStorage.setItem("notificationSelected", "");  
                localStorage.setItem("deviceSelected", "");  
                localStorage.setItem("mapmode", MAP_MODE.init);  
                saveToken($http, URL);
                //console.log("nuevo username:" +  localStorage.getItem("username"));
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