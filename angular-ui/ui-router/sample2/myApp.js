'use strict';

/* myApp module */
angular.module('myApp', ['ui.router', 'accountSettings'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            var home = {
                name: 'home',
                url: '/',
                template:
                '<div class="hero-unit">'+
                '<h1>\'Allo, \'Allo!</h1>'+
                '<ul><li ng-repeat="thing in awesomeThings">{{thing}}</li></ul>'+
                '<p>installed. Check out <a href="#/settings">settings</a> to see some cool stuff</p></div>'+
                '</div>',
                controller: ['$scope', function ($scope) {
                    $scope.awesomeThings = ['AngularJS', 'AngularJS-Ui-Router'];
                }]
            };
            $stateProvider.state(home);
        }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo('home');
    }]);

/* accountSettings Module */
angular.module('accountSettings', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            var settings = {
                name: 'settings',
                url: '/settings',
                abstract: true,
                template:
                '<div class="row"><div class="span3"><div class="pa-sidebar well well-small">'+
                '<ul class="nav nav-list">'+
                '<li class="nav-header">Settings</li>'+
                '<li ng-class="{ active: $state.includes(\'settings.user.default\')}"><a href="#/settings" >User Details</a></li>'+
                '<li ng-class="{ active: $state.includes(\'settings.quotes\')}"><a href="#/settings/quotes" >User Quotes</a></li>'+
                '</ul><hr>'+
                '<div ui-view="menu"></div></div>'+
                '</div>'+
                '<div class="span9" ui-view></div></div>',
                controller: 'SettingsLayoutController'
            };

            var userBase = {
                name: 'settings.user',
                parent: settings,
                abstract: true,
                url: '',
                template:
                '<h3>{{user.name}}\'s Settings</h3><hr>'+
                '<div><label>Name</label><input type="text" ng-model="user.name" /></div>'+
                '<div><label>Email</label><input type="text" ng-model="user.email" /></div>'+
                '<div ng-view="pass"></div>'+
                '<button class="btn" ng-click="done()">Save</button>'
            };
            var userDetails = {
                name: 'settings.user.default',
                parent: userBase,
                url: '',
                views: {
                    'pass': {
                        template: '<div><label>Password <button class="btn" ng-click="edit()">Edit</button></label>**********</div>',
                        controller: 'EditUserDetailsController'
                    },
                    'hint@': {
                        template: "editing user details"
                    },
                    'menu@settings': {
                        template: "user details"
                    }
                }
            };

            var userPassEdit = {
                name: 'settings.user.default.editPassword',
                parent: userDetails,
                url: '',
                views: {
                    'pass@settings.user': {
                        template: '<div><label>Password <button class="btn" ng-click="done()">Done</button></label>'+
                        '<input type="text" ng-model="user.password" /></div>',
                        controller: 'EditPasswordController'
                    },
                    'hint@': {
                        template: "editing user password"
                    },
                    'menu@settings': {
                        template: "password edit"
                    }
                }
            };

            var userQuotes = {
                name: 'settings.quotes',
                parent: settings,
                url: '/quotes',
                views: {
                    '': {
                        template: '<h3>{{user.name}}\'s Quotes</h3><hr>'+
                        '<div><label>Quotes</label><textarea type="text" ng-model="user.quotes"></textarea></div>'+
                        '<button class="btn" ng-click="done()">Save</button>'
                    },
                    'hint@': {
                        template: "editing user quotes"
                    },
                    'menu@settings': {
                        template: "quotes edit"
                    }
                }
            };


            $stateProvider
                .state(settings)
                .state(userBase)
                .state(userDetails)
                .state(userPassEdit)
                .state(userQuotes);
        }])
    .controller('SettingsLayoutController', ['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.user = {
            name: "Bob Loblaw",
            email: "bobloblaw@lawblog.com",
            password: 'semi-secret',
            quotes: "Lorem ipsum dolor sic amet"
        };
    }])
    .controller('EditUserDetailsController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
        $scope.edit = function () {
            $state.transitionTo('settings.user.default.editPassword', $stateParams);
        };
    }])
    .controller('EditPasswordController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
        $scope.done = function () {
            $state.transitionTo('settings.user.default', $stateParams);
        };
    }]);