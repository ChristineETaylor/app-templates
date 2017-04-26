angular.module('myApp', [])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self'
    // Allow loading source from your assets domains.
  ]);
});
