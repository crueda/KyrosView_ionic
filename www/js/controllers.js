

angular.module('main.controllers', [])
.controller('TestCtrl', function($scope, $rootScope, $compile, $http, $state, $ionicPopup/*, $cordovaGeolocation*/) {



$scope.labels = ["Arranque", "Parada", "Otros"];
  $scope.data = [300, 500, 100];


$scope.labels2 = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  $scope.series = ['Tracking', 'Notificaciones'];

  $scope.data2 = [
    [65, 59, 80, 81, 56, 55, 40],
    [25, 19, 30, 41, 46, 15, 20]
  ];

  $scope.labels3 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  $scope.series3 = ['Tracking', 'Notificaciones'];
  $scope.data3 = [
    [65, 59, 80, 81, 56, 55, 40, 10, 23, 45, 47, 23, 24, 27, 29, 12, 11, 9, 5, 4, 2,4,7],
    [25, 19, 50, 21, 16, 25, 20, 3, 3, 5, 7, 13, 22, 17, 9, 5, 1, 0, 1, 2, 1,2,3]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options3 = {
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
          display: false,
          position: 'right'
        }
      ]
    }
  };

/*

  //var options = {timeout: 10000, enableHighAccuracy: true};
  //$cordovaGeolocation.getCurrentPosition(options).then(function(position){    


    var latLng = new google.maps.LatLng(41, -3);
      var mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    
  //  if ( $rootScope.map == null) {

    $rootScope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    console.log("Mapa creado");
//}
//google.maps.event.trigger(map, "resize");

    //} else {
     // console.log("reattachMap");
     // var div = document.getElementById("map");
     //reattachMap($rootScope.map,div);
    //}
    


    // Cuando el mapa esta cargado, pintar el vehiculo 
    google.maps.event.addListenerOnce($rootScope.map, 'idle', function(){

      console.log("Mapa preparado");

      $rootScope.map.setCenter(latLng);
      $rootScope.map.setZoom(15);
      
      var marker = new google.maps.Marker({
          map: $rootScope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });   
      var infoWindow = new google.maps.InfoWindow({
          content: "Estoy aqui"
      });
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($rootScope.map, marker);
      });


    });



       
;*/


})
