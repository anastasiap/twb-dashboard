(function() {
    'use strict';

    angular
        .module('Bands')
        .controller('bandsCtrl', bandsCtrl);

    bandsCtrl.$inject = ['dataService', 'constants'];

    function bandsCtrl(dataService, constants) {
        var bands = this, api = constants.apiURLs;
            bands.path = constants.paths;
            bands.notification = dataService.notificationStatus;
            bands.status = dataService.errorNotif;

            bands.list = getBands();
            bands.current = {};

            bands.clubsCancel = clubsCancel;
            bands.clubAdd = clubAdd;
            bands.clubDelete = clubDelete;


        /* implementation */
        function getBands() {
            dataService.getItems(api.bands).then(function(data){
                bands.list = data.list;
            }).catch(function(err){ bands.notification = bands.status(err) });
        };

        function bandAdd(newband) {
            this.newband = newband;

            dataService.addItem(api.bands, newband).then(function (data) {
                bands.notification = bands.status(data);

                newband.id = data.id;
                bands.list.push(newband);
                bands.current = {};
            }).catch(function(err){ bands.notification = bands.status(err) });
        };

        function bandDelete(id) {
            dataService.deleteItem(api.band + id + '.json').then(function(data) {
                bands.notification = bands.status(data);
                // удаляем из массива на стороне клиента
                var bands_list = bands.list;
                var index = bands_list.indexOf(data.id);
                bands_list.splice(index, 1);
            }).catch(function(err){ bands.notification = bands.status(err) });
        };

        function bandsCancel() {
            bands.current = {};
        };
    }
})();
