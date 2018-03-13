(function() {
    'use strict';

    angular
        .module('News')
        .controller('newsCtrl', newsCtrl);

        newsCtrl.$inject = ['dataService', 'constants', '$firebaseArray'];

        function newsCtrl(dataService, constants, $firebaseArray) {
            var news = this, api = constants.apiURLs;
                news.notification = dataService.notificationStatus;
                news.status = dataService.errorNotif;
                news.list = [];
                news.current = {};
                news.paging = {};

            initCtrl();
            
            /* implementation */
            function initCtrl() {
                $firebaseArray(dataService.getRef("authors")).$loaded()
                    .then(function(data){ news.authors = data })
                    .then(function() {
                        $firebaseArray(dataService.getRef("news")).$loaded().then(function(data){
                            news.list = setData(data);
                            news.paging.current_page = 1;
                            news.paging.total_pages = 1;
                            news.paging.count_pages = 1;
                            news.paging.per_page = 20;
                        })
                    });
                $firebaseArray(dataService.getRef("category")).$loaded()
                    .then(function(data){ news.categories = data });
            }


            function setData(data) {
                var items = Array.isArray(data) ? data : [data];

                return items.map(function(item){
                    item.date_pub = item.date_pub ? item.date_pub : new Date().toLocaleDateString("en-GB");
                    item.author_name = news.authors[item.author].name;
                    return item;
                });
            }
        }
})();
