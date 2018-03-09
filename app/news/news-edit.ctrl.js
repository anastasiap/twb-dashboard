(function() {
    'use strict';

    angular
        .module('News')
        .controller('newsEditCtrl', newsEditCtrl);

    newsEditCtrl.$inject = ['dataService', 'constants', '$routeParams', '$filter', 'Upload'];

    function newsEditCtrl(dataService, constants, $routeParams, $filter, Upload) {
        var news = this, api = constants.apiURLs;
            news.current = getCurrentNews($routeParams.id);
            news.images_list = [];
            news.authors = [];
            news.categories = [];

            news.saveNews = saveNews;
            news.setMainFotoUrl = setMainFotoUrl;
            news.upload = upload;
            news.loadModal = loadModal;

            news.notification = dataService.notificationStatus;
            news.status = dataService.errorNotif;
            news.goToPath = dataService.goToPath;

        initCtrl();

        /* Implementation */
        function initCtrl() {
            dataService.getUsers().then(function(data){  news.authors = data; });
            dataService.getCategories().then(function(data){  news.categories = data; });
        }

        function getCurrentNews(id) {
            dataService.getItems(api.newsItem + id).then(function(data){
                news.current = data;
                // если есть дата - преобразуем, иначе - берем текущую
                if( news.current.date_pub != null )  {
                    news.current.date_pub = new Date(news.current.date_pub);
                    news.current.main_foto_link = news.current.main_foto_url;
                } else {
                    news.current.date_pub = new Date();
                }
            }).catch(function(err){ news.notification = news.status(err) });
        }

        function saveNews(upnews, id) {
            this.upnews = upnews;

            // имутабельная переменная date_pub, поэтому дублируем ее для преобразования
            upnews.date_to_string = $filter('date')(upnews.date_pub, 'yyyy-MM-dd HH:mm');

            var url = id ? api.newsItem + id : api.postNews;

            dataService.addItem(url, upnews).then(function(data){
                news.notification = news.status(data);
            }).catch(function(err){ news.notification = news.status(err) });
        }

        // open modal window for choose image on server
        function loadModal () {
            news.images_list = [];

            dataService.getItems(api.fileList).then(function(data) {
                news.images_list = data.items;
            }).catch(function(err){ news.notification = news.status(err) });
        };

        function setMainFotoUrl(imgUrl) {
            news.current.main_foto_url = imgUrl;
            news.current.main_foto_link = imgUrl;
        }

        function upload(file) {
            Upload.upload({
                url: '/api/upload/file/' + $routeParams.id,
                data: { file: file , folder: 'posts/' }
            }).then(function (resp) {
                console.log(resp);
                news.current.main_foto_url = resp.data.url;
                news.current.main_foto_link = resp.data.url;
            }, function (resp) {
                news.notification = news.status(resp);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
    }

})();
