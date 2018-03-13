(function() {
    'use strict';

    angular
        .module('Categories')
        .controller('catCtrl', catCtrl);

    catCtrl.$inject = ['dataService', 'constants', '$firebaseArray'];

    function catCtrl(dataService, constants, $firebaseArray) {
        var cats = this, api = constants.apiURLs;
            cats.notification = dataService.notificationStatus;
            cats.status = dataService.errorNotif;

            cats.list = getCats();
            cats.current = {};

            cats.addNewItem = addNewItem;


        /* implementation */
        function getCats() {
            return $firebaseArray(dataService.getRef("category"));
        };
        
        function addNewItem() {
            cats.list.$add(cats.current).then(function(ref) {
                console.log(ref);
                var id = ref.key;
                console.log("added record with id " + id);
                cats.list.$indexFor(id); // returns location in the array

            });
        }
    }

})();
