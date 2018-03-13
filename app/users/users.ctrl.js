(function() {
    'use strict';

    angular
        .module('Users')
        .controller('usersCtrl', usersCtrl);

    usersCtrl.$inject = ['dataService', 'constants', '$firebaseArray'];

    function usersCtrl(dataService, constants, $firebaseArray) {
        var authors = this, api = constants.apiURLs;
        authors.notification = dataService.notificationStatus;
        authors.status = dataService.errorNotif;

        authors.list = getAuthors();
        authors.current = {};

        authors.addNewItem = addNewItem;


        /* implementation */
        function getAuthors() {
            return $firebaseArray(dataService.getRef("authors"));
        };

        function addNewItem() {
            authors.list.$add(authors.current).then(function(ref) {
                console.log(ref);
                var id = ref.key;
                console.log("added record with id " + id);
                authors.list.$indexFor(id); // returns location in the array

            });
        }
    }

})();
