(function () {
  'use strict';

  angular
    .module('instaflickr', [
      'ngRoute',
      'underscore',
      'moment'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .when('/myLikes', {
          templateUrl: 'views/myLikes.html',
          controller: 'LikesController'
        })
        .when('/detail/:photoId', {
          templateUrl: 'views/detail.html',
          controller: 'MainController'
        })
        .when('/404', {
          template: '<h2>Sorry, page not found</h2>'
        })
        .otherwise({
          redirectTo: '/404'
        });
    });
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
      });
    angular
      .module('moment', [])
      .factory('moment', function ($window) {
        return $window.moment;
      });



})();
