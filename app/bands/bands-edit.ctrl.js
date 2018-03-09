(function() {
    'use strict';

    angular
        .module('Bands')
        .controller('bandCtrlEdit', bandCtrlEdit);

    bandCtrlEdit.$inject = ['dataService', 'constants', '$routeParams'];

    function bandCtrlEdit(dataService, constants, $routeParams) {
        var band = this, api = constants.apiURLs;
            band.path = constants.paths;
            band.current = getCurrentBand($routeParams.id);
            band.notification = dataService.notificationStatus;
            band.status = dataService.errorNotif;

            band.clubSave = clubSave;
            band.goToPath = dataService.goToPath;

        /* implementation */
        function getCurrentBand(id) {
            dataService.getItems(api.band + id + '.json').then(function (data) {
                band.current = data;
            }).catch(function(err){ band.notification = band.status(err) });
        };

        function bandSave(band) {
            this.band = band;

            dataService.addItem(api.band + $routeParams.id + '.json', band).then(function(data) {
                band.notification = band.status(data);
            }).catch(function(err){ band.notification = band.status(err) });
        }
    }
})();
