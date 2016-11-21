angular.module('main')

.constant('APP', {
  version: 1,
})

.constant('MAP_MODE', {
  init: 0,
  notification: 1,
  device: 2,
})

.constant('NOTIFICATION_EVENTS', {
  panic: "902,903,905,906,907,908,909,918,919,928,929,1055,1011,1008",
  start_stop: "912,913,914,915,930,981,982,983,984,985,945,946,983",
  route: "962,963,964,1045,1046",
  zone: "948,949,950,951,952,953,954,954,955,956,957,958,959,960,961,1040,1050",
  poi: "990,992",
  other: "910,911,920,921,922,923,924,925,926,927,931,932,933,934935,936,941,942,947,1029,1030,1033,1041"
})

.constant('URL2', {
  login: 'http://view.kyroslbs.com/api/app/login',
  archiveNotification: 'http://view.kyroslbs.com/api/app/notification/archive',
  archiveAllNotifications: 'http://view.kyroslbs.com/api/app/notification/archive/user',
  getNotifications: 'http://view.kyroslbs.com/api/app/notification',
  getNotificationsLimit: 'http://view.kyroslbs.com/api/app/notificationLimit',
  treeDevices: 'http://view.kyroslbs.com/api/app/monitor',
  listDevices: 'http://view.kyroslbs.com/api/app/monitorList',
  saveToken: 'http://view.kyroslbs.com/api/app/notification/setToken',
  tracking1vehicle: 'http://view.kyroslbs.com/api/app/tracking1/vehicle',
  trackingVehicle: 'http://view.kyroslbs.com/api/app/tracking/vehicle',
  setDefaultVehicle: 'http://view.kyroslbs.com/api/app/vehicle/setAsDefault',
  configEventsAdd: 'http://view.kyroslbs.com/api/app/notification/config/add',
  configEventsRemove: 'http://view.kyroslbs.com/api/app/notification/config/remove',
  configNotificationsEnable: 'http://view.kyroslbs.com/api/app/notification/enable/user',
  configNotificationsDisable: 'http://view.kyroslbs.com/api/app/notification/disable/user',
  getStatusNotifications: 'http://view.kyroslbs.com/api/app/notification/status/user',
  getStatusNotificationsUserVehicle: 'http://view.kyroslbs.com/api/app/notification/status'
})
 
.constant('URL', {
  login: 'http://localhost:3000/api/app/login',
  archiveNotification: 'http://localhost:3000/api/app/notification/archive',
  archiveAllNotifications: 'http://localhost:3000/api/app/notification/archive/user',
  getNotifications: 'http://localhost:3000/api/app/notification',
  getNotificationsLimit: 'http://localhost:3000/api/app/notificationLimit',
  treeDevices: 'http://localhost:3000/api/app/monitor',
  listDevices: 'http://localhost:3000/api/app/monitorList',
  saveToken: 'http://localhost:3000/api/app/notification/setToken',
  tracking1vehicle: 'http://localhost:3000/api/app/tracking1/vehicle',
  trackingVehicle: 'http://localhost:3000/api/app/tracking/vehicle',
  setDefaultVehicle: 'http://localhost:3000/api/app/vehicle/setAsDefault',
  configEventsAdd: 'http://localhost:3000/api/app/notification/config/add',
  configEventsRemove: 'http://localhost:3000/api/app/notification/config/remove',
  configNotificationsEnable: 'http://localhost:3000/api/app/notification/enable/user',
  configNotificationsDisable: 'http://localhost:3000/api/app/notification/disable/user',
  getStatusNotifications: 'http://localhost:3000/api/app/notification/status/user',
  getStatusNotificationsUserVehicle: 'http://localhost:3000/api/app/notification/status'
});
