(function() {
    'use strict';

    angular
        .module('Dashboard')
        .controller('dashboardCtrl', dashboardCtrl);

        dashboardCtrl.$inject = ['dataService', 'constants', '$firebaseObject', '$firebaseArray'];

        function dashboardCtrl(dataService, constants, $firebaseObject, $firebaseArray) {
            var ds = this, api = constants.apiURLs;
                ds.path = constants.paths;
                ds.notification = dataService.notificationStatus;
                ds.status = dataService.errorNotif;
                ds.news = [];
                var authors = [];
            getNews();

            function getNews() {
                $firebaseArray(dataService.getRef("authors")).$loaded()
                .then(function(data){ authors = dataService.mapItems(data)})
                .then(function () {
                    $firebaseArray(dataService.getRef("news")).$loaded().then(function(data){
                        ds.news = setData(data);
                    })
                });

                ds.count = $firebaseObject(dataService.getRef("dashboard"));
            }

            function setData(data) {
                var items = Array.isArray(data) ? data : [data];

                return items.map(function(item){
                    item.date_pub = item.date_pub ? item.date_pub : new Date().toLocaleDateString("en-GB");
                    item.author = authors[item.author].name;
                    return item;
                });
            }

        }
})();
