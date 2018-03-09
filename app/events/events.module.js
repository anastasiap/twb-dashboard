(function() {
    'use strict';

    angular.module('Events', ['ngMaterial'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                .dark();
        });
})();
