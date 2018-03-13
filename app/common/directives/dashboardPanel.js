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
        })
        .directive('fileModel',['$parse', function ($parse){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('change', function () {
                    $parse(attrs.fileModel).assign(scope, element[0].files[0]);
                    console.log(element[0].files[0]);
                    scope.$apply();
                })
            }
        }
    }]);;
})();
