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

eventAppControllers.controller("ParticipantController", ['$cookies', 'DBEvents', function($cookies,DBEvents) {
    var $participant = this;

    this.participant = {};
    //$cookies.user = '';
    this.username = $cookies.username;
    this.useremail = $cookies.useremail;


    console.log(this.username,this.useremail);
    this.userIsSubscribed = false;
    this.subscribeShow = false;

    this.getIsUserSub = function(event){
        if (!this.haveParticipants(event)) {
            return true;
        }
        var participants = event.participants;

        if (typeof this.username === 'undefined' || typeof this.useremail === 'undefined'){
              return true;
        } else {
                var $return = true;
                participants.forEach( function(participant) {
                    console.log($participant.username,participant.name);
                    if (typeof participant === 'object' && participant.name == $participant.username && participant.email == $participant.useremail)
                    {
                        $return = false;
                    }
                });
        }
        return $return;
    };

    this.haveParticipants = function(event){
        if (typeof event === 'object' && typeof event.participants === 'undefined')
        {
            return false;
        } else {
            return true;
        }
    };

    this.addParticipant = function(event){
        if (!this.haveParticipants(event)) {
            event.participants = [];
        }

        console.log(event);
        event.participants.push(this.participant);

        DBEvents.putParticipant(event.id,this.participant);

        $cookies.username = this.participant.name;
        $cookies.useremail = this.participant.email;

        this.participant = {};
        this.subscribeShow = false;
        this.userIsSubscribed = true;
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
            var isFacebook = (renderPath[ 1 ] == "facebook");

            // Store the values in the model.
            $scope.renderAction = renderAction;
            $scope.renderPath = renderPath;

            $scope.isHome = isHome;
            $scope.isAddEvent = isAddEvent;
            $scope.isFacebook = isFacebook;

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
        $http.get('https://graph.facebook.com/v1.0/search?access_token=CAACEdEose0cBAGHWg3O1daVeNlY0PZA9Q4zQmqUV0IgE31NABYWNXeI9U0T4IoKdizDZB0rDFhZBznwgBClmkXoAGlySBWj6UG6bbhvIag8P20TmszO4ZBQ4K6gp7miG7sdZAj3uXqWZB9dWa8jSiZAQwmu0YYWY9EHS2PSFjxyGJV3Hv3LrD9yB3oUTn8ImO9uVwwwuoG1tMwuwG4mJIp0&format=json&method=get&q=%23'+this.tag+'&limit='+limit+'&until='+until).success(function (data) {
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




