(function () {
  'use strict';
  angular
    .module('instaflickr')
    .factory('PhotoService', function ($http, _, moment) {

        var urlOpts = {
          baseUrl: 'https://api.flickr.com/services/rest/?',
          apiKey: '79fb5d98470867ae3cd196873299538d',
          method: 'flickr.interestingness.getList',
          format: 'json',
          buildUrl: function () {
            return this.baseUrl + 'method=' + this.method + '&api_key=' + this.apiKey + '&format=' + this.format + '&extras=date_upload&nojsoncallback=1';
          }
        };
        var buildImgUrl = function (obj) {
          return 'https://farm' + obj.farm + '.staticflickr.com/' + obj.server + '/' + obj.id + '_' + obj.secret + '_z.jpg';
        };
        var mapDataToUrls = function (collection) {
          return _.map(collection, function (obj) {
            return {image: buildImgUrl(obj), title: obj.title, id: obj.id, dt: moment.unix(obj.dateupload).fromNow() };
          });
        };
// build image url in object with title, id, date
        var getPhotos = function () {
          return $http.get(urlOpts.buildUrl()).then(function (photos) {
             var flickrArray = photos.data.photos.photo;
             return mapDataToUrls(flickrArray);
          });
        };

        var getPhoto = function (id) {
          return $http.get(urlOpts.buildUrl()).then(function (photos) {
            var narrowedDownArr = _.where(photos.data.photos.photo, {id: id});
            console.log(narrowedDownArr);
              return mapDataToUrls(narrowedDownArr)[0];
          });
        };

        return {
          getPhotos: getPhotos,
          getPhoto: getPhoto
        };
    })
    .factory('LikesService', function ($http) {
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/instaflickr';
      var addLike = function (photo) {
        $http.post(url, photo).success(function (resp) {
          console.log(resp);
        }).error(function (err) {
          console.log(err);
        });
      };
      var getLikes = function () {
        return $http.get(url);
      };

      return {
        addLike: addLike,
        getLikes: getLikes
      };
    });

})();
