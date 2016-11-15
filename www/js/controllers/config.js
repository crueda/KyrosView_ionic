angular.module('main.config', [])
.controller('ConfigCtrl', function($scope, $http, $state, URL) {

    var url = URL.getStatusNotifications + "/" + localStorage.getItem("username");
    $http.get(url).success(function(data, status, headers,config){            
    	if (data==1) {
    		$scope.settings = {
    			enableNotifications: true
  			};
    	} else {
    		$scope.settings = {
    			enableNotifications: false
  			};
    	}
      })
      .error(function(data, status, headers,config){
      });



 $scope.configNotificationsChange = function() {
    var url;
    if ($scope.settings.enableNotifications) {
      url = URL.configNotificationsEnable + "/" + localStorage.getItem("username");
    } else {
      url = URL.configNotificationsDisable + "/" + localStorage.getItem("username");
    }
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
   };

  $scope.logout = function() {
    localStorage.setItem("username", "");
    $scope.data = {};
    $state.go('login');
  };


})