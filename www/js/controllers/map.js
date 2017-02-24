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

  function getEventDate(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = pad(date.getMonth() + 1);
    var day = pad(date.getDate());
    var hours = pad(date.getHours());
    var minutes = pad(date.getMinutes());
    var seconds = pad(date.getSeconds());
    var strDate = day + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds;
    return strDate;
  }

  function getEventDescription(eventType) {
    //var evento = EVENT_ENUM.getByValue('value', eventType);
    var evento = EventEnum[eventType];
    if (evento!=undefined) {
      return EventEnum.properties[evento].description;      
    }
    return "";
  }


  var infoWindowDict = {};

angular.module('main.map', [])
.controller('MapCtrl', function($scope, $rootScope, $compile, $http, $state, $ionicPopup, $cordovaGeolocation, URL, MAP_MODE, APP, $sce) {

  $scope.historic = function() {
     if (localStorage.getItem("mapmode") == MAP_MODE.notification || localStorage.getItem("mapmode") == MAP_MODE.push) { 
      var actualDate = new Date().getTime();
      var initDate = actualDate - (86400000/12)*8;

      var bounds = new google.maps.LatLngBounds();
      var url = APP.api_base + URL.trackingVehicle + "/" + localStorage.getItem("notificationSelectedVehicleLicense");// + "?initDate=" + initDate + "&endDate=" + actualDate;
      //console.log(url);
      $http({
        method: 'POST',
        url: url,
        data: {initDate: initDate, endDate: actualDate},
        headers: {
          'x-access': localStorage.getItem("token_api")
        }}).success(function(data, status, headers,config){  
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
        if (status==200) {
          var alertPopup = $ionicPopup.alert({
              title: 'Tracking últimas 8 horas',
              template: 'No existen puntos de tracking'
          });          
        } else {  // vengo de un push
          $state.go('login');   
        }

      }
      })
      .error(function(data, status, headers,config){
         $state.go('login');  
      });
     }
  };

  var titulo = "";
  if (localStorage.getItem("mapmode") == MAP_MODE.push) { 
    titulo = localStorage.getItem("notificationSelectedVehicleLicense");
  } 
  else if (localStorage.getItem("mapmode") == MAP_MODE.notification) { 
    titulo = localStorage.getItem("notificationSelectedVehicleLicense") + " - " + localStorage.getItem("notificationSelectedName");
  } 
  else if (localStorage.getItem("mapmode") == MAP_MODE.device) { 
    titulo = localStorage.getItem("deviceSelected");
  }  
  else if (localStorage.getItem("mapmode") == MAP_MODE.report) { 
    titulo = localStorage.getItem("deviceSelected");
  }  
  else { 
    titulo = localStorage.getItem("vehicleLicense");
  }  

  $scope.titulo_mapa = titulo;  

  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    $scope.$on('$destroy', function () {
      $scope.map = null;
    });

    if ($scope.map ==null) {
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
     

    if (localStorage.getItem("mapmode") == MAP_MODE.notification) {  

        var latLngNotification = new google.maps.LatLng(localStorage.getItem("notificationSelectedLatitude"), localStorage.getItem("notificationSelectedLongitude"));
        /*var image = {
          url: localStorage.getItem("notificationSelectedIcon"),
          //anchor: new google.maps.Point(30, 30),
          scaledSize: new google.maps.Size(40, 40),
        };*/
/*
        var icono = "";
        if ($rootScope.eventIcon!=undefined)
          icono = 'data:image/svg+xml;utf-8,' + $sce.trustAsHtml($rootScope.eventIcon[localStorage.getItem("notificationSelectedEventType")].svg);
        else
           icono = getEventIcon(localStorage.getItem("notificationPushEventType")),
*/

      var marker = new google.maps.Marker({
          map: $scope.map,
          icon: {
            scaledSize: new google.maps.Size(40, 40),
            url: getEventIcon(localStorage.getItem("notificationSelectedEventType"))
            //url: 'data:image/svg+xml;utf-8,' + $sce.trustAsHtml($rootScope.eventIcon[localStorage.getItem("notificationSelectedEventType")].svg)
          },
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

      $scope.map.setCenter(latLngNotification);  
      $scope.map.setZoom(15);
    }
    else if (localStorage.getItem("mapmode") == MAP_MODE.push) {  

      //var url = APP.api_base + URL.getNotification + "/" + localStorage.getItem("notificationPushMongoId");
      //$http.get(url)
      //.success(function(data, status, headers,config){  

    var latLngNotification = new google.maps.LatLng(localStorage.getItem("notificationPushLatitude"), localStorage.getItem("notificationPushLongitude"));
    //var latLngNotification = new google.maps.LatLng(data[0].location.coordinates[1], data[0].location.coordinates[0]);
        var image = {
          scaledSize: new google.maps.Size(40, 40),
          //url: 'data:image/svg+xml;utf-8,' + $sce.trustAsHtml($rootScope.eventIcon[data[0].subtype].svg) 
          url: getEventIcon(localStorage.getItem("notificationPushEventType")),
        };

      var marker = new google.maps.Marker({
          map: $scope.map,
          icon: image,
          animation: google.maps.Animation.DROP,
          position: latLngNotification
      });   

      // InfoWindow content
      var content = '<div id="iw-container">' +
        '<div class="iw-title">' + getEventDescription(localStorage.getItem("notificationPushEventType")) + '</div>' +
        //'<div class="iw-title">' + getEventDescription(data[0].subtype) + '</div>' +
        '<div class="iw-content">' +
        '<div class="iw-subTitle">Matricula:</div>' +
        '<p>' + localStorage.getItem("notificationSelectedVehicleLicense") + '</p>' +
        '<div class="iw-subTitle">Fecha:</div>' +
        '<p>'  + getEventDate(parseInt(localStorage.getItem("notificationPushTimestamp"))) + '</p>' + 
        //'<p>'  + getEventDate(parseInt(data[0].timestamp)) + '</p>' + 
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

      //})
      //.error(function(data, status, headers,config){
      //});
      
    }else if (localStorage.getItem("mapmode") == MAP_MODE.device) {   
      if (localStorage.getItem("deviceSelectedLatitude") != 0) {
        var latLngDevice = new google.maps.LatLng(localStorage.getItem("deviceSelectedLatitude"), localStorage.getItem("deviceSelectedLongitude"));
        var image = {
          url: 'img/devices/' + localStorage.getItem("deviceSelectedIcon"),
          //anchor: new google.maps.Point(20, 20),
          scaledSize: new google.maps.Size(50, 50)
        };
        var marker = new google.maps.Marker({
            map: $scope.map,
            icon: image,
            animation: google.maps.Animation.DROP,
            position: latLngDevice
        });   

       
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
    }else if (localStorage.getItem("mapmode") == MAP_MODE.report) {   
      if ($rootScope.tracking.length>0) {
        var pathCoordinates = [];
        var bounds = new google.maps.LatLngBounds();
        var infoWindowStart;
        var infoWindowEnd;
        var markers = [];
        for (var t=0; t<$rootScope.tracking.length; t++) {
          var latLng = new google.maps.LatLng($rootScope.tracking[t].latitude, $rootScope.tracking[t].longitude);         
          var point = {lat: $rootScope.tracking[t].latitude, lng: $rootScope.tracking[t].longitude};
          pathCoordinates.push(point);
          var image = {
            url: 'img/beacon_ball_blue.gif',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(20, 20)
          };
          var marker = new google.maps.Marker({
              map: $scope.map,
              icon: image,
              position: latLng
          }); 
          markers.push(marker);

          if (t==0) {
            // InfoWindow content
            var content = '<div id="iw-container">' +
              '<div class="iw-title">' + 'Inicio jornada' + '</div>' +
              '<div class="iw-content">' +
              '<div class="iw-subTitle">Coordenadas:</div>' +
              '<p>' + $rootScope.tracking[t].latitude.toFixed(4) + ',' + $rootScope.tracking[t].longitude.toFixed(4) + '</p>' +
              '<div class="iw-subTitle">Fecha:</div>' +
              '<p>'  + getEventDate(parseInt($rootScope.tracking[t].timestamp)) + '</p>' + 
              '</div>' +
              '<div class="iw-bottom-gradient"></div>' +
              '</div>';

            var compiled = $compile(content)($scope);
            infoWindowStart = new google.maps.InfoWindow({
                content: compiled[0],
                maxWidth: 180
            });
          
          } else if (t==$rootScope.tracking.length-1) {

            // InfoWindow content
            var content = '<div id="iw-container">' +
              '<div class="iw-title">' + 'Fin jornada' + '</div>' +
              '<div class="iw-content">' +
              '<div class="iw-subTitle">Coordenadas:</div>' +
              '<p>' + $rootScope.tracking[t].latitude.toFixed(4) + ',' + $rootScope.tracking[t].longitude.toFixed(4) + '</p>' +
              '<div class="iw-subTitle">Fecha:</div>' +
              '<p>'  + getEventDate(parseInt($rootScope.tracking[t].timestamp)) + '</p>' + 
              '</div>' +
              '<div class="iw-bottom-gradient"></div>' +
              '</div>';

            var compiled = $compile(content)($scope);
            infoWindowEnd = new google.maps.InfoWindow({
                content: compiled[0],
                maxWidth: 180
            });
          }

            google.maps.event.addListener(marker, 'click', function () {
                infoWindowStart.open($scope.map, markers[0]);
                infoWindowEnd.open($scope.map, markers[$rootScope.tracking.length-1]);
            }); 

          bounds.extend(latLng);
        } // for    

            google.maps.event.addListener($scope.map, 'click', function() {
              infoWindowStart.close();
              infoWindowEnd.close();
            });
           
            google.maps.event.addListener(infoWindowStart, 'domready', function() {
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

            google.maps.event.addListener(infoWindowEnd, 'domready', function() {
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

        var historicPath = new google.maps.Polyline({
          path: pathCoordinates,
          strokeColor: '#0000FF',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
        historicPath.setMap($scope.map);
        $scope.map.fitBounds(bounds);


      
      } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Mensaje',
            template: 'No existen puntos de tracking'
          });
          //var actualLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var actualLatLng = new google.maps.LatLng(41, -3);
          $scope.map.setCenter(actualLatLng);
          $scope.map.setZoom(15);
      }
    }

    else if (localStorage.getItem("vehicleLicense")!="") {    

      var bounds = new google.maps.LatLngBounds();
      var url = APP.api_base + URL.tracking1vehicle + "/" + localStorage.getItem("vehicleLicense");
      $http({
        method: 'GET',
        url: url,
        headers: {
          'x-access': localStorage.getItem("token_api")
        }
      }).success(function(data, status, headers,config){  
        var latLngVehicle = new google.maps.LatLng(data[0].location.coordinates[1], data[0].location.coordinates[0]);
        var image = {
          url: 'img/devices/' + data[0].icon,
          //anchor: new google.maps.Point(15, 15),
          scaledSize: new google.maps.Size(50, 50)
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
    if (localStorage.getItem("mapmode") == MAP_MODE.push) {  

    $scope.$on('$destroy', function () {
      $scope.map = null;
    });

    if ($scope.map ==null) {
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

      var latLngNotification = new google.maps.LatLng(localStorage.getItem("notificationPushLatitude"), localStorage.getItem("notificationPushLongitude"));
      var image = {
          scaledSize: new google.maps.Size(40, 40),
          url: getEventIcon(localStorage.getItem("notificationPushEventType")),
      };

      var marker = new google.maps.Marker({
          map: $scope.map,
          icon: image,
          animation: google.maps.Animation.DROP,
          position: latLngNotification
      });   


      // InfoWindow content
      var content = '<div id="iw-container">' +
        '<div class="iw-title">' + getEventDescription(localStorage.getItem("notificationPushEventType")) + '</div>' +
        '<div class="iw-content">' +
        '<div class="iw-subTitle">Matricula:</div>' +
        '<p>' + localStorage.getItem("notificationSelectedVehicleLicense") + '</p>' +
        '<div class="iw-subTitle">Fecha:</div>' +
        '<p>'  + getEventDate(parseInt(localStorage.getItem("notificationPushTimestamp"))) + '</p>' + 
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

    });
      
    } else {
      navigator.notification.alert("Servicio de localización requerido", null, "Kyros App", "Ok");      
    }



  });
})
