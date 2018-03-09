(function() {
    'use strict';

    angular
        .module('Clubs')
        .controller('clubCtrlEdit', clubCtrlEdit);

    clubCtrlEdit.$inject = ['dataService', 'constants', '$routeParams'];

    function clubCtrlEdit(dataService, constants, $routeParams) {
        var club = this, api = constants.apiURLs;
            club.path = constants.paths;
            club.current = getCurrentClub($routeParams.id);
            club.notification = dataService.notificationStatus;
            club.status = dataService.errorNotif;

            club.clubSave = clubSave;
            club.goToPath = dataService.goToPath;

        /* implementation */
        function getCurrentClub(id) {
            dataService.getItems(api.club + id + '.json').then(function (data) {
                club.current = data;
            }).catch(function(err){ club.notification = club.status(err) });
        };

        function clubSave(club) {
            this.club = club;

            dataService.addItem(api.club + $routeParams.id + '.json', club).then(function(data) {
                club.notification = club.status(data);
            }).catch(function(err){ club.notification = club.status(err) });
        }
    }
})();
