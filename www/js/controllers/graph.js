function getEventDescription(eventType) {
    //var evento = EVENT_ENUM.getByValue('value', eventType);
    var evento = EventEnum[eventType];
    if (evento!=undefined) {
      return EventEnum.properties[evento].description;      
    }
    return "";
  }

function getGraphVehicleLicense(MAP_MODE) {
  var vehicleLicense = "";
  if (localStorage.getItem("mapmode") == MAP_MODE.push) { 
    vehicleLicense = localStorage.getItem("notificationSelectedVehicleLicense");
  } 
  else if (localStorage.getItem("mapmode") == MAP_MODE.notification) { 
    vehicleLicense = localStorage.getItem("notificationSelectedVehicleLicense");
  } 
  else if (localStorage.getItem("mapmode") == MAP_MODE.device) { 
    vehicleLicense = localStorage.getItem("deviceSelected");
  }  
  else { 
    vehicleLicense = localStorage.getItem("vehicleLicense");
  } 
  return vehicleLicense;
}

function getEventDescription(eventType) {
    //var evento = EVENT_ENUM.getByValue('value', eventType);
    var evento = EventEnum[eventType];
    if (evento!=undefined) {
      return EventEnum.properties[evento].description;      
    }
    return "";
  }

angular.module('main.graphs', [])
.controller('GraphCtrl', function($scope, $rootScope, $compile, $timeout, $http, $state, $ionicPopup, $ionicLoading, $cordovaGeolocation, APP, URL, MAP_MODE, $translate) {

    $translate(['MSG_CONFIRM_COUNTERS', 'NO_EVENTS', 'NOTIFICATIONS', 'TRACKINGS', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']).then(function (translations) {
      msg_confirm = translations.MSG_CONFIRM_COUNTERS;
      msg_noevents = translations.NO_EVENTS;
      msg_trackings = translations.TRACKINGS;
      msg_notifications = translations.NOTIFICATIONS;
      msg_mon = translations.MONDAY;
      msg_tue = translations.TUESDAY;
      msg_wed = translations.WEDNESDAY;
      msg_thu = translations.THURSDAY;
      msg_fri = translations.FRIDAY;
      msg_sat = translations.SATURDAY;
      msg_sun = translations.SUNDAY;
    });

  
    $scope.goLeft = function() {
      $scope.showLeftArrow = true;
      $scope.showRightArrow = true;

      if ($scope.showSumary) {
        // ir a odometro
        $scope.subtitulo_graphs = "Odometro";  
        $scope.showOdometer = true;
        $scope.showReport = false;
        $scope.showSumary = false;
        $scope.showLeftArrow = false;
      } else if ($scope.showReport) {
        // ir a graficos
        $scope.subtitulo_graphs = "Resumen global";  
        $scope.showSumary = true;
        $scope.showOdometer = false;
        $scope.showLeftArrow = true;
        $scope.showReport = false;
      } 
      $state.go('tab.graphs', {cache: false});
    }
    $scope.goRight = function() {
      $scope.showLeftArrow = true;
      $scope.showRightArrow = true;

      if ($scope.showSumary) {
        // ir a informe
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        $scope.subtitulo_graphs = "Informe diario: " + yesterday.getDate() + "/" + (yesterday.getMonth() +1) + "/" + yesterday.getFullYear();
        $scope.showReport = true;
        $scope.showOdometer = false;
        $scope.showSumary = false;
        $scope.showRightArrow = false;
      } else if ($scope.showOdometer) {
        // ir a graficos
        $scope.subtitulo_graphs = "Resumen global";  
        $scope.showSumary = true;
        $scope.showOdometer = false;
        $scope.showReport = false;
        $scope.showRightArrow = true;
      } 
      $state.go('tab.graphs', {cache: false});
    }

  $scope.showMapHistoricDevice = function() {
      localStorage.setItem("mapmode", MAP_MODE.report);
      $state.go('tab.map', {cache: false});
  }

  $scope.resetCounters = function() {


    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar',
     template: msg_confirm
    });
    confirmPopup.then(function(res) {
      if(res) {
        var vehicleLicense = getGraphVehicleLicense(MAP_MODE);
        var url = APP.api_base + URL.resetGraphData + "/" + vehicleLicense;
        console.log(url);
        $http({
          method: 'GET',
          url: url,
          headers: {
            'x-access': localStorage.getItem("token_api")
          }})
        .success(function(data, status, headers,config){    
            $scope.graph1_labels = [no_events];
            $scope.graph1_data = [1];
            $scope.graph2_data = [[0],[0]];      
            $scope.graph3_data = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];        
          })
          .error(function(data, status, headers,config){
          })
          .then(function(data, status, headers,config){
          })
      } 
    });   
  }


  $scope.showSumary = true;
  $scope.showReport = false;
  $scope.showOdometer = false;
  $scope.showLeftArrow = true;
  $scope.showRightArrow = true;

  var vehicleLicense = getGraphVehicleLicense(MAP_MODE);  
  $scope.titulo_graphs = vehicleLicense;  
  $scope.subtitulo_graphs = "Resumen global";  

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  localStorage.setItem("deviceSelected", vehicleLicense);
  var url = APP.api_base + URL.getGraphData + "/" + vehicleLicense;
  console.log(url);
  $http({
    method: 'GET',
    url: url,
    headers: {
      'x-access': localStorage.getItem("token_api")
    }
  }).success(function(data, status, headers,config){  
    $ionicLoading.hide();

    var graph1_labels = [];
    var graph1_data = [];

    if (data[0]!=undefined) {
      if (data[0].eventTypeVector.length>0) {
        for (var i=0; i<data[0].eventTypeVector.length; i++) {
          graph1_labels.push(getEventDescription(parseInt(data[0].eventTypeVector[i][0])));
          graph1_data.push(data[0].eventTypeVector[i][1]);
        }                
      } else {
        var graph1_labels = [msg_noevents];
        var graph1_data = [1];        
      }
    } else {
      var graph1_labels = [msg_noevents];
      var graph1_data = [1];
    }

    $scope.graph1_labels = graph1_labels;
    $scope.graph1_data = graph1_data;

    $scope.graph2_labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    $scope.graph2_series = [msg_trackings, msg_notifications];

    if (data[0]!=undefined) {
      $scope.graph2_data = [
        data[0].hourTrackingCounter,
        data[0].hourEventCounter
      ];      
    } else {      
      $scope.graph2_data = [[0],[0]];      
    }
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.graph2_options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    $scope.graph3_labels = [msg_mon, msg_tue, msg_wed, msg_thu, msg_fri, msg_sat, msg_sun];
    $scope.graph3_series = [msg_trackings, msg_notifications];
    if (data[0]!=undefined) {
    $scope.graph3_data = [
      [data[0].weekTrackingCounter.monday, data[0].weekTrackingCounter.tuesday, data[0].weekTrackingCounter.wednesday, data[0].weekTrackingCounter.thursday, data[0].weekTrackingCounter.friday, data[0].weekTrackingCounter.saturday, data[0].weekTrackingCounter.sunday],
      [data[0].weekEventCounter.monday, data[0].weekEventCounter.tuesday, data[0].weekEventCounter.wednesday, data[0].weekEventCounter.thursday, data[0].weekEventCounter.friday, data[0].weekEventCounter.saturday, data[0].weekEventCounter.sunday]
    ];
    } else {
      $scope.graph3_data = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
    }

    var urlReport = APP.api_base + URL.getReportDailyData + "/" + vehicleLicense;
    console.log(url);
    $http({
      method: 'GET',
      url: urlReport,
      headers: {
        'x-access': localStorage.getItem("token_api")
      }
    }).success(function(data, status, headers,config){
      $scope.dayDistance = data.dayDistance.toFixed(3);
      $scope.weekDistance = data.weekDistance.toFixed(3);
      $scope.monthDistance = data.monthDistance.toFixed(3);
      $scope.daySpeed = data.daySpeed.toFixed(2);
      $scope.weekSpeed = data.weekSpeed.toFixed(2);
      $scope.monthSpeed = data.monthSpeed.toFixed(2);
      $scope.dayConsumption = data.dayConsume.toFixed(2);
      $scope.weekConsumption = data.weekConsume.toFixed(2);
      $scope.monthConsumption = data.monthConsume.toFixed(2);
      $scope.startDate = data.reportDailyStartDate;
      $scope.endDate = data.reportDailyEndDate;
      $scope.startGeocoding = data.reportDailyStartGeocoding;
      $scope.endGeocoding = data.reportDailyEndGeocoding;
      $scope.duration = data.reportDailyDuration;
      $scope.distance = data.reportDailyDistance;
      $scope.maxSpeed = data.reportDailyMaxSpeed;
      $scope.averageSpeed = data.reportDailyAverageSpeed;
      $scope.consumption = data.reportDailyConsumption;
      $scope.co2 = data.reportDailyCO2;

      // eventos
      var events = [];
      Object.keys(data.events).forEach(function(key) {
          var event = {"eventType": getEventDescription(key), "eventValue": data.events[key]};
          events.push(event);
      });
      $scope.events = events;

      //tracking
      $rootScope.tracking = data.tracking;

    })
    .error(function(data, status, headers,config){
      $ionicLoading.hide();
      $ionicLoading.show({
        template: 'Error de red',
          scope: $scope
        });
        $timeout(function() {
          $ionicLoading.hide();
          $state.go('tab.notifications');
        }, 1500);
      });



  })
  .error(function(data, status, headers,config){
    $ionicLoading.hide();
    $ionicLoading.show({
      template: 'Error de red',
        scope: $scope
      });
      $timeout(function() {
        $ionicLoading.hide();
        $state.go('tab.notifications');
      }, 1500);
  });




})