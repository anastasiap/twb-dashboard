(function() {
    'use strict';

    angular
        .module('Video')
        .controller('videoCtrl', videoCtrl);

    videoCtrl.$inject = ['dataService', 'constants', '$route'];

    function videoCtrl(dataService, constants, $route) {
        var video = this, api = constants.apiURLs;
            video.list = [];
            video.types = [];
        var authors = [];
            video.getVideos = getVideos;
            video.videoDelete = videoDelete;
            video.getVideoByParam = getVideoByParam;

            video.notification = dataService.notificationStatus;
            video.status = dataService.errorNotif;

        initCtrl();

        /* Implementation */
        function initCtrl() {
            dataService.getUsers()
                .then(function(data){ authors = dataService.mapItems(data) })
                .then(function () { getVideoByParam('api/video', 'p', 1) });
        }

       function getVideos(url) {
            dataService.getItems(url).then(function(data){
                console.log('video data', data);

                video.list = setVideoData(data.videos.list);
                video.types = data.video_types;
                video.count_pages = data.videos.count_pages;
                video.total_pages = data.videos.total_pages;
                video.per_page = data.videos.per_page;
                video.current_page = data.videos.current_page;
            }).catch(function(err){ video.notification = video.status(err) });
        }

       function videoDelete(id) {
           dataService.deleteItem(api.video + id + '.json').then(function(data) {
                video.notification = video.status(data);
               getVideoByParam('api/video', 'p', 1);
           }).catch(function(err){ video.notification = video.status(err) });
       };

        function getVideoByParam(api, paramName, param) {
            var url = dataService.getItemsByParam(api, paramName, param);

            getVideos(url);
        }

        function setVideoData(video) {
            var items = Array.isArray(video) ? video: [video];

            return items.map(function(item){
                item.author_name = authors[item.author].fullname;

                return item;
            });
        }
    }
})();
