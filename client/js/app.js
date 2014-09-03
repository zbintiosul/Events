(function(){
    var app = angular.module('event', []);

    app.controller("EventsController",['$http', '$templateCache', '$sce',
        function($http, $templateCache, $sce) {
            var self = this;
            self.events = events;
        }]);

    app.controller("ParticipantsController", function() {

        this.participant = {};

        this.addParticipant = function(event){
            event.participants.push(this.participant);
            this.participant = {};
        };

    });

    var events = [
        {
            startDate: '6 Sept 2014',
            name: 'Yopeso Bike Ride 5 (Capriana Monastery)',
            author: { name:'Clementii Cicali', email:'clementii.cicali@yopeso.com'},
            description: "Hello Dear Colleagues, <br> Summer passed quickly, but don't worry, autumn is a great time for cycling, it's not so hot, but it's still warm enough. Our fifth ride will be held to one of the most beautiful monasteries in our country, Capriana Monastery.",
            created_at: '2014-09-02 10:21',
            participants: [
                {
                    name: 'Clementii Cicali',
                    email: 'clementii.cicali@yopeso.com'
                },
                {
                    name: 'Anatolie Turcanu',
                    email: 'anatolie.turcanu@yopeso.com'
                }]
        },
        {
            startDate: '4 Sept 2014',
            name: 'My Event',
            author: { name:'Racu Mihai', email:'mihai.racu@yopeso.com'},
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            created_at: '2014-09-02 10:21',
            participants: [
                {
                    name: 'Racu Mihai',
                    email: 'mihai.racu@yopeso.com'
                }
            ]
        }
    ];
})();
