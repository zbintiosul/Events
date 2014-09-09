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

//    $http.get('db/events.json').success(function (data) {
//            //console.log('response', response);
//        event.events = data;
//    });
    var initEvents = function(){
        $http.get('http://localhost:1213/get-events').success(function (data) {
            //console.log('response', response);
            event.events = data;
        });
    };



    this.getEvents = function(){
        return this.events;
    };

    this.putEvent = function(event){

        var jdata = 'mydata='+JSON.stringify(event);
        $http({
            method: 'post',
            url: "http://localhost:1213/insert-events",
            data:  jdata ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                console.log("success");
                //event.events.push(event);
                //$scope.codeStatus = response.data;
               // console.log($scope.codeStatus);
                initEvents();
            }).
            error(function(response) {
                console.log("error");
                //$scope.codeStatus = response || "Request failed";
                //console.log($scope.codeStatus);
        });

        //console.log(this.events)


        return true;
    }
});


eventAppServices.service('FacebookSearchTag', function($http){

    var post = this;
    post.posts = [];

    this.search = function(tag,until,limit){

        if (typeof limit === "undefined"){
            limit = 100;
        }
        if (typeof until === "undefined"){
            var now = new Date();
            until = parseInt(now.valueOf()/1000);
        }

        $http.get('https://graph.facebook.com/v1.0/search?access_token=CAACEdEose0cBANiePfs8jWUzjnjBSFnI06ODQYSxELFACkrirk8gKkL8iFcO2X5NV0vTRhiguT213Yt8HbRwDqcPJkO0Cs0cykvPYX2GUKhzhZBMFUEuNZCWllZCfpanxljivnc1CxguHWxSFqtJtDLvpfihJ5QM9n4DU4QBwk35QVKxitUfwjdrCQ5hxrVwJR33cFLY2xovUH135Gb&format=json&method=get&q=%23'+tag+'&limit='+limit+'&until='+until).success(function (data) {
            console.log('response', data.data);
            $scope.posts = data.data;
        });
    }

    this.getPosts = function(){
        return this.posts;
    }
});