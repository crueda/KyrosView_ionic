

angular.module('main.controllers', [])
.controller('TestCtrl', function($scope, $rootScope, $compile, $http, $state, $ionicPopup/*, $cordovaGeolocation*/) {






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

/*
      console.log("refresh");
 var div = document.getElementById("map");
        reattachMap($scope.map,div);
*/
    });



       

 /*  }, function(error){
    console.log("Could not get location");
  });*/


})
