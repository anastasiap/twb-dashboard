(function() {
    'use strict';

    angular
        .module('Events')
        .controller('eventsCtrl', eventsCtrl);

    eventsCtrl.$inject = ['dataService', 'constants', '$route', '$routeParams', '$filter', '$scope'];

    function eventsCtrl(dataService, constants, $route, $routeParams, $filter, $scope) {
        var events = this;
        var placesList = [], bandsList = [], tabs = { 'jam': 0,  'gig': 1 }, api = constants.apiURLs;

            events.newGigForm = 'newGigForm';
            events.newJamForm = 'newJamForm';
            events.jam = newEvent('jam');
            events.gig = newEvent('gig');
            events.list = getEvents(api.events);
            events.bands = [];
            events.places = [];
            events.cities = [];
            events.activeTab = $route.current.params.type;

            events.getEvents = getEvents;
            events.editEvent = editEvent;
            events.submitEvent = submitEvent;
            events.getEventsByParam = getEventsByParam;
            events.setActiveTab = setActiveTab;
            events.eventDelete = eventDelete;

            events.notification = dataService.notificationStatus;
            events.status = dataService.errorNotif;


        /* implementation */
        function getEvents(url) {
            dataService.getItems(url).then(function(data) {

                console.log(data);
                placesList = dataService.mapItems(data.places);
                bandsList = dataService.mapItems(data.bands);

                events.list = setEventData(data.events.list);
                events.bands = data.bands;
                events.places = data.places;
                events.cities = data.cities;
                events.count_pages = data.events.count_pages;
                events.current_page = data.events.current_page;
                events.per_page = data.events.per_page;
                events.total_pages = data.events.total_pages;
            }).catch(function(err){ events.notification = events.status(err) });
        };

        function editEvent(id) {
            dataService.getItems(api.events + id + '.json').then(function(data){
                events.jam = newEvent('jam');
                events.gig = newEvent('gig');

                events[data.type] = setEventData(data)[0];

                setActiveTab(tabs[data.type]);
            }).catch(function(err){ events.notification = events.status(err) });

            window.scrollTo(0, 0);
        };

        function submitEvent(formName, event, id) {
            var url = id ? api.events + id + '.json' : api.events;

            event.date_to_string = $filter('date')(event.date, 'yyyy-MM-dd HH:mm');

            dataService.addItem(url, event).then(function(data) {
                events.notification = events.status(data);

                //clear the scope
                events[event.type] = newEvent(event.type, formName);
                getEventsByParam(api.events, 'p', 1);
            }).catch(function(err){ events.notification = events.status(err) });
        }

        function eventDelete(id) {
            dataService.deleteItem(api.events + id + '.json').then(function(data) {
                events.notification = events.status(data);
                getEventsByParam(api.events, 'p', 1);
            }).catch(function(err){ events.notification = events.status(err) });
        };

        function getEventsByParam(api, paramName, param) {
            var url = dataService.getItemsByParam(api, paramName, param);

            getEvents(url);
        }

        function setActiveTab(tab) {
            $route.updateParams({'type': tab});

            $scope.$on("$locationChangeSuccess", function(event) {
                events.activeTab = $routeParams.type;
            });
        };

        function setEventData(events) {
            var items = Array.isArray(events) ? events : [events];

            return items.map(function(item){
                item.date = new Date(item.date);
                item.place_title = placesList[item.place].title;
                item.band_title = bandsList[item.band].title;

                return item;
            });
        }

        function newEvent(type, formName) {
            if (formName) {
                events[formName].$setPristine();
                events[formName].$setUntouched();
            }

            return { band: '', city: '', date: '', enable: '', id: '', jam_number: '', link: '', place: '', time: '', type: type };
        }
    }
})();
