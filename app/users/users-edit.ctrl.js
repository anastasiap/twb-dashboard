(function() {
    'use strict';

    angular
        .module('Users')
        .controller('usersEditCtrl', usersEditCtrl);

    usersEditCtrl.$inject = ['dataService', 'constants', '$routeParams', 'Upload'];

    function usersEditCtrl(dataService, constants, $routeParams, Upload) {
        var users = this, api = constants.apiURLs;
            users.current = {};
            users.current.file = false;

            users.userSave = userSave;

            users.notification = dataService.notificationStatus;
            users.status = dataService.errorNotif;
            users.goToPath = dataService.goToPath;

            getCurrentUser($routeParams.id);

            /*implementation*/
            function getCurrentUser(id) {
                dataService.getItems(api.user + id + '.json').then(function(data){
                    users.current = data;
                    users.current.avatar_link = data.profile_foto;
                }).catch(function(err){ users.notification = users.status(err) });
            }

            function userSave(user) {
                this.user = user;

                dataService.addItem(api.user + $routeParams.id + '.json', user).then(function(data){
                    users.notification = users.status(data);
                }).catch(function(err){ users.notification = users.status(err) });
            }

            // upload on file select or drop
            this.upload = function (file) {
                Upload.upload({
                    url: '/api/upload/file/' + $routeParams.id,
                    data: { file: file , folder: 'avatars/' }
                }).then(function (resp) {
                    users.current.avatar_link = resp.data.url;
                    //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };
    }

})();
