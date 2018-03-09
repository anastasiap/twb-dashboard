(function() {
    'use strict';

    angular
        .module('Video')
        .controller('videoEditCtrl', videoEditCtrl);

    videoEditCtrl.$inject = ['dataService', 'constants', '$routeParams', '$filter'];

    function videoEditCtrl(dataService, constants, $routeParams, $filter) {
        var video = this, api = constants.apiURLs;
            video.types = [];
            video.authors = [];

            video.getVideos = getVideos;
            video.saveVideo = saveVideo;
            video.goToPath = dataService.goToPath;
            video.notification = dataService.notificationStatus;
            video.status = dataService.errorNotif;

        initCtrl();

        /* Implementation */
        function initCtrl() {
            dataService.getUsers()
                .then(function(data){ video.authors = data })
                .then(function(){ getVideoTypes() })
                .then(function(){ getVideos($routeParams.id);  });
        }

        function getVideoTypes() {
            dataService.getItems(api.video).then(function(data){
                video.types = data.video_types;
            }).catch(function(err){ video.notification = video.status(err) });
        }

        function getVideos(id) {
            dataService.getItems(api.video + id + '.json').then(function(data){
                video.current = data;

                // если есть дата - преобразуем, иначе - берем текущую
                if ( id !== '0' )  {
                    video.current.date_pub = new Date(video.current.date_pub);
                    video.current.author = video.authors.filter(function (a) { return a.id == data.author; })[0].id;
                    video.current.type = video.types.filter(function (t) { return t.id == data.type; })[0].id;
                } else {
                    video.current.date_pub = new Date();
                }
            }).catch(function(err){ video.notification = video.status(err) }) }

        function saveVideo(item, id) {
            this.video = item;

            // имутабельная переменная date_pub, поэтому дублируем ее для преобразования
            item.date_to_string_pub = $filter('date')(item.date_pub, 'yyyy-MM-dd HH:mm');

            var url = id ? api.video + id + '.json' : api.postVideo;

            dataService.addItem(url, item).then(function(data){
                video.notification = video.status(data);
            }).catch(function(err){ video.notification = video.status(err) });
        }
    }
})();
