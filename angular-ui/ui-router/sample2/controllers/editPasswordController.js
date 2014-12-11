'use strict';

accountSettings.controller('EditPasswordController', ['$scope', '$state', '$stateParams',
    function ($scope, $state, $stateParams) {
        $scope.done = function () {
            $state.transitionTo('settings.user.default', $stateParams);
        };
    }]);