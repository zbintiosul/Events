'use strict';

/* Controllers */

var eventAppControllers = angular.module('eventAppControllers', []);

eventAppControllers.controller("EventsController", ['$http','$scope', function($http,$scope) {
    var event = this;
    event.events = [];
    $http.get('db/events.json').success(function(data){
        event.events = data;
    })
}]);

eventAppControllers.controller("ParticipantController", ['$scope', function($scope) {
    this.participant = {};

    this.addParticipant = function(event){
        event.participants.push(this.participant);
        this.participant = {};
    };
}]);

eventAppControllers.controller("AddEventController", ['$scope', function($scope) {

    this.event = {};


    this.addParticipant = function(event){
        event.participants.push(this.participant);
        this.participant = {};
    };
}]);


eventAppControllers.controller("PageController", ['$scope' ,'$location',
    function( $scope,$location ){

        // Update the rendering of the page.
        var render = function(){

            // Pull the "action" value out of the
            // currently selected route.
            var renderAction = $location.path();


            // Also, let's update the render path so that
            // we can start conditionally rendering parts
            // of the page.
            var renderPath = renderAction.split( "/" );

            // Reset the booleans used to set the class
            // for the navigation.
            var isHome = (renderPath[ 1 ] == "events");
            var isAddEvent = (renderPath[ 1 ] == "add-event");

            // Store the values in the model.
            $scope.renderAction = renderAction;
            $scope.renderPath = renderPath;

            $scope.isHome = isHome;
            $scope.isAddEvent = isAddEvent;

        };

        // Listen for changes to the Route. When the route
        // changes, let's set the renderAction model value so
        // that it can render in the Strong element.
        $scope.$on(
            "$routeChangeSuccess",
            function( $currentRoute, $previousRoute ){

                // Update the rendering.
                render();

            }
        );

}]);




