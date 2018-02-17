var express = require('express')
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT || 3000
var path = require('path')
var db = require("./app/models");

app.use(express.static('app/public'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());



//if we decided to go with express handlebars...
 var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// end of express handlebars declaration...




require('./controllers/api-routes.js')(app);
require('./controllers/api-event-routes.js')(app);
require('./controllers/api-sport-routes.js')(app);
require('./controllers/api-user-routes.js')(app);
require('./controllers/api-html-routes.js')(app);


app.use(function(err, req, res, next){
    console.log('We had an error.', err);
    res.status(500).json({
        message: err.message
    });
});


//set force to true to drop database when we restart server, awesome for testing purpose
db.sequelize.sync({ force: true}).then(function(){
  app.listen(port, function(){
      console.log('App now listening at localhost:' + port);
  })  
})