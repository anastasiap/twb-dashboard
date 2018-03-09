(function() {
    'use strict';

    angular
        .module('Dashboard')
        .controller('dashboardCtrl', dashboardCtrl);

        dashboardCtrl.$inject = ['dataService', 'constants'];

        function dashboardCtrl(dataService, constants) {
            var ds = this, api = constants.apiURLs;
                ds.path = constants.paths;
                ds.notification = dataService.notificationStatus;
                ds.status = dataService.errorNotif;

                ds.news = getNews();
                ds.newsDelete = newsDelete;
                ds.events = [];
                ds.video = [];
                ds.audio = [];

            function getNews() {
                dataService.getItems(api.dashboard).then(function(data){
                    ds.news = data;

                    /* TODO add api */
                    ds.events.count = 28;
                    ds.video.count = 2;
                    ds.audio.count = 43;
                }).catch(function(err){ ds.notification = ds.status(err) });
            }

            function newsDelete(id) {
                return dataService.deleteItem(api.newsItem + id + '.json').then(function(data) {
                    ds.notification = ds.status(data);
                    getNews();
                }).catch(function(err){ ds.notification = ds.status(err) });
            };
        }
})();
