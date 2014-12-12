'use strict';

angular.module('accountSettings', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            var settings = {
                name: 'settings',
                url: '/settings',
                abstract: true,
                templateUrl: 'partials/settings.html',
                controller: 'SettingsLayoutController'
            };

            var userBase = {
                name: 'settings.user',
                parent: settings,
                abstract: true,
                url: '',
                templateUrl: 'partials/userBase.html'
            };

            var userDetails = {
                name: 'settings.user.default',
                parent: userBase,
                url: '',
                views: {
                    'pass': {
                        templateUrl: 'partials/userDetails.html',
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
                        templateUrl: 'partials/editPassword.html',
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
                        templateUrl: 'partials/editQuotes.html'
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
        }]);