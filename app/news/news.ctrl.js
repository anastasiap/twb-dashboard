(function() {
    'use strict';

    angular
        .module('News')
        .controller('newsCtrl', newsCtrl);

        newsCtrl.$inject = ['dataService', 'constants'];

        function newsCtrl(dataService, constants) {
            var news = this, api = constants.apiURLs;
                news.list = getNews();
                news.current = {};
                news.notification = dataService.notificationStatus;
                news.status = dataService.errorNotif;

                news.getNews = getNews;
                news.newsDelete = newsDelete;

            /* implementation */
            function getNews() {
                dataService.getItems(api.news).then(function(data){
                    console.log(data.list);

                    news.list = data.list;
                    news.count_pages = data.count_pages;
                    news.total_pages = data.total_pages;
                    news.per_page = data.per_page;
                    news.current_page = data.current_page;
                }).catch(function(err){ news.notification = news.status(err) });
            }

            function newsDelete(id) {
                return dataService.deleteItem(api.newsItem + id + '.json').then(function(data) {
                    news.notification = news.status(data);
                    getNews();
                }).catch(function(err){ news.notification = news.status(err) });
            };
        }
})();
