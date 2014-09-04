'use strict';

/* App Module */

var eventApp = angular.module('eventApp', [
    'ngRoute',
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

                var startDate = angular.element(document.querySelector( '#startDate' ) );
                var endDate = angular.element(document.querySelector( '#endDate' ) );

                if (startDate.length && endDate.length)
                {
                    var startDatetime = $('#startDate').data("DateTimePicker").getDate();
                    var endDatetime = $('#endDate').data("DateTimePicker").getDate();
                    $('#endDate').data("DateTimePicker").setMinDate(startDatetime);
                    if (endDatetime<startDatetime){
                        $('#endDate').data("DateTimePicker").setDate(startDatetime);
                    }
                }
            });
        }
    }
});