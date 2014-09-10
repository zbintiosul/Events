var application_root = __dirname,
    express = require("express"),
	path = require("path");
	var databaseUrl = "events"; // "username:password@example.com/mydb"
var collections = ["events"]
var db = require("mongojs").connect(databaseUrl, collections);

var bodyParser = require('body-parser')

var app = express();




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// Config

  //app.use(express.bodyParser());
var methodOverride = require('method-override')
app.use(methodOverride('_method'));
 // app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


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
//        str='';
//        events = JSON.stringify(events);
//        events.forEach( function(event) {
//			str = str + JSON.stringify(event);
//            str = str + ',';
//			//'{ "id" : "' + user.username + '"},' +'\n';
//		});
////		str = str.trim();
////		str = str.substring(0,str.length-1);
//        //str = str + events;
//		str = str + '';

		res.end( JSON.stringify(events));
	}
  });
});

app.post('/insert-events', function (req, res){
  //console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://myangular.localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
	//res.writeHead(200, {'Content-Type': 'text/plain'});
  //user = req.body.username;
  //passwd = req.body.password;
  //emailid = req.body.email;
//  console.log(req.body);
  console.log(req.body.mydata);
  var jsonData = JSON.parse(req.body.mydata);
  console.log(jsonData);
//  console.log(jsonData.password);
//  console.log(jsonData.email);

  db.events.save(jsonData, function(err, saved) {
  if( err || !saved ) res.end( "Event not saved");
  else res.end( "Event saved");
});
});


app.post('/insert-participant', function (req, res){
    //console.log("POST: ");
    res.header("Access-Control-Allow-Origin", "http://myangular.localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    //user = req.body.username;
    //passwd = req.body.password;
    //emailid = req.body.email;
//  console.log(req.body);
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
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    //user = req.body.username;
    //passwd = req.body.password;
    //emailid = req.body.email;
//  console.log(req.body);
    console.log(req.body.mydata);
    var jsonData = JSON.parse(req.body.mydata);

    db.products.remove( { id: jsonData.id },
        function(err, saved) {
            if( err || !saved ) res.end( "Event not deleted");
            else res.end( "Event deleted");
        });
});




  
 




app.listen(1213);