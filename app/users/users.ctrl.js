(function() {
    'use strict';

    angular
        .module('Users')
        .controller('usersCtrl', usersCtrl);

    usersCtrl.$inject = ['dataService', 'constants'];

    function usersCtrl(dataService, constants) {
        var users = this, api = constants.apiURLs;

            users.list = [];
            users.current = {};

            users.userCancel = userCancel;
            users.userAdd = userAdd;
            users.userSwitch = userSwitch;

            users.notification = dataService.notificationStatus;
            users.status = dataService.errorNotif;

            initCtrl();

            /* Implementation */
            function initCtrl() {
                dataService.getUsers().then(function(data){  users.list = data; });
            }

            function userAdd(newuser) {
                this.newuser = newuser;

                dataService.addItem(api.users, newuser).then(function(data) {
                    users.notification = users.status(data);

                    newuser.id = data.id;
                    users.list.push(newuser);
                    users.current = {};
                }).catch(function(err){ users.notification = users.status(err) });
            };

            function userSwitch(user) {
                dataService.addItem(api.usersChange, user).then(function(data) {
                    users.notification = users.status(data);
                }).catch(function(err){ users.notification = users.status(err) });
            };

            function userCancel() {
                users.current = {};
            };
    }

})();
