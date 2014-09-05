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

eventAppServices.service('DBEvents', function($http){

    var event = this;

    event.events = [];

    $http.get('/db/events.json').success(function (data) {
            //console.log('response', response);
        event.events = data;
    });


    this.getEvents = function(){
        return this.events;
    }

    this.putEvent = function(event){

        //console.log(this.events)
        this.events.push(event);

        return true;
    }
});
