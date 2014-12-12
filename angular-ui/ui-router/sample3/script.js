// myApp module signature includes  dependencies for all controllers 

// Extends http://jsfiddle.net/benschwartz/LhydD/ UI Router plnkr
// with ui bootstrap carousel to show partial loading

angular.module('myApp', ['ui.compat', 'ui.bootstrap', 'accountSettings'])
    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider) {

            var home = {
                name: 'home',
                url: '/',
                templateUrl: 'partial.html',
                controller: ['$scope', function ($scope) {
                    $scope.awesomeThings = ['AngularJS', 'AngularJS-Ui-Router'];
                }]
            };

            $stateProvider
                .state(home);
        }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo('home');
    }]);

/* accountSettings Module */
angular.module('accountSettings', ['ui.compat'])
    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider) {

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


//from Angular UI Bootstrap Carousel Demo

function CarouselDemoCtrl($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/200',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i=0; i<4; i++) {
        $scope.addSlide();
    }
}