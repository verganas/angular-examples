'use strict';

accountSettings.controller('SettingsLayoutController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
        $scope.user = {
            name: "Bob Loblaw",
            email: "bobloblaw@lawblog.com",
            password: 'semi-secret',
            quotes: "Lorem ipsum dolor sic amet"
        };
    }]);