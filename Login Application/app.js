var express = require('express');
var app = express();
//var register = require('./controller/l')
var loginController = require('./controller/loginController');

app.set('view engine','ejs');

app.use(express.static('./public'));
loginController(app);
app.listen(3000);

//app.post("/regiterToDb", loginController.)
