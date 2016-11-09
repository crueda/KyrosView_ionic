angular.module('starter.controllers', [])

.controller('ScheduleCtrl', function($scope) {})

.controller('NotificationsCtrl', function($scope, Notifications) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.notifications = Notifications.all();
  $scope.remove = function(notification) {
    Notifications.remove(notification);
  };
})

.controller('NotificationDetailCtrl', function($scope, $stateParams, Notifications) {
  $scope.notification = Notifications.get($stateParams.notificationId);
})

.controller('ConfigCtrl', function($scope) {
  $scope.settings = {
    enableStartStop: true,
    enableAlarm: true,
    enableZone: true,
    enableRoute: true,
    enablePoi: true
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.notifications');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login incorrecto!',
                template: 'Por favor, compruebe sus credenciales'
            });
        });
    }
});