angular.module('starter.services', [])

.factory('LoginService', function($q) {

  return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'a' && pw == 'a') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('Notifications', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var notifications = [{
    id: 0,
    name: '1615-FDW',
    lastText: 'Arranque',
    face: 'img/start.png'
  }, {
    id: 1,
    name: '0904FMP',
    lastText: 'Velocidad excedida',
    face: 'img/max_speed.png'
  }, {
    id: 2,
    name: '9870JBZ',
    lastText: 'Parada cerca de PDI',
    face: 'img/stop_near_poi.png'
  }, {
    id: 3,
    name: '0554GRV',
    lastText: 'Entrada en zona prohibida',
    face: 'img/zone_red.png'
  }, {
    id: 4,
    name: '2338HBX',
    lastText: 'Parada con tiempo excedido',
    face: 'img/stop_time_excedded.png'
  }];

  return {
    all: function() {
      return notifications;
    },
    remove: function(notifications) {
      notifications.splice(notifications.indexOf(notification), 1);
    },
    get: function(notificationId) {
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].id === parseInt(notificationId)) {
          return notifications[i];
        }
      }
      return null;
    }
  };
});


