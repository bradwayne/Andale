var express = require('express')
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT || 3000
var path = require('path')
app.use(express.static('app/public'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());



//if we decided to go with express handlebars...
/* var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 */
// end of express handlebars declaration...



//if we decided to go with pug...
var pug = require('pug');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//end of pug declaration...



require('./controllers/api-routes.js')(app);


app.use(function(err, req, res, next){
    console.log('We had an error.', err);
    res.status(500).json({
        message: err.message
    });
})

//db.sequelize.sync({ force: false}).then(function(){
  app.listen(port, function(){
      console.log('App now listening at localhost:' + port);
  })  
//})