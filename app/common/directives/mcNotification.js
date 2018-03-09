(function () {
    'use strict';

    angular
        .module('mcDirectives')
        .directive('mcNotification',  function() {
            return {
                replace: true,
                templateUrl: 'app/common/directives/notification.tmpl.html',
                scope: {
                    notification: '='
                }
            }
        })
})();
