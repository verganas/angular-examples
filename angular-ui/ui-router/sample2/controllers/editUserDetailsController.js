'use strict';

accountSettings.controller('EditUserDetailsController', ['$scope', '$state', '$stateParams',
    function ($scope, $state, $stateParams) {
        $scope.edit = function () {
            $state.transitionTo('settings.user.default.editPassword', $stateParams);
        };
    }]);