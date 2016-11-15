angular.module('main.device', [])
.controller('DevicesCtrl', function($scope, $state, $http, $ionicLoading, $timeout, URL) {

/*

var searchAirlines = function(searchFilter) {
         
        console.log('Searching airlines for ' + searchFilter);

        var deferred = $q.defer();

      var matches = airlines.filter( function(airline) {
        if(airline.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
      })

        $timeout( function(){
        
           deferred.resolve( matches );

        }, 100);

        return deferred.promise;

    };



var airlines = [{"fs":"LCI","iata":"LF","icao":"LCI","name":"Lao Central Airlines ","active":true},{"fs":"TGU","iata":"5U","icao":"TGU","name":"TAG","active":true},{"fs":"BT","iata":"BT","icao":"BTI","name":"Air Baltic","active":true},{"fs":"9J","iata":"9J","icao":"DAN","name":"Dana Airlines","active":true},{"fs":"2O","iata":"2O","icao":"RNE","name":"Island Air Service","active":true},{"fs":"NPT","icao":"NPT","name":"Atlantic Airlines","active":true},{"fs":"C8","iata":"C8","icao":"ICV","name":"Cargolux Italia","active":true},{"fs":"FK","iata":"FK","icao":"WTA","name":"Africa West","active":true},{"fs":"8K","iata":"8K","icao":"EVS","name":"EVAS Air Charters","active":true},{"fs":"W8","iata":"W8","icao":"CJT","name":"Cargojet","active":true},{"fs":"JBW","iata":"3J","icao":"JBW","name":"Jubba Airways (Kenya)","active":true},{"fs":"TNU","iata":"M8","icao":"TNU","name":"TransNusa","active":true},{"fs":"HCC","iata":"HC","icao":"HCC","name":"Holidays Czech Airlines","active":true},{"fs":"APJ","iata":"MM","icao":"APJ","name":"Peach Aviation","active":true},{"fs":"TUY","iata":"L4","icao":"TUY","name":"LTA","active":true},{"fs":"LAE","iata":"L7","icao":"LAE","name":"LANCO","active":true},{"fs":"L5*","iata":"L5","icao":"LTR","name":"Lufttransport","active":true},{"fs":"QA","iata":"QA","icao":"CIM","name":"Cimber","active":true},{"fs":"KBZ","iata":"K7","icao":"KBZ","name":"Air KBZ","active":true},{"fs":"L2","iata":"L2","icao":"LYC","name":"Lynden Air Cargo","active":true},{"fs":"MPK","iata":"I6","icao":"MPK","name":"Air Indus","active":true},{"fs":"CAO","icao":"CAO","name":"Air China Cargo ","active":true},{"fs":"BEK","iata":"Z9","icao":"BEK","name":"Bek Air","active":true},{"fs":"IAE","iata":"IO","icao":"IAE","name":"IrAero","active":true},{"fs":"GL*","iata":"GL","name":"Airglow Aviation Services","active":true},{"fs":"ATN","iata":"8C","icao":"ATN","name":"ATI","active":true},{"fs":"GU","iata":"GU","icao":"GUG","name":"Aviateca Guatemala","active":true},{"fs":"GHY","icao":"GHY","name":"German Sky Airlines ","active":true},{"fs":"SS","iata":"SS","icao":"CRL","name":"Corsair","active":true},{"fs":"XK","iata":"XK","icao":"CCM","name":"Air Corsica","active":true},{"fs":"W9*","iata":"W9","icao":"JAB","name":"Air Bagan","active":true},{"fs":"Z8*","iata":"Z8","icao":"AZN","name":"Amaszonas","active":true},{"fs":"D2","iata":"D2","icao":"SSF","name":"Severstal Aircompany","active":true},{"fs":"SNC","iata":"2Q","icao":"SNC","name":"Air Cargo Carriers","active":true},{"fs":"PST","iata":"7P","icao":"PST","name":"Air Panama","active":true},{"fs":"VV","iata":"VV","icao":"AEW","name":"Aerosvit Airlines","active":true},{"fs":"UJ","iata":"UJ","icao":"LMU","name":"AlMasria","active":true},{"fs":"9U","iata":"9U","icao":"MLD","name":"Air Moldova","active":true},{"fs":"NF","iata":"NF","icao":"AVN","name":"Air Vanuatu","phoneNumber":"678 238 48","active":true},{"fs":"NJS","iata":"NC","icao":"NJS","name":"Cobham Aviation","active":true}];
$scope.data = { "airlines" : [], "search" : '' };
$scope.search = function() {

      searchAirlines($scope.data.search).then(
        function(matches) {
          $scope.data.airlines = matches;
        }
      )
    }

*/

    var urlTreeDevices_complete = URL.treeDevices + "/" + localStorage.getItem("username");
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

    $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
  // process 'item'

  if (item.type===1) {
    localStorage.setItem("deviceSelected", item.name); 
    //console.log("click: " + item.name); 
    $state.go('tab.device-detail');
  }
});


})


.controller('DeviceDetailCtrl', function($scope, $state, $http, $ionicPopup, $timeout, URL, MAP_MODE, NOTIFICATION_EVENTS) {
    
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
      })
      .error(function(data, status, headers,config){
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