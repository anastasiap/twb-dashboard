(function() {
    'use strict';

    angular
        .module('Clubs')
        .controller('clubsCtrl', clubsCtrl);

    clubsCtrl.$inject = ['dataService', 'constants'];

    function clubsCtrl(dataService, constants) {
        var clubs = this, api = constants.apiURLs;
            clubs.path = constants.paths;
            clubs.notification = dataService.notificationStatus;
            clubs.status = dataService.errorNotif;

            clubs.list = getClubs();
            clubs.current = {};

            clubs.clubsCancel = clubsCancel;
            clubs.clubAdd = clubAdd;
            clubs.clubDelete = clubDelete;


        /* implementation */
        function getClubs() {
            dataService.getItems(api.clubs).then(function(data){
                clubs.list = data.list;
            }).catch(function(err){ clubs.notification = clubs.status(err) });
        };

        function clubAdd(newclub) {
            this.newclub = newclub;

            dataService.addItem(api.clubs, newclub).then(function (data) {
                clubs.notification = clubs.status(data);

                newclub.id = data.id;
                clubs.list.push(newclub);
                clubs.current = {};
            }).catch(function(err){ clubs.notification = clubs.status(err) });
        };

        function clubDelete(id) {
            dataService.deleteItem(api.club + id + '.json').then(function(data) {
                clubs.notification = clubs.status(data);
                // удаляем из массива на стороне клиента
                var clubs_list = clubs.list;
                var index = clubs_list.indexOf(data.id);
                clubs_list.splice(index, 1);
            }).catch(function(err){ clubs.notification = clubs.status(err) });
        };

        function clubsCancel() {
            clubs.current = {};
        };
    }
})();
