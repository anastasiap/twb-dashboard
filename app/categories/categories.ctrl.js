(function() {
    'use strict';

    angular
        .module('Categories')
        .controller('catCtrl', catCtrl);

    catCtrl.$inject = ['dataService', 'constants'];

    function catCtrl(dataService, constants) {
        var cats = this, api = constants.apiURLs;
            cats.notification = dataService.notificationStatus;
            cats.status = dataService.errorNotif;

            cats.list = getCats();
            cats.current = {};

            cats.catCancel = catCancel;
            cats.catAdd = catAdd;
            cats.catDelete = catDelete;


        /* implementation */
        function getCats() {
            dataService.getItems(api.categories).then(function(data){
                cats.list = data.list;
            }).catch(function(err){ cats.notification = cats.status(err) });
        };

        function catAdd(newcat) {
            this.newcat = newcat;

            dataService.addItem(api.categories, newcat).then(function (data) {
                cats.notification = cats.status(data);

                newcat.id = data.id;
                cats.list.push(newcat);
                cats.current = {};
            }).catch(function(err){ cats.notification = cats.status(err) });
        };


        function catDelete(id) {
            dataService.deleteItem(api.categoriesItem + id + '.json').then(function(data) {
                cats.notification = cats.status(data);
                // удаляем из массива на стороне клиента
                var category_list = cats.list;
                var index = category_list.indexOf(data.id);
                category_list.splice(index, 1);
            }).catch(function(err){ cats.notification = cats.status(err) });
        };

        function catCancel() {
            cats.current = {};
        };
    }

})();
