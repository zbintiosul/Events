'use strict';

/* App Module */

var eventApp = angular.module('eventApp', [
    'ngRoute',
    'eventAppControllers'
]);

eventApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/events', {
                templateUrl: 'partials/event-list.html',
                controller: 'EventsController'
            }).
            when('/add-event', {
                templateUrl: 'partials/add-event.html',
                controller: 'AddEventController'
            }).
            otherwise({
                redirectTo: '/events'
            });
}]);


