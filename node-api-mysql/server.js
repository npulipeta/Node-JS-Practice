// BASE SETUP
// =============================================================================

// call the packages we
var mysql = require('mysql');
var Boom = require('boom');
var swaggerJSDoc = require('swagger-jsdoc');

mysql.Promise = global.Promise;

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
  //insecureAuth : true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });

var subpath = express();
app.use("/v1", subpath);
var swagger = require('swagger-node-express').createNew(subpath);

app.use(express.static('swagger'));

swagger.setApiInfo({
title: "example API",
description: "API to ...",
termsOfServiceUrl: "",
contact: "nikhil.pulipeta@jungleworks.com",
license: "",
licenseUrl: ""
});
app.get('/', function (req, res) {
res.sendFile(__dirname + '/swagger/index.html');
});
swagger.configureSwaggerPaths('', 'api-docs', '');



// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {

    var sql = "INSERT INTO Bears (name, age) VALUES ('" + req.body.name + "','"+req.body.age+"')";
     con.query(sql, function (err, result) {
       if (err) throw err;
       console.log("1 record inserted");
       res.json({ message: 'Bear created!' });
     });


	})

  // update the bear with this id
  .put(function(req, res) {
    var sql = "UPDATE Bears SET age = '"+req.body.age +"' WHERE name = '"+ req.body.name +"'";
     con.query(sql, function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json({ message: 'Bear Updated!' });
     });
  })

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {

    var sql = "SELECT * FROM Bears";
     con.query(sql, function (err, result) {
       if (err) res.send(Boom.notFound('Fuckity fuck, this resource isn’t available.'));
       console.log(result);
       res.json(result);

     });
     //res.send(Boom.notFound('Fuckity fuck, this resource isn’t available.'));
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_name')

	// get the bear with that id
	.get(function(req, res) {
    console.log(req.params.bear_name);
    var sql = "SELECT * FROM Bears WHERE name = '"+ req.params.bear_name +"'";
     con.query(sql, function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json(result);

     });
	})



	// delete the bear with this id
	.delete(function(req, res) {

    var sql = "DELETE FROM Bears WHERE name = '"+ req.params.bear_name +"'";
     con.query(sql, function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json({ message: 'Successfully deleted' });
     });
	});

  /*router.route({
    method: [ 'GET', 'POST' ],
    path: '/{any*}',
    handler: (request, h) => {
      const accept = request.headers.accept

      if (accept && accept.match(/json/)) {
        return Boom.notFound('This resource isn’t available.')
      }

      return h.view('404').code(404)
    }
  })*/

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
