(function () {
    'use strict';

    angular
        .module('mcDirectives')
        .directive('confirmDelete',  function() {
            return {
                replace: true,
                templateUrl: 'app/common/directives/confirmDelete.html',
                scope: {
                    onConfirm: '&'
                },
                controller: function($scope) {
                    $scope.isDeleting = false;

                    $scope.startDelete = function() {
                        $scope.isDeleting = true;
                    };

                    $scope.cancel = function() {
                        $scope.isDeleting = false;
                    };

                    $scope.confirm = function() {
                        $scope.onConfirm()
                    };

                }
            }
        })
})();
