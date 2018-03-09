(function () {
    'use strict';

    angular
        .module('mcDirectives')
        .directive('dashboardPanel', function(){
           return {
               templateUrl: 'app/common/directives/dashboardPanel.html',
               scope: {
                   name: '@',
                   icon: '@',
                   path: '@',
                   count: '@',
                   addItemTitle: '@',
                   addItemPath: '@',
                   color: '@'
               }
           }
        });
})();
