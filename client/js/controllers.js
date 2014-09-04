'use strict';

/* Controllers */

var eventAppControllers = angular.module('eventAppControllers', []);

eventAppControllers.controller("EventsController", ['$http','$scope', 'JSONService',  function($http,$scope,JSONService) {
    $scope.events;

    $scope.getJSON = function(){
        if ($scope.events) {
            return;
        }
        JSONService.getJSON()
            .then(function (response) {
                console.log('response', response);

                $scope.events = response.data;
            });
    };
    $scope.getJSON();

    $scope.addScopeEvent = function(event){
        // Add to $scope.data (assuming it's an array of objects)
        console.log('ssss', event)
        $scope.events.push(event);
        console.log($scope.events);
        return true;
    };
}]);

eventAppControllers.controller("ParticipantController", ['$scope', function($scope) {
    this.participant = {};

    this.addParticipant = function(event){
        event.participants.push(this.participant);
        this.participant = {};
    };
}]);

eventAppControllers.controller("AddEventController", ['$scope', '$location', function($scope, $location) {

    this.event = {
        startDate: moment().format("DD MMM YYYY HH:mm"),
        endDate: moment().format("DD MMM YYYY HH:mm")
    };
    this.isAnonimous = false;
    this.isAuthorParticipant= false;

    $scope.startDate = { id: "startDate", name: "startDate", datetime:'' };
    $scope.endDate = { id: "endDate", name: "endDate", datetime:'' };

    //console.log($scope.startDate);
    this.addEvent = function(){

        if (this.isAnonimous){
            this.event.author = {
                name: "Anonymous",
                email: ""
            };
        } else {
            if (this.isAuthorParticipant){
                this.event.participants = {
                    name: this.event.author.name,
                    email:  this.event.author.email
                }
            }
        }
        console.log(this.event);
        $location.path("/events");
        //event.events = event.events.concat(this.event);
        //this.event = {};
        return true;
    };

    this.resetEvent= function (){
        this.event = {
            startDate: moment().format("DD MMM YYYY HH:mm"),
            endDate: moment().format("DD MMM YYYY HH:mm")
        };
        console.log(this.event);
        return true;
    }

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




