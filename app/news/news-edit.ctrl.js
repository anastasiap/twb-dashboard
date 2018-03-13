(function() {
    'use strict';

    angular
        .module('News')
        .controller('newsEditCtrl', newsEditCtrl);

    newsEditCtrl.$inject = ['dataService', 'constants', '$routeParams', '$firebaseArray', '$route'];

    function newsEditCtrl(dataService, constants, $routeParams, $firebaseArray, $route) {
        var news = this, api = constants.apiURLs, ref = dataService.getRef("news");

            news.current = $routeParams.id !== '0' ? getCurrentNews($routeParams.id) : setNewItem();
            news.authors = [];
            news.categories = [];

            news.saveNewsItemToFirebase = saveNewsItemToFirebase;
            news.addNewItem = addNewItem;

            news.notification = dataService.notificationStatus;
            news.status = dataService.errorNotif;
            news.goToPath = dataService.goToPath;

        initCtrl();

        /* Implementation */
        function initCtrl() {
            news.newsList = $firebaseArray(ref);

            $firebaseArray(dataService.getRef("authors")).$loaded()
                .then(function(data){ news.authors = dataService.mapItems(data) });
            $firebaseArray(dataService.getRef("category")).$loaded()
                .then(function(data){ news.categories = data });
        }


        function setNewItem() {
            return news.current = {
                id: '',
                title: '',
                author: null,
                category: null,
                date_pub: new Date().toLocaleDateString("en-GB"),
                image_url: '',
                blockquote: '',
                body: ''
            }
        }

        function getCurrentNews(id) {
            var ref = dataService.getRef("news");

            $firebaseArray(ref).$loaded().then(function(data){
                var selected = data.filter(function(item, index){
                    item.index = index;
                    return item.$id === id;
                });

                news.current = selected[0];
            });
        }

        function addNewItem() {
            news.current.date_pub = news.current.date_pub.toString();

            news.newsList.$add(news.current).then(function(ref) {
                var id = ref.key;
                news.newsList.$indexFor(id);
                $route.updateParams({'id': id});
            });
        }

        function saveNewsItemToFirebase(index) {
            var ref = dataService.getRef("news"),
                list = $firebaseArray(ref);

            list.$save(index).then(function(ref) { });
        }

    }

})();
