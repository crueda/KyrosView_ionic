angular.module('main')

.constant('APP', {
  version: '1.2',
  //api_base: 'http://localhost:3003'
  //api_base: 'https://demos-api.kyroslbs.com'
  api_base: 'https://api.kyroslbs.com'
})

.constant('MAP_MODE', {
  init: 0,
  notification: 1,
  device: 2,
  push: 3,
  report: 4,
})

.constant('URL', {
  login: '/api/app/login',
  archiveNotification: '/api/app/notification/archive',
  archiveAllNotifications: '/api/app/notification/archive/user',
  getNotificationsLimit: '/api/app/notificationLimit',
  listDevices: '/api/app/monitorList',
  saveToken: '/api/app/notification/setToken',
  saveDeviceInfo: '/api/app/setDeviceInfo/user',
  tracking1device: '/api/app/tracking1/device',
  trackingDevice: '/api/app/tracking/device',
  setDefaultVehicle: '/api/app/vehicle/setAsDefault',
  configEventChange: '/api/app/notification/config/change',
  configUserPreferences: '/api/app/user',
  getConfigNotifications: '/api/app/notification/config/user',
  getStatusNotifications: '/api/app/notification/status/user',
  getGraphData: '/api/app/graph/device',
  getReportDailyData: '/api/app/report_daily/device',
  resetGraphData: '/api/app/graph/reset/device',
});
