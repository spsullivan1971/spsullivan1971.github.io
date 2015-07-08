(function () {
  'use strict';
  angular
    .module('instaflickr')
    .controller('MainController', function ($scope, PhotoService, $routeParams) {
      PhotoService.getPhotos().then(function (photos) {
        console.log(photos);
        $scope.photos = photos;
      });
      PhotoService.getPhoto($routeParams.photoId).then(function (photo) {
        $scope.photo = photo;
      });

    })
    .controller('LikesController', function ($scope, LikesService) {
      LikesService.getLikes().success(function (likes) {
        $scope.likes = likes;
      });

      $scope.addLike = function (photo) {
        LikesService.addLike(photo);
      };


    });


})();
