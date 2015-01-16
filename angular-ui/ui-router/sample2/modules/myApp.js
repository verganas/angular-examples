'use strict';

angular.module('myApp', ['ui.router', 'accountSettings'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            var home = {
                name: 'home',
                url: '/',
                templateUrl: 'partials/hero.html',
                controller: ['$scope', function ($scope) {
                    $scope.awesomeThings = ['AngularJS', 'AngularJS-Ui-Router'];
                }]
            };
            $stateProvider.state(home);
        }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        // Save state and stateParams in rootScope so they can be referenced
        // from any descendant scope without dependency injection
        // Note: This is hacky.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo('home');
    }]);