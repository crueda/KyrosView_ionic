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


angular.module('main.controllers', [])
.controller('GraphCtrl', function($scope, $compile, $http, $state, $ionicPopup, $ionicLoading, APP, URL, MAP_MODE, $translate) {

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

  'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'

    $scope.goSumary = function() {
      $scope.showSumary = true;
      $scope.showReport = false;
      $scope.subtitulo_graphs = "Resumen global";
      $state.go('tab.graphs', {cache: false});
    }
    $scope.goReport = function() {
      $scope.showSumary = false;
      $scope.showReport = true;
      $scope.subtitulo_graphs = "Informe diario";
      $state.go('tab.graphs', {cache: false});
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
            //$state.go('tab.notifications', {cache: false, mode: localStorage.getItem("group_notifications")});      
            //$state.go('tab.graphs', {cache: false});      

          })
      } else {
       //console.log('You are not sure');
      }
    });   
  }

 $scope.showSumary = true;
$scope.showReport = false;

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