angular.module('main')

.constant('APP', {
  version: 3,
  api_base: 'http://localhost:3000'
  //api_base: 'http://view.kyroslbs.com'
})

.constant('MAP_MODE', {
  init: 0,
  notification: 1,
  device: 2,
  push: 3,
})

.constant('NOTIFICATION_EVENTS', {
  panic: "902,903,905,906,907,908,909,918,919,928,929,1055,1011,1008",
  start_stop: "912,913,914,915,930,981,982,983,984,985,945,946,983",
  route: "962,963,964,1045,1046",
  zone: "948,949,950,951,952,953,954,954,955,956,957,958,959,960,961,1040,1050",
  poi: "990,992",
  other: "910,911,920,921,922,923,924,925,926,927,931,932,933,934935,936,941,942,947,1029,1030,1033,1041"
})

.constant('URL', {
  login: '/api/app/login',
  archiveNotification: '/api/app/notification/archive',
  archiveAllNotifications: '/api/app/notification/archive/user',
  getNotification: '/api/app/notification',
  getNotificationsLimit: '/api/app/notificationLimit',
  listDevices: '/api/app/monitorList',
  saveToken: '/api/app/notification/setToken',
  tracking1vehicle: '/api/app/tracking1/vehicle',
  trackingVehicle: '/api/app/tracking/vehicle',
  setDefaultVehicle: '/api/app/vehicle/setAsDefault',
  configEventChange: '/api/app/notification/config/change',
  configUserPreferences: '/api/app/user',
  getConfigNotifications: '/api/app/notification/config/user',
  getStatusNotifications: '/api/app/notification/status/user',
  //configNotificationsEnable: '/api/app/notification/enable/user',
  //configNotificationsDisable: '/api/app/notification/disable/user',
  //treeDevices: '/api/app/monitor',
  //configEventsAdd: '/api/app/notification/config/add',
  //configEventsRemove: '/api/app/notification/config/remove',
  //getStatusNotificationsUserVehicle: '/api/app/notification/status'
});
