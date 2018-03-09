(function () {
    'use strict';

    angular
        .module('mcDirectives')
        .directive('eventForm',  function() {
            return {
                replace: true,
                templateUrl: '/app/common/directives/eventForm.tmpl.html',
                events: '=',
            }
        })
})();
