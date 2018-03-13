(function() {
    'use strict';

    var app = angular.module('mcApp', [
        'ngRoute',
        'firebase',
        'ngMaterial',
        'Common',
        'Dashboard',
        'Users',
        'Categories',
        'News',
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
            .when('/users', {
                templateUrl: 'app/users/users.tmpl.html',
                controller: 'usersCtrl',
                controllerAs: 'users'
            })
            .when('/categories', {
                templateUrl: 'app/categories/categories.tmpl.html',
                controller: 'catCtrl',
                controllerAs: 'cats'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    });
})();
