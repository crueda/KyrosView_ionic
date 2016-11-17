var devices = [{"vehicle_license": "a"},{"vehicle_license": "b"},{"vehicle_license": "c"}] 
devices = devices.sort(function(a, b) {

  var deviceA = a.vehicle_license.toLowerCase();
  var deviceB = b.vehicle_license.toLowerCase();

  if(deviceA > deviceB) return 1;
  if(deviceA < deviceB) return -1;
  return 0;
});



angular.module('main.device', ['ionic'])

.controller('DevicesCtrl', function($scope, $state, $http, DevicesDataService, $ionicLoading, $timeout, URL) {

  $scope.selectDevice = function(device) {
    localStorage.setItem("deviceSelected", device.vehicle_license); 
    $state.go('tab.device-detail');
  }

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    //var url = URL.treeDevices + "/" + localStorage.getItem("username");
    var url = URL.listDevices + "/" + localStorage.getItem("username");
    $http.get(url)
    .success(function(data, status, headers,config){   
      devices = data;
      //$scope.tasks = data[0].monitor;
      $scope.data = { "devices" : [], "search" : '' };
      $scope.search = function() {
      DevicesDataService.searchDevices($scope.data.search).then(
        function(matches) {
          $scope.data.devices = matches;
        }
      )
      }

       $ionicLoading.hide();         
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

$scope.$on('$ionTreeList:LoadComplete', function(event, items) {
   $ionicLoading.hide();
});

    $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
  // process 'item'

  if (item.type===1) {
    localStorage.setItem("deviceSelected", item.name); 
    //console.log("click: " + item.name); 
    $state.go('tab.device-detail');
  }
});


})


.controller('DeviceDetailCtrl', function($scope, $state, $http, $ionicPopup, $ionicLoading, $timeout, URL, MAP_MODE, NOTIFICATION_EVENTS) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });    
    var url = URL.getStatusNotificationsUserVehicle + "?username=" + localStorage.getItem("username") + "&vehicleLicense="+ localStorage.getItem("deviceSelected");
    $http.get(url).success(function(data, status, headers,config){   
        if (data!=undefined) {
          $scope.settings = {
            enablePanic: data.panic,
            enableStartStop: data.start_stop,
            enableZone: data.zone,
            enableRoute: data.route,
            enablePoi: data.poi,
            enableOther: data.other
          };             
        }   
        $ionicLoading.hide();        
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


   var mapmode = MAP_MODE.device;

   $scope.titulo_device = localStorage.getItem("deviceSelected");
   //console.log (localStorage.getItem("deviceSelected"));


   $scope.configNotificationPanicChange = function() {
    var url;
    if ($scope.settings.enablePanic) {
      url = URL.configEventsAdd + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.panic;
    } else {
      url = URL.configEventsRemove + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.panic;
    }
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
   }

   $scope.configNotificationStartStopChange = function() {
    var url;
    if ($scope.settings.enableStartStop) {
      url = URL.configEventsAdd + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.start_stop;
    } else {
      url = URL.configEventsRemove + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.start_stop;
    }
    console.log(url);
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
   }

   $scope.configNotificationRoutesChange = function() {
    var url;
    if ($scope.settings.enableRoute) {
      url = URL.configEventsAdd + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.route;
    } else {
      url = URL.configEventsRemove + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.route;
    }
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
   }

   $scope.configNotificationZonesChange = function() {
    var url;
    if ($scope.settings.enableZone) {
      url = URL.configEventsAdd + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.zone;
    } else {
      url = URL.configEventsRemove + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.zone;
    }
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
   }

   $scope.configNotificationPoisChange = function() {
    var url;
    if ($scope.settings.enablePoi) {
      url = URL.configEventsAdd + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.poi;
    } else {
      url = URL.configEventsRemove + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.poi;
    }
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
   }

   $scope.configNotificationOtherChange = function() {
    var url;
    if ($scope.settings.enableOther) {
      url = URL.configEventsAdd + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.other;
    } else {
      url = URL.configEventsRemove + "?vehicleLicense=" + localStorage.getItem("deviceSelected") + "&username=" + localStorage.getItem("username") + "&eventIdList=" + NOTIFICATION_EVENTS.other;
    }
    $http.get(url).success(function(data, status, headers,config){            
      })
      .error(function(data, status, headers,config){
      });
   }

   $scope.showMapDevice = function() {
    var urlTracking_complete = URL.tracking1vehicle + "/" + localStorage.getItem("deviceSelected");
    console.log(urlTracking_complete);
    $http.get(urlTracking_complete).success(function(data, status, headers,config){  
      if (data[0]!=undefined) {
        localStorage.setItem("deviceSelectedLatitude", data[0].location.coordinates[1]);  
        localStorage.setItem("deviceSelectedLongitude", data[0].location.coordinates[0]);  
        localStorage.setItem("deviceSelectedIcon", data[0].icon);  
        localStorage.setItem("deviceSelectedAlias", data[0].alias);    
        localStorage.setItem("mapmode", mapmode); 
        $state.go('tab.map');         
      } else {
        localStorage.setItem("deviceSelectedLatitude", 0);  
        localStorage.setItem("mapmode", mapmode); 
        $state.go('tab.map');               
      }
    })
    .error(function(data, status, headers,config){
    });      
  }    

  $scope.setAsDefault = function() {
    //var actualDefaultVehicle = localStorage.getItem("defaultVehicleLicense");
    var selectedVehicle = localStorage.getItem("deviceSelected");
    var url = URL.setDefaultVehicle + "?username=" + localStorage.getItem("username") + "&vehicleLicense=" + localStorage.getItem("deviceSelected");
    console.log(url);
    $http.get(url).success(function(data, status, headers,config){  
      if (data[0]!=undefined) {
        //localStorage.setItem("defaultVehicleLicense", selectedVehicle);  
        localStorage.setItem("vehicleLicense", selectedVehicle);  
        var urlTracking = URL.tracking1vehicle + "/" + localStorage.getItem("deviceSelected");
        $http.get(urlTracking).success(function(data, status, headers,config){  
          if (data[0]!=undefined) {
            localStorage.setItem("deviceSelectedLatitude", data[0].location.coordinates[1]);  
            localStorage.setItem("deviceSelectedLongitude", data[0].location.coordinates[0]);  
            localStorage.setItem("deviceSelectedIcon", data[0].icon);  
            localStorage.setItem("deviceSelectedAlias", data[0].alias);   
            localStorage.setItem("mapmode", mapmode);   
            $state.go('tab.map');         
          } else {
            localStorage.setItem("deviceSelectedLatitude", 0); 
            localStorage.setItem("mapmode", mapmode);  
            $state.go('tab.map');               
          }
        })
        .error(function(data, status, headers,config){
        });   

      } 
    })
    .error(function(data, status, headers,config){
    });      
  }   


})