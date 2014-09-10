'use strict';

/* App Module */

var eventApp = angular.module('eventApp', [
    'ngRoute',
    'ngSanitize',
    'ngCookies',
    'eventAppControllers',
    'eventAppServices'

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
            when('/facebook', {
                templateUrl: 'partials/facebook.html',
                controller: 'FacebookController'
            }).
            otherwise({
                redirectTo: '/events'
            });
}]);


eventApp.directive('dateTimePicker', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=data'
        },
        templateUrl: "partials/datetimepicker.html" ,
        link: function(scope, element, attrs, ngModel) {

            element.datetimepicker({
                format: "DD MMM YYYY HH:mm",
                minDate: new Date(),
                defaultDate: new Date()
            });

            var input = element.find('input');
            scope.data.datetime = input.val();

            element.bind('blur keyup change', function(){
                  scope.data.datetime = input.val();
                var startDateElement = $('#startDate');
                var endDateElement = $('#endDate');

                if (startDateElement.length && endDateElement.length)
                {
                    var startDatetime = startDateElement.data("DateTimePicker").getDate();
                    var endDatetime = endDateElement.data("DateTimePicker").getDate();
                    endDateElement.data("DateTimePicker").setMinDate(startDatetime);
                    if (endDatetime < startDatetime){
                        //console.log(,endDatetime);
                        endDateElement.data("DateTimePicker").setDate(startDatetime.format("DD MMM YYYY HH:mm"));
                    }
                }
            });
        }
    }
});