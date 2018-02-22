var flash = require('express-flash')
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var sessionItem = require('express-session')
var nodemailer = require('nodemailer')
var moment = require('moment')

var app = express()
var port = process.env.PORT || 3000
var path = require('path')
var db = require('./app/models')

app.use(flash())

app.use(express.static('app/public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser('keyboard cat'))
app.use(sessionItem({ cookie: { maxAge: 60000 }}))
var exphbs = require('express-handlebars')

var hbs = exphbs.create({
  helpers: {
    getDate: function (dateTime) { return moment(dateTime).format('YYYY-MM-DD')},
    getTime: function (dateTime) { console.log(moment(dateTime).format('HH:mm')); return moment(dateTime).format('HH:mm')}
  },defaultLayout: 'main'
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

require('./controllers/api-routes.js')(app)
require('./controllers/api-event-routes.js')(app)
require('./controllers/api-sport-routes.js')(app)
require('./controllers/api-user-routes.js')(app)
require('./controllers/html_routes.js')(app)

app.use(function (err, req, res, next) {
  console.log('We had an error.', err)
  res.status(500).json({
    message: err.message
  })
})

// set force to true to drop database when we restart server, awesome for testing purpose
db.sequelize.sync({ force: false}).then(function () {
  app.listen(port, function () {
    console.log('App now listening at localhost:' + port)
  })
})
