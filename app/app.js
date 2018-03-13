(function() {
    'use strict';

    /*var app = angular.module('testmodule', [
        'ngRoute'
    ]);

    app.controller('ctrls', function(){
        console.log('sdifs');
    });

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<h1>1111111</h1>',
                controller: 'ctrls'
            })
            .otherwise({
                redirectTo: '/'
            });
    });*/

    var app = angular.module('mcApp', [
        'ngRoute',
        'firebase',
        'ngMaterial',
        'Common',
        'Dashboard',
        'Users',
        'Categories',
        'Bands',
        'News',
        /*'Video',*/
        /*'Audio',*/
        'Events',
        'mcDirectives',
        'ui.bootstrap'
    ]);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.tmpl.html',
                controller: 'dashboardCtrl',
                controllerAs: 'ds'
            })
            .when('/events', {
                templateUrl: 'app/events/events.tmpl.html',
                controller: 'eventsCtrl',
                reloadOnSearch: false,
                controllerAs: 'events'
            })
            .when('/news', {
                templateUrl: 'app/news/news.tmpl.html',
                controller: 'newsCtrl',
                controllerAs: 'news'
            })
            .when('/news/:id', {
                templateUrl: 'app/news/news-edit.tmpl.html',
                controller: 'newsEditCtrl',
                controllerAs: 'ctrl'
            })
            .when('/audio', {
                templateUrl: 'app/audio/audio.tmpl.html',
                controller: 'audioCtrl',
                controllerAs: 'audio'
            })
            .when('/audio/:id', {
                templateUrl: 'app/audio/audio-edit.tmpl.html',
                controller: 'audioEditCtrl',
                controllerAs: 'audio'
            })
            .when('/users', {
                templateUrl: 'app/users/users.tmpl.html',
                controller: 'usersCtrl',
                controllerAs: 'users'
            })
            .when('/users/:id', {
                templateUrl: 'app/users/users-edit.tmpl.html',
                controller: 'usersEditCtrl',
                controllerAs: 'users'
            })
            .when('/categories', {
                templateUrl: 'app/categories/categories.tmpl.html',
                controller: 'catCtrl',
                controllerAs: 'cats'
            })
            .when('/categories/:id', {
                templateUrl: 'app/categories/categories-edit.tmpl.html',
                controller: 'catCtrlEdit',
                controllerAs: 'cats'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    });
})();
