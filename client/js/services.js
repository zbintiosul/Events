'use strict';

/* Services */

var eventAppServices = angular.module('eventAppServices', []);


//eventAppServices.service('JSONService', function($http){
//    return {
//        getJSON: function() {
//            return $http.get('/db/events.json');
//        }
//    };
//});

eventAppServices.service('DBEvents', function($http,$templateCache){

    var event = this;

    event.events = [];

    var initEvents = function(){
        $http.get('http://localhost:1213/get-events').success(function (data) {
            //console.log('response', response);
            event.events = data;
        });
    };
    initEvents();

    this.getEvents = function(){
        return this.events;
    };

    this.putParticipant = function(event_id,participant){

        var data = {id:event_id, participant: participant };
        var jdata = 'mydata='+JSON.stringify(data);
        $http({
            method: 'post',
            url: "http://localhost:1213/insert-participant",
            data:  jdata ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            // cache: $templateCache
        }).
            success(function(response) {
                console.log("success");
                initEvents();
            }).
            error(function(response) {
                console.log("error");
            });

        //this.events.push(event);

        return true;
    }

    this.putEvent = function(event){

        var jdata = 'mydata='+JSON.stringify(event);
        $http({
            method: 'post',
            url: "http://localhost:1213/insert-events",
            data:  jdata ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           // cache: $templateCache
        }).
            success(function(response) {
                console.log("success");
                initEvents();
            }).
            error(function(response) {
                console.log("error");
        });

        this.events.push(event);

        return true;
    }
});

//
//eventAppServices.service('FacebookSearchTag', function($http){
//
//    var post = this;
//    post.posts = [];
//
//    this.search = function(tag,until,limit){
//
//        if (typeof limit === "undefined"){
//            limit = 100;
//        }
//        if (typeof until === "undefined"){
//            var now = new Date();
//            until = parseInt(now.valueOf()/1000);
//        }
//
//        $http.get('https://graph.facebook.com/v1.0/search?access_token=CAACEdEose0cBAGHWg3O1daVeNlY0PZA9Q4zQmqUV0IgE31NABYWNXeI9U0T4IoKdizDZB0rDFhZBznwgBClmkXoAGlySBWj6UG6bbhvIag8P20TmszO4ZBQ4K6gp7miG7sdZAj3uXqWZB9dWa8jSiZAQwmu0YYWY9EHS2PSFjxyGJV3Hv3LrD9yB3oUTn8ImO9uVwwwuoG1tMwuwG4mJIp0&format=json&method=get&q=%23'+tag+'&limit='+limit+'&until='+until).success(function (data) {
//            console.log('response', data.data);
//            $scope.posts = data.data;
//        });
//    }
//
//    this.getPosts = function(){
//        return this.posts;
//    }
//});