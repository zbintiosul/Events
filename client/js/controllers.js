'use strict';

/* Controllers */

var eventAppControllers = angular.module('eventAppControllers', []);

eventAppControllers.controller("EventsController", ['$http','$scope', 'DBEvents',  function($http,$scope,DBEvents) {

    $scope.events = DBEvents.getEvents();

    this.getStatus = function(event){

        var startDate = moment(event.startDate,"DD MMM YYYY HH:mm");
        var endDate = moment(event.endDate,"DD MMM YYYY HH:mm");
        var now = moment();

        if (startDate>now){
            return 'Coming';
        } else {
           if (endDate<now){
               return 'Passed';
           } else {
               return 'In progress';
           }
        }
    };
}]);

eventAppControllers.controller("ParticipantController", [ function() {

    this.participant = {};

    this.addParticipant = function(event){
        event.participants.push(this.participant);
        this.participant = {};
    };
}]);

eventAppControllers.controller("AddEventController", ['$scope', '$location', 'DBEvents', function($scope, $location,DBEvents) {

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

        this.event.id = moment(this.event.startDate,"DD MMM YYYY HH:mm:ss").valueOf();

        if (this.isAnonimous){
            this.event.author = {
                name: "Anonymous",
                email: ""
            };
        } else {
            if (this.isAuthorParticipant){
                this.event.participants = [{
                    name: this.event.author.name,
                    email:  this.event.author.email
                }];
            }
        }

        DBEvents.putEvent(this.event);

        this.resetEvent();

        //console.log(this.event);
        $location.path("/events");

        return true;
    };

    this.resetEvent= function (){
        this.event = {
            startDate: moment().format("DD MMM YYYY HH:mm"),
            endDate: moment().format("DD MMM YYYY HH:mm")
        };
        //console.log(this.event);
        return true;
    }

}]);


eventAppControllers.controller("PageController", ['$scope' ,'$location',
    function( $scope,$location ){

        // Update the rendering of the page.
        var render = function(){

            // currently selected route.
            var renderAction = $location.path();

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


eventAppControllers.controller("FacebookController", ['$http','$scope',  function($http,$scope) {
    $scope.posts = [];
    var facebook = this;
    facebook.haveResult = false;
    this.tag = '';
    this.search = function(until,limit){

        if (typeof limit === "undefined"){
            limit = 100;
        }
        if (typeof until === "undefined"){
            var currentDate = moment().format('DD-MMM-YYYY HH:mm:ss');
            console.log(currentDate);
            until = parseInt(Date.parse(currentDate)/1000)+11000;

        }
        console.log(until);
        $http.get('https://graph.facebook.com/v1.0/search?access_token=CAACEdEose0cBAMu6ZBecWpqscTswWTIVP0pBAXIhkPJr6ANpFdKqZBgIAgGbTiJEPFp5baAuGxWqlVZBXsfPnZBSz5PECGltZCdD2PEM2ZCC5cTaaeCEJYe6Qk1BwDwnMgE9FtAjrJXWwML1WSkNwZCQ7nKPVPlhdZBCZAWLK1f6VZBkxtvdPZCEAPDL2KIbneZB64q9oNDqhAYKTIv0atvGr9rF&format=json&method=get&q=%23'+this.tag+'&limit='+limit+'&until='+until).success(function (data) {
            console.log('response', data.data);
            if (data.data.length)
            {
                facebook.haveResult = true;
            }
            $scope.posts = data.data;
        });
    }

    this.getFromPicture = function(post){
        if (post.from.id){
            return 'https://graph.facebook.com/'+post.from.id+'/picture';
        }else
        return '';
    }
}]);




