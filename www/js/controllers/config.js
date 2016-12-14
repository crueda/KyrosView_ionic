angular.module('main.config', [])
.controller('ConfigCtrl', function($scope, $state, $http, $state, URL, APP, $translate) {

  if (localStorage.getItem("username")=="") {
    $state.go('login');
  } else {

    var url = APP.api_base + URL.getStatusNotifications + "/" + localStorage.getItem("username");
    $http({
      method: 'GET',
      url: url,
      headers: {
        'x-access': localStorage.getItem("token_api")
      }})
    .success(function(data, status, headers,config){ 
    	var group_mode = false;
    	if (localStorage.getItem("group_notifications") == 1) {
    		group_mode = true;           
    	}
    	if (data==1) {
    		$scope.settings = {
    			enableNotifications: true,
    			enableGroupNotifications: group_mode
  			};
    	} else {
    		$scope.settings = {
    			enableNotifications: false,
    			enableGroupNotifications: group_mode
  			};
    	}
      })
      .error(function(data, status, headers,config){
      });
 }

$scope.switchLanguage = function(key) {
  localStorage.setItem("language", key);
  $translate.use(key);
};

  $scope.configChangeNumNotifications = function(optionSelected) {
    //console.log(optionSelected);
    localStorage.setItem("max_show_notifications", optionSelected);
    
    var url;
    var push_mode = 0;
    var group_mode = 0;
    if ($scope.settings.enableNotifications) {
      push_mode = 1;
    } 
    if ($scope.settings.enableGroupNotifications) {
      group_mode = 1;
      localStorage.setItem("group_notifications", 1);
    } else {
      localStorage.setItem("group_notifications", 0);
    } 
    url = APP.api_base + URL.configUserPreferences + "/" + localStorage.getItem("username") + "?push_mode=" + push_mode + "&group_mode=" + group_mode + "&max_show_notifications=" + optionSelected;    
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

 $scope.configChange = function() {
    var url;
    var push_mode = 0;
    var group_mode = 0;
    if ($scope.settings.enableNotifications) {
    	push_mode = 1;
    } 
    if ($scope.settings.enableGroupNotifications) {
    	group_mode = 1;
    	localStorage.setItem("group_notifications", 1);
    } else {
    	localStorage.setItem("group_notifications", 0);
    } 
    url = APP.api_base + URL.configUserPreferences + "/" + localStorage.getItem("username") + "?push_mode=" + push_mode + "&group_mode=" + group_mode;    
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
   };

  $scope.logout = function() {
    localStorage.setItem("username", "");
    localStorage.setItem("token_api", "");
    $scope.data = {};
    $state.go('login');
  };

})