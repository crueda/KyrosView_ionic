angular.module('main')

.constant('APP', {
  version: 4,
  //api_base: 'http://localhost:3000'
  api_base: 'http://view.kyroslbs.com'
  //api_base: 'http://192.168.28.248:3000'
})

.constant('MAP_MODE', {
  init: 0,
  notification: 1,
  device: 2,
  push: 3,
})

.constant('URL', {
  login: '/api/app/login',
  archiveNotification: '/api/app/notification/archive',
  archiveAllNotifications: '/api/app/notification/archive/user',
  getNotification: '/api/app/push/notification',
  getNotificationsLimit: '/api/app/notificationLimit',
  listDevices: '/api/app/monitorList',
  saveToken: '/api/app/notification/setToken',
  saveDeviceInfo: '/api/app/setDeviceInfo/user',
  tracking1vehicle: '/api/app/tracking1/vehicle',
  trackingVehicle: '/api/app/tracking/vehicle',
  setDefaultVehicle: '/api/app/vehicle/setAsDefault',
  configEventChange: '/api/app/notification/config/change',
  configUserPreferences: '/api/app/user',
  getConfigNotifications: '/api/app/notification/config/user',
  getStatusNotifications: '/api/app/notification/status/user',
  getIconsInfo: '/api/iconInfo',
  getAllIcons: '/api/allicons',
  getGraphData: '/api/app/graph/vehicle',
  resetGraphData: '/api/app/graph/reset/vehicle',

  //getIcon: '/api/icon',
  //getIcons: '/api/icons',
  //configNotificationsEnable: '/api/app/notification/enable/user',
  //configNotificationsDisable: '/api/app/notification/disable/user',
  //treeDevices: '/api/app/monitor',
  //configEventsAdd: '/api/app/notification/config/add',
  //configEventsRemove: '/api/app/notification/config/remove',
  //getStatusNotificationsUserVehicle: '/api/app/notification/status'
});
