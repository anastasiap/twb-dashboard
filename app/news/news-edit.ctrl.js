(function() {
    'use strict';

    angular
        .module('News')
        .controller('newsEditCtrl', newsEditCtrl);

    newsEditCtrl.$inject = ['$scope', 'dataService', 'constants', '$routeParams', '$filter', 'Upload', '$firebaseArray', '$route', '$firebaseStorage'];

    function newsEditCtrl($scope, dataService, constants, $routeParams, $filter, Upload, $firebaseArray, $route, $firebaseStorage) {
        var news = this, api = constants.apiURLs,
            newsLength = null,
            ref = dataService.getRef("news");
            news.current = $routeParams.id !== '0' ? getCurrentNews($routeParams.id) : setNewItem();
            news.images_list = [];
            news.authors = [];
            news.categories = [];

            news.saveNews = saveNews;
            news.setMainFotoUrl = setMainFotoUrl;
            news.upload = upload;
            news.loadModal = loadModal;
            news.saveNewsItemToFirebase = saveNewsItemToFirebase;
            news.addNewItem = addNewItem;

            news.notification = dataService.notificationStatus;
            news.status = dataService.errorNotif;
            news.goToPath = dataService.goToPath;

            $scope.fotoUrl = '';

        initCtrl();

        /* Implementation */


        /*var storage = firebase.storage();
        var storageRef = storage.ref();
        var fileRef = storageRef.child('images/');

        $scope.uploadFile = function(file) {

            console.log("Let's upload a file!");
            console.log($scope.file);

            var storageRef = firebase.storage().ref('images/' + $scope.file.name);
            storageRef.child('images/').put($scope.file).then(function(snapshot){
                console.log(snapshot.getDownloadUrl);
                $scope.fotoUrl = snapshot.downloadURL;
            });

        };*/



        function setNewItem() {
            ref.on("value", function(snapshot) {
                newsLength = snapshot.numChildren() + 1;
            });

            var today = new Date();

            return news.current = {
                id: newsLength,
                title: '',
                author: null,
                category: null,
                date_pub: today,
                image_url: '',
                blockquote: '',
                body: ''
            }
        }

        function initCtrl() {
            news.newsList = $firebaseArray(ref);

            $firebaseArray(dataService.getRef("authors")).$loaded()
                .then(function(data){ news.authors = data });
            $firebaseArray(dataService.getRef("category")).$loaded()
                .then(function(data){ news.categories = data });
        }


        function setData(data) {
            var items = Array.isArray(data) ? data : [data];

            return items.map(function(item){
                item.author = authors[item.author].name;
                return item;
            });
        }

        function saveNewsItemToFirebase(record) {

            record.date_pub_string = record.date_pub.toString();
            //reference to news location
            var ref = dataService.getRef("news");
            var list = $firebaseArray(ref);

            list.$save(record).then(function(ref) {
                console.log(ref);
                var id = ref.key;
                console.log("added record with id " + id);
                list.$indexFor(id); // returns location in the array
            });
        }

        function getCurrentNews(id) {
            var ref = dataService.getRef("news");

            $firebaseArray(ref).$loaded().then(function(data){
                console.log('data', data);
                news.current = data.$getRecord(id);
                news.current.objectKey = id;

                console.log(news.current);
            });



            /*dataService.getItems(api.newsItem + id).then(function(data){
                console.log('newsItem', data);

                news.current = data;
                // если есть дата - преобразуем, иначе - берем текущую
                if( news.current.date_pub != null )  {
                    news.current.date_pub = new Date(news.current.date_pub);
                    news.current.main_foto_link = news.current.main_foto_url;
                } else {
                    news.current.date_pub = new Date();
                }
            }).catch(function(err){ news.notification = news.status(err) });*/
        }

        function addNewItem () {
            news.newsList.$add(news.current).then(function(ref) {
                console.log(ref);
                var id = ref.key;
                console.log("added record with id " + id);
                news.newsList.$indexFor(id); // returns location in the array

                $route.updateParams({'id': id});
            });
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
