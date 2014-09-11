var application_root = __dirname,
    express = require("express"),
	path = require("path");

var databaseUrl = "events";
var collections = ["events"]
var db = require("mongojs").connect(databaseUrl, collections);
var bodyParser = require('body-parser')
var app = express();




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.bodyParser());
var methodOverride = require('method-override')
app.use(methodOverride('_method'));
//app.use(app.router);
app.use(express.static(path.join(application_root, "public")));
//app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


app.get('/api', function (req, res) {
   res.send('Ecomm API is running');
});

app.get('/get-events', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://myangular.localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	db.events.find('', function(err, events) {
	if( err || !events) console.log("No users found");
	  else
	{
		res.writeHead(200, {'Content-Type': 'application/json'});

		res.end( JSON.stringify(events));
	}
  });
});

app.post('/insert-events', function (req, res){

  //console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://myangular.localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");

  //console.log(req.body.mydata);
  var jsonData = JSON.parse(req.body.mydata);
  console.log(jsonData);

  db.events.save(jsonData, function(err, saved) {
  if( err || !saved ) res.end( "Event not saved");
  else res.end( "Event saved");
});
});


app.post('/insert-participant', function (req, res){
    //console.log("POST: ");
    res.header("Access-Control-Allow-Origin", "http://myangular.localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    console.log(req.body.mydata);
    var jsonData = JSON.parse(req.body.mydata);

    db.events.update(
        { id:  jsonData.id },
        { $push: { participants:  jsonData.participant } },
    function(err, saved) {
        if( err || !saved ) res.end( "Participant not added");
        else res.end( "Participant added");
    });
});

app.post('/delete-event', function (req, res){
    //console.log("POST: ");
    res.header("Access-Control-Allow-Origin", "http://myangular.localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    console.log(req.body.mydata);
    var jsonData = JSON.parse(req.body.mydata);

    db.products.remove( { id: jsonData.id },
        function(err, saved) {
            if( err || !saved ) res.end( "Event not deleted");
            else res.end( "Event deleted");
        });
});


app.listen(1213);