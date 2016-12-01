 function pad(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
  }

  function getEventIcon(eventType) {
    if (eventType==0) {
      return 'img/event.png'; 
    } else {
       var evento = EventEnum[eventType];
       if (evento!=undefined) {
        return 'img/events/' + EventEnum.properties[evento].icon; 
      } else {
        return "";
      }
    }
  }


  var infoWindowDict = {};

angular.module('main.map', [])
.controller('MapCtrl', function($scope, $compile, $http, $state, $ionicPopup, $cordovaGeolocation, URL, MAP_MODE, APP) {

  $scope.historic = function() {
     if (localStorage.getItem("mapmode") == MAP_MODE.notification || localStorage.getItem("mapmode") == MAP_MODE.push) { 
      var actualDate = new Date().getTime();
      var initDate = actualDate - (86400000/12)*8;

      var bounds = new google.maps.LatLngBounds();
      var url = APP.api_base + URL.trackingVehicle + "/" + localStorage.getItem("notificationSelectedVehicleLicense") + "?initDate=" + initDate + "&endDate=" + actualDate;
      //console.log(url);
      $http.get(url).success(function(data, status, headers,config){  

        if (data.status=="ok" && data.result.length > 0) {
        var pathCoordinates = [];
        for (var i=0; i<data.result.length; i++) {
 
          var point = {lat: data.result[i].location.coordinates[1], lng: data.result[i].location.coordinates[0]};
          pathCoordinates.push(point);
          var latLng = new google.maps.LatLng(data.result[i].location.coordinates[1], data.result[i].location.coordinates[0]);
         
         var image = {
            url: 'img/beacon_ball_blue.gif',
            //size: new google.maps.Size(32, 32),
            //origin: new google.maps.Point(16, 16),
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(20, 20)
          };
          var marker = new google.maps.Marker({
              map: $scope.map,
              icon: image,
              //animation: google.maps.Animation.DROP,
              position: latLng
          });   
                   
          bounds.extend(latLng);

          /*
          var datePos = new Date(data.result[i].pos_date);
          var hours = pad(datePos.getHours());
          var minutes = pad(datePos.getMinutes());
          var seconds = pad(datePos.getSeconds());

          infoWindowDict[marker] = new google.maps.InfoWindow({
            content: hours + ":" + minutes + ":" + seconds,
            maxWidth: 180
          });
          google.maps.event.addListener(marker, 'click', function () {
              infoWindowDict[marker].open($scope.map, marker);
          }); 
          */
        }
        var historicPath = new google.maps.Polyline({
          path: pathCoordinates,
          //geodesic: true,
          strokeColor: '#0000FF',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });

        historicPath.setMap($scope.map);
        $scope.map.fitBounds(bounds);
      } else {
        var alertPopup = $ionicPopup.alert({
            title: 'Tracking últimas 8 horas',
            template: 'No existen puntos de tracking'
        });
      }
      })
      .error(function(data, status, headers,config){
      });
     }
  };

  var titulo = "Mapa";
  if (localStorage.getItem("mapmode") == MAP_MODE.push) { 
    titulo = localStorage.getItem("notificationSelectedVehicleLicense");
  } 
  else if (localStorage.getItem("mapmode") == MAP_MODE.notification) { 
    titulo = localStorage.getItem("notificationSelectedVehicleLicense") + " - " + localStorage.getItem("notificationSelectedName");
  } 
  else if (localStorage.getItem("mapmode") == MAP_MODE.device) { 
    titulo = localStorage.getItem("deviceSelected");
  }  
  else { 
    titulo = localStorage.getItem("vehicleLicense");
  }  

  $scope.titulo_mapa = titulo;  

  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    $scope.$on('$destroy', function () {
      console.log("Destruir EL MAPA");
      $scope.map = null;
    });

    if ($scope.map ==null) {
      console.log("CREAR EL MAPA");
      var latLng = new google.maps.LatLng(41, -3);
      var mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
 

    // Cuando el mapa esta cargado, pintar el vehiculo 
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     
    console.log("MAPA LISTO2");

    if (localStorage.getItem("mapmode") == MAP_MODE.notification) {  

        var latLngNotification = new google.maps.LatLng(localStorage.getItem("notificationSelectedLatitude"), localStorage.getItem("notificationSelectedLongitude"));
        var image = {
          url: localStorage.getItem("notificationSelectedIcon"),
          //anchor: new google.maps.Point(30, 30),
          scaledSize: new google.maps.Size(40, 40),
        };

      console.log("MARKER");

      var marker = new google.maps.Marker({
          map: $scope.map,
          icon: image,
          //icon: "img/events/stop.svg",
          
          /*
          icon: {
    anchor: new google.maps.Point(16, 16),
    url: 'data:image/svg+xml;utf-8, <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> <path fill="red" stroke="white" stroke-width="1.5" d="M3.5 3.5h25v25h-25z" ></path> </svg>'
    //url: 'data:image/svg+xml;utf-8, <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" transform="matrix(1.227483 0 0 1.207261 -7.147999 -6.763805)"><path d="m22.888 58c-1.061 0-2.078-.422-2.828-1.172l-12.887-12.887c-.751-.75-1.172-1.767-1.172-2.828l-.001-18.226c0-1.061.422-2.078 1.172-2.828l12.887-12.888c.75-.75 1.767-1.171 2.829-1.171h18.225c1.06 0 2.078.421 2.828 1.171l12.887 12.888c.75.751 1.172 1.768 1.172 2.829v18.224c0 1.061-.422 2.078-1.172 2.828l-12.887 12.888c-.75.75-1.768 1.172-2.828 1.172z" fill="#dedcd9"/><path d="m6 58h10.989l30.023-52h-41.012z" fill="#fff" opacity=".300003"/><path d="m53 29.563c0-2.531-.954-4.563-5.5-4.563h-3.5v14.001h3v-5h .5c4 0 5.5-1.938 5.5-4.438m-11 2.438c0-4.252-1.963-7.001-5-7.001-3.037 0-5 2.749-5 7.001 0 4.251 1.963 7 5 7 3.037 0 5-2.749 5-7m-11-7.001h-9v3h3v11.001h3v-11.001h3zm-9 9.677c0-3.318-2.284-3.803-4.917-4.433-1.543-.368-1.735-.769-1.809-1.181-.077-.441.211-1.063 1.321-1.063.78 0 1.386.301 1.564.919l2.883-.83c-.549-1.905-2.339-3.089-4.447-3.089-1.557 0-2.715.526-3.516 1.481-.695.827-.965 1.931-.758 3.103.479 2.72 3.848 3.343 4.83 3.579 1.72.411 1.849.866 1.849 1.514 0 .804-.785 1.324-2 1.324-.595 0-1.634-.128-1.921-.982l-2.844.955c.636 1.895 2.417 3.027 4.765 3.027 3.282 0 5-2.175 5-4.324m33-12.203v19.053l-13.474 13.474h-19.052l-13.474-13.473v-19.054l13.473-13.474h19.053zm-18 5.526c-1.578 0-2 2.514-2 4.001 0 1.486.422 4 2 4 1.579 0 2-2.514 2-4 0-1.487-.421-4.001-2-4.001m13 1.5c0 .688-.23 1.501-1.5 1.501h-1.5v-3.001h1.5c1.27 0 1.5.729 1.5 1.5" fill="#de7047"/></g></svg>'


    //url: "img/events/stop.svg"
  },*/
          draggable: false,
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
        '<button class="button button-block button-balanced tooltipButton" ng-click="historic()">Histórico 8h.</button>'+
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
        '</div>';

      var compiled = $compile(content)($scope);
      var infoWindow = new google.maps.InfoWindow({
          content: compiled[0],
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
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 96px !important;'});
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 96px !important;'});
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({opacity: '1', right: '1px', top: '1px', border: '7px solid #48b5e9', 'border-radius': '23px', 'box-shadow': '0 0 5px #3990B9'});

        if($('.iw-content').height() < 140){
          $('.iw-bottom-gradient').css({display: 'none'});
        } 

        iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
        });
      });

      console.log("CENTER");

      $scope.map.setCenter(latLngNotification);  
      $scope.map.setZoom(15);



    }
    else if (localStorage.getItem("mapmode") == MAP_MODE.push) {  
    var url = APP.api_base + URL.getNotification + "/"+localStorage.getItem("notificationPushMongoId");
    localStorage.setItem("notificationPushMongoId", 0);

    $http.get(url)
      .success(function(data, status, headers,config){
        if (data[0]!=undefined) {   

        var latLngNotification = new google.maps.LatLng(data[0].location.coordinates[1], data[0].location.coordinates[0]);
        var image = {
          url: getEventIcon(data[0].subtype),
          //anchor: new google.maps.Point(20, 20),
          scaledSize: new google.maps.Size(40, 40)
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
        '<button class="button button-block button-balanced tooltipButton" ng-click="historic()">Histórico 8h.</button>'+
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
        '</div>';

      var compiled = $compile(content)($scope);
      var infoWindow = new google.maps.InfoWindow({
          content: compiled[0],
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
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 96px !important;'});
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 96px !important;'});
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({opacity: '1', right: '1px', top: '1px', border: '7px solid #48b5e9', 'border-radius': '23px', 'box-shadow': '0 0 5px #3990B9'});

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
      
    })
    .error(function(data, status, headers,config){
    });




    }else if (localStorage.getItem("mapmode") == MAP_MODE.device) {   
      if (localStorage.getItem("deviceSelectedLatitude") != 0) {
        //localStorage.setItem("deviceSelected", "");   

        //$scope.titulo_mapa = localStorage.getItem("deviceSelected");
        //console.log("titulo a:"+localStorage.getItem("deviceSelected"));
        var latLngDevice = new google.maps.LatLng(localStorage.getItem("deviceSelectedLatitude"), localStorage.getItem("deviceSelectedLongitude"));
        var image = {
          url: 'img/devices/' + localStorage.getItem("deviceSelectedIcon"),
          //anchor: new google.maps.Point(20, 20),
          scaledSize: new google.maps.Size(40, 40)
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
            title: 'Mensaje',
            template: 'No existen puntos de tracking'
          });
          //var actualLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var actualLatLng = new google.maps.LatLng(41, -3);
          $scope.map.setCenter(actualLatLng);
          $scope.map.setZoom(15);
          /*
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
          });*/ 
      }

 

    }
    else if (localStorage.getItem("vehicleLicense")!="") {    

      //$scope.titulo_mapa = localStorage.getItem("vehicleLicense");
      //console.log("titulo a:"+localStorage.getItem("vehicleLicense"));

      var bounds = new google.maps.LatLngBounds();
      var url = APP.api_base + URL.tracking1vehicle + "/" + localStorage.getItem("vehicleLicense");
      //console.log(url);
      $http.get(url).success(function(data, status, headers,config){  
        var latLngVehicle = new google.maps.LatLng(data[0].location.coordinates[1], data[0].location.coordinates[0]);
        var image = {
          url: 'img/devices/' + data[0].icon,
          //anchor: new google.maps.Point(15, 15),
          scaledSize: new google.maps.Size(40, 40)
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
      //var actualLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var actualLatLng = new google.maps.LatLng(41, -3);
      $scope.map.setCenter(actualLatLng);
      $scope.map.setZoom(15);
      /*
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
      });*/ 
    }
      
     
    });

 
  }, function(error){
    console.log("Could not get location");
  });
})
