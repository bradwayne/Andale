var db = require('../app/models')

module.exports = function (app) {
  var eventToDisplay = {}
  app.get('/event/:order?', function (req, res, next) {
    var orderStatement = {}
    
    if (req.body.order) {
      orderStatement.order = req.params.order // orderBy must include column name and asc/desc i.e: name ASC, gender DESC
    }

    db.Events.findAll(orderStatement).then(function (events) {
      console.log('In event API route, ')
      console.log(JSON.stringify(events))
      eventToDisplay = {
        eventTitle: 'All Events',
        eventDisplay: events
      }
    })
    res.render('index' , eventToDisplay)
    
  })
}
