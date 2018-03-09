(function () {
    'use strict';

    angular
        .module('Common')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', 'constants', '$location', '$route'];

    function dataService ($http, constants, $location, $route) {
        var api = constants.apiURLs;

        var notificationStatus = { error: false, status: false, message: '' };

        var requests = {
            getData: getData,
            deleteData: deleteData,
            postData: postData,
            putData: putData
        };

        var service = {
            getItems: getItems,
            addItem: addItem,
            deleteItem: deleteItem,
            goToPath: goToPath,
            getUsers: getUsers,
            getCategories: getCategories,
            errorNotif: errorNotif,
            getItemsByParam: getItemsByParam,
            mapItems: mapItems,
            notificationStatus: notificationStatus
        };

        return service;

        /* Implementation */
        function getItems(url) {
            return getData(url).then(function(data){ return data; })
        }

        function addItem(url, item) {
            return postData(url, item).then(function(data){ return data; })
        }

        function deleteItem(url) {
            return deleteData(url).then(function(data){ return data; })
        }


        /* server requests */
        function getData(apiURL) {
            return $http.get(apiURL).then(function(res) { return res.data });
        }

        function postData(apiURL, item) {
            return $http.post(apiURL, item).then(function(res) { return res.data; });
        }

        function deleteData(apiURL) {
            return $http.delete(apiURL).then(function(res) { return res.data });
        }

        function putData(apiURL, item) {
            return $http.put(apiURL, item).then(function(res) { return res.data; });
        }


        /* common getters */
        function getUsers() {
            return getItems(api.users).then(function(data){
                return data.list;
            }).catch(function(err){ news.notification = news.status(err) });
        };

        function getCategories() {
            return getItems(api.categories).then(function(data){
                return data.list;
            }).catch(function(err){ news.notification = news.status(err) });
        }

        function getItemsByParam(api, paramName, param) {
            var url = api + '?' + paramName + '=' + param,
                newParams = {};
            newParams[paramName] = param;

            $route.updateParams(newParams);

            return url;
        }

        /* helpers */
        function mapItems(items) {
            var itemsSorted = [];

            items.forEach(function(item) {
                var key = item.id;
                itemsSorted[key] = item;
            });

            console.log('items sorted', itemsSorted);
            return itemsSorted;
        }

        function setSuccess(msg) {
            return {
                status: true,
                error: false,
                message: msg
            }
        }

        function setError(msg) {
            return {
                status: true,
                error: true,
                message: msg
            }
        }

        function goToPath(path) {
            $location.path(path);
        }

        function errorNotif(data){
            console.log(data);

            if (data.id) {
                return setSuccess(data.message);
            } else if (!data) {
                console.warn('Something went terribly wrong');
                return setError('Something went terribly wrong');
            } else {
                var msg = data.data.message ? data.data.message : data.statusText;
                console.warn('Error', data.status +  '-' + data.statusText);
                return setError(msg);
            }
        }
    }
})();
