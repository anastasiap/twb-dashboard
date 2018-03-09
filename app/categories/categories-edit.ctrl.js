(function() {
    'use strict';

    angular
        .module('Categories')
        .controller('catCtrlEdit', catCtrlEdit);

    catCtrlEdit.$inject = ['dataService', 'constants', '$routeParams'];

    function catCtrlEdit(dataService, constants, $routeParams) {
        var cats = this, api = constants.apiURLs;
            cats.current = getCurrentCategory($routeParams.id);
            cats.notification = dataService.notificationStatus;
            cats.status = dataService.errorNotif;

            cats.catSave = catSave;
            cats.goToPath = dataService.goToPath;

        /* implementation */
        function getCurrentCategory(id) {
            dataService.getItems(api.categoriesItem + id + '.json').then(function (data) {
                cats.current = data;
            }).catch(function(err){ cats.notification = cats.status(err) });
        };

        function catSave(cat) {
            this.cat = cat;

            dataService.addItem(api.categoriesItem + $routeParams.id + '.json', cat).then(function(data) {
                cats.notification = cats.status(data);
            }).catch(function(err){ cats.notification = cats.status(err) });
        }
    }
})();
