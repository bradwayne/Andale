var db = require('../app/models')

module.exports = function (app) {
  var eventToDisplay = {}
  app.get('/api/event/:orderParam/:orderMethod?', function (req, res, next) {
    var orderStatement = {}
    console.log(req.params);
    if (req.params.orderParam && req.params.orderMethod) {
        orderStatement = {
            orderParam : req.params.orderParam,  // orderBy must include column name and asc/desc i.e: name ASC, gender DESC
            orderMethod : req.params.orderMethod
        }
    }

    db.Events.findAll({order : [[orderStatement.orderParam, orderStatement.orderMethod]]}).then(function (events) {
      console.log('In event API route, ')
      console.log(JSON.stringify(events))
      eventToDisplay = {
        eventTitle: 'All Events',
        eventDisplay: events
      }
    })
    res.send(eventToDisplay)
    // res.render('index' , eventToDisplay)

  })

  
}
