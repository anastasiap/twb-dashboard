(function() {
    'use strict';

    angular
        .module('Audio')
        .controller('audioCtrl', audioCtrl);

    audioCtrl.$inject = ['dataService', 'constants', '$route'];

    function audioCtrl(dataService, constants, $route) {
        var pl = this, api = constants.apiURLs;
            pl.list = [];
            pl.types = [];
        var authors = [];
            pl.notification = { error: false, status: false, message: '' };
            pl.getPlaylists = getPlaylists;
            pl.audioDelete = audioDelete;
            pl.status = dataService.errorNotif;

        initCtrl();

        /* Implementation */
        function initCtrl() {
            dataService.getUsers()
                .then(function(data){ authors = dataService.mapItems(data) })
                .then(function () { getPlaylists(1) });
        }

        function getPlaylists(page) {
            dataService.getItems(api.playlists + page).then(function(data){
                console.log('audio data', data);

                pl.list = setPlaylistsData(data.events.list);
                pl.count_pages = data.events.count_pages;
                pl.total_pages = data.events.total_pages;
                pl.per_page = data.events.per_page;
                pl.current_page = data.events.current_page;
            }).catch(function(err){ pl.notification = pl.status(err) });
        }

        function audioDelete(id) {
            return dataService.deleteItem(api.playlists + id + '.json').then(function(data) {
                pl.notification = pl.status(data);
                getPlaylists(1);
            }).catch(function(err){ pl.notification = pl.status(err) });
        };

        function setPlaylistsData(pl) {
            var items = Array.isArray(pl) ? pl : [pl];

            return items.map(function(item){
                item.author_name = authors[item.author].fullname;
                return item;
            });
        }
    }
})();
