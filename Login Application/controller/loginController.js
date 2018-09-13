var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting database
mongoose.connect('mongodb://localhost/testaroo');
  mongoose.connection.once('open',function(){
    console.log("connection established....");
  }).on('error', function(error){
    console.log('connection error:', error);
});


const Schema = mongoose.Schema;

const userSchema = new Schema({
	  username : String,
    password : String
});

const user = mongoose.model('user', userSchema);

module.exports = (function(app){

  app.get('/', function(req,res){
    res.render('home');
  });

  app.get('/register',function(req,res){
    res.render('register');
  });

  app.get('/login',function(req,res){
    res.render('login');
  });

// Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){

   user.findOne({ username: req.body.username}).then(function(result){

     if(result === null){
       res.end("Login invalid");
    }else if (result.username === req.body.username && result.password === req.body.password){
      console.log("logged in succesfully");
      res.render('completeprofile',{profileData:req.body});
    } else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

   });



});
//register to DB================================================================
app.post('/regiterToDb',urlencodedParser,function(req,res){
 var obj = JSON.stringify(req.body);

  var insertObj = new user({
    username  : req.body.username,
    password  : req.body.password
  });

    console.log("Final reg Data",obj);

     insertObj.save().then(function(err){
       if (err) throw err;
       console.log("1 document inserted");
     });

       res.render('completeprofile',{profileData:req.body});
      });


  });
