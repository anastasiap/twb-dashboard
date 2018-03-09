(function() {
    'use strict';

    angular
        .module('Audio')
        .controller('audioEditCtrl', audioEditCtrl);

    audioEditCtrl.$inject = ['dataService', 'constants', '$routeParams', 'Upload', '$timeout', '$filter'];

    function audioEditCtrl(dataService, constants, $routeParams, Upload, $timeout, $filter) {
        var pl = this, api = constants.apiURLs;
            pl.notification = { error: false, status: false, message: '' };
            pl.status = dataService.errorNotif;
            pl.authors = [];
            pl.upload = upload;
            pl.savePlaylist = savePlaylist;
            pl.editMode = editMode;
            pl.goToPath = dataService.goToPath;
            pl.plSaved = false;
            pl.mode = [];

        initCtrl();

        /* Implementation */
        function initCtrl() {
            dataService.getUsers()
                .then(function(data){ pl.authors = data })
                .then(function() { getPlaylist($routeParams.id) });
        }

        function getPlaylist(id) {
            dataService.getItems(api.playlist + id + '.json').then(function(data){
                pl.current = data;

                console.log('Saved playlist', data);
                // если есть дата - преобразуем, иначе - берем текущую
                if( id !== '0' )  {
                    pl.plSaved = true;
                    pl.current.date_pub = new Date(pl.current.date_pub);
                    /* todo create helper */
                    pl.current.author = pl.authors.filter(function (a) {return a.id == data.author })[0].id;
                } else {
                    pl.current.date_pub = new Date();
                }
            }).catch(function(err){ pl.notification = pl.status(err) });
        }

        function savePlaylist(playlist, id) {
            this.audio = playlist;

            console.log(playlist);

            // имутабельная переменная date_pub, поэтому дублируем ее для преобразования
            playlist.date_to_string = $filter('date')(playlist.date_pub, 'yyyy-MM-dd HH:mm');

            var url = id ? api.playlist + id + '.json' : api.postPlaylist;

            console.log(playlist);

            dataService.addItem(url, playlist).then(function(data){
                pl.notification = pl.status(data);
                pl.goToPath('audio/' + data.id);
                pl.plSaved = true;
            }).catch(function(err){ pl.notification = pl.status(err) });
        }

        function editMode(mode, index) {
            pl.mode[index] = mode;

            /*$timeout(function(){ pl.mode[index] = mode }, 500);*/

        }

        // upload on file select or drop
        function upload(files) {
            if (files) {
                angular.forEach(files, function(file) {
                    Upload.upload({
                        url: '/api/upload/file/' + $routeParams.id,
                        data: { file: file , folder: 'music/' }
                    }).then(function (resp) {
                        $timeout(function () {
                            file.result = resp.data;
                        });
                    }, function (resp) {
                        pl.notification = pl.status(resp);
                    }, function (evt) {
                        file.progress = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + file.progress + '% ' + evt.config.data.file.name);
                    });
                })
            }
        }
    }
})();
