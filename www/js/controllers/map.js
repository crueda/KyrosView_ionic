angular.module('main.map', [])
.controller('MapCtrl', function($scope, $http, $state, $ionicPopup, $cordovaGeolocation, URL, MAP_MODE) {


  var titulo = "Mapa";
  //if (localStorage.getItem("notificationSelected")!="") { 
  if (localStorage.getItem("mapmode") == MAP_MODE.notification) { 
    titulo = localStorage.getItem("notificationSelectedVehicleLicense") + " - " + localStorage.getItem("notificationSelectedName");
  } 
  else if (localStorage.getItem("mapmode") == MAP_MODE.device) { 
  //else if (localStorage.getItem("deviceSelected")!="") { 
    titulo = localStorage.getItem("deviceSelected");
  }  
  else { 
  //else if (localStorage.getItem("vehicleLicense")!="") { 
    titulo = localStorage.getItem("vehicleLicense");
  }  

  $scope.titulo_mapa = titulo;  

  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(41, -3);
    var mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Cuando el mapa esta cargado, pintar el vehiculo 
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     
    if (localStorage.getItem("mapmode") == MAP_MODE.notification) {  

      //localStorage.setItem("notificationSelected", "");  
        //$scope.titulo_mapa = localStorage.getItem("notificationSelected");  
        //console.log("titulo a:"+localStorage.getItem("notificationSelectedVehicleLicense"));
        var latLngNotification = new google.maps.LatLng(localStorage.getItem("notificationSelectedLatitude"), localStorage.getItem("notificationSelectedLongitude"));
        var image = {
          url: localStorage.getItem("notificationSelectedIcon"),
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(30, 30)
        };
      var marker = new google.maps.Marker({
          map: $scope.map,
          icon: image,
          animation: google.maps.Animation.DROP,
          position: latLngNotification
      });   


      // InfoWindow content
      var content = '<div id="iw-container">' +
                    '<div class="iw-title">' + localStorage.getItem("notificationSelectedName") + '</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Matricula:</div>' +
                      '<p>' + localStorage.getItem("notificationSelectedVehicleLicense") + '</p>' +
                      '<div class="iw-subTitle">Fecha:</div>' +
                      '<p>' + localStorage.getItem("notificationSelectedDate") + '</p>' + 
                      //'<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>' +
                      '<br>'+
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';


      var infoWindow = new google.maps.InfoWindow({
          //content: localStorage.getItem("notificationSelectedName")
          content: content,
          maxWidth: 180
      });
     
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      }); 
      google.maps.event.addListener($scope.map, 'click', function() {
        infoWindow.close();
      });
     
        google.maps.event.addListener(infoWindow, 'domready', function() {

    var iwOuter = $('.gm-style-iw');
    var iwBackground = iwOuter.prev();
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    iwOuter.parent().parent().css({left: '10px'});
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
    var iwCloseBtn = iwOuter.next();
    iwCloseBtn.css({opacity: '1', right: '18px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    } 

    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });

      $scope.map.setCenter(latLngNotification);  
      $scope.map.setZoom(15);



    }
    else if (localStorage.getItem("mapmode") == MAP_MODE.device) {   
      if (localStorage.getItem("deviceSelectedLatitude") != 0) {
        //localStorage.setItem("deviceSelected", "");   

        //$scope.titulo_mapa = localStorage.getItem("deviceSelected");
        //console.log("titulo a:"+localStorage.getItem("deviceSelected"));
        var latLngDevice = new google.maps.LatLng(localStorage.getItem("deviceSelectedLatitude"), localStorage.getItem("deviceSelectedLongitude"));
        var image = {
          url: 'img/devices/' + localStorage.getItem("deviceSelectedIcon"),
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(30, 30)
        };
        var marker = new google.maps.Marker({
            map: $scope.map,
            icon: image,
            animation: google.maps.Animation.DROP,
            position: latLngDevice
        });   
        /*var infoWindow = new google.maps.InfoWindow({
            content: localStorage.getItem("deviceSelectedAlias")
        });*/

       
        google.maps.event.addListener(marker, 'click', function () {
            //infoWindow.open($scope.map, marker);
            $state.go('tab.device-detail');   
        }); 
        $scope.map.setCenter(latLngDevice);  
        $scope.map.setZoom(15);

      
      } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Operación no permitida',
            template: 'No existen puntos de tracking'
          });
          //$scope.titulo_mapa = "Mapa";
          //console.log("titulo a:"+"Mapa");
          var actualLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $scope.map.setCenter(actualLatLng);
          $scope.map.setZoom(15);
          var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: actualLatLng
          });   
          var infoWindow = new google.maps.InfoWindow({
              content: "Estoy aqui"
          });
          google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($scope.map, marker);
          }); 
      }

 

    }
    else if (localStorage.getItem("vehicleLicense")!="") {    

      //$scope.titulo_mapa = localStorage.getItem("vehicleLicense");
      //console.log("titulo a:"+localStorage.getItem("vehicleLicense"));

      var bounds = new google.maps.LatLngBounds();
      var urlTracking_complete = URL.tracking1vehicle + "/" + localStorage.getItem("vehicleLicense");
      console.log(urlTracking_complete);
      $http.get(urlTracking_complete).success(function(data, status, headers,config){  
        var latLngVehicle = new google.maps.LatLng(data[0].location.coordinates[1], data[0].location.coordinates[0]);
        var image = {
          url: 'img/devices/' + data[0].icon,
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(30, 30)
        };
      var marker = new google.maps.Marker({
          map: $scope.map,
          icon: image,
          animation: google.maps.Animation.DROP,
          position: latLngVehicle
      });   
      var infoWindow = new google.maps.InfoWindow({
          content: data[0].alias
      });
     
      google.maps.event.addListener(marker, 'click', function () {
          //infoWindow.open($scope.map, marker);
          //$state.go('tab.device-detail');
      }); 
      bounds.extend(marker.position);
       $scope.map.setCenter(bounds.getCenter());  
      $scope.map.setZoom(15);

      })
      .error(function(data, status, headers,config){
      })
      .then(function(result){
        things = result.data;
      });

    } else {
      //$scope.titulo_mapa = "Mapa";
      //console.log("titulo a:"+"Mapaa");
      var actualLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.map.setCenter(actualLatLng);
      $scope.map.setZoom(15);
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: actualLatLng
      });   
      var infoWindow = new google.maps.InfoWindow({
          content: "Estoy aqui"
      });
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      }); 
    }
      
     
    });

 
  }, function(error){
    console.log("Could not get location");
  });
})
