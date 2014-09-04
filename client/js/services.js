'use strict';

/* Services */

var eventAppServices = angular.module('eventAppServices', []);


eventAppServices.service('JSONService', function($http){
    return {
        getJSON: function() {
            return $http.get('/db/events.json');
        }
    };
});
