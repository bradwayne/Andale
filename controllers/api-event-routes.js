var db = require('../app/models')
var Sequelize = require('sequelize')

var Op = Sequelize.Op

module.exports = function (app) {
  app.get('/api/event/:orderParam/:orderMethod?', function (req, res, next) {
    var eventToDisplay = {}
    var orderStatement = {}
    console.log(req.params)
    if (req.params.orderParam && req.params.orderMethod) {
      orderStatement = {
        orderParam: req.params.orderParam, // orderBy must include column name and asc/desc i.e: name ASC, gender DESC
        orderMethod: req.params.orderMethod
      }
    }

    db.Events.findAll({order: [[orderStatement.orderParam, orderStatement.orderMethod]]}).then(function (events) {
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

  app.get('/event/:id', function (req, res, next) {
    var arrEventId = []
    var arrSportId = []
    var eventToDisplay = {}
    db.User.findOne({
      where: { id: req.params.id },
      include: [{ model: db.Events}, {model: db.UserSport}, {model: db.UserEvent} ]
    })
      .then(function (userHostedEvents) {
        eventToDisplay = {
          title: 'Events User Hosting',
          user: userHostedEvents
        }
        for (var i = 0; i < eventToDisplay.user.UserEvents.length; i++) {
          arrEventId.push(eventToDisplay.user.UserEvents[i].EventId)
        }
        for (var i = 0; i < eventToDisplay.user.UserSports.length; i++) {
          arrSportId.push(eventToDisplay.user.UserSports[i].SportId)
        }

        console.log(arrEventId)
        db.UserEvent.findAll({
          where: {
            EventId: { [Op.in]: arrEventId },
            UserId: req.params.id
          },
          include: [db.Events]
        }).then(function (likeEventInfo) {
          eventToDisplay.likeEventInfo = likeEventInfo
          db.Events.findAll({
            where: {
              id: {[Op.notIn]: arrEventId},
              SportId: {[Op.in]: arrSportId}
            }
          })
            .then(function (otherEvents) {
              eventToDisplay.otherEvents = otherEvents

              db.Events.findAll({})
                .then(function (allEvents) {
                  eventToDisplay.allEvents = allEvents
                  res.json(eventToDisplay)
                // res.render('index', eventToDisplay)
                })
            })
        })
      })
  })

  app.get('/event_details/:id', function (req, res, next) {
    var objEventDetails = {}
    db.Events.findOne({
      where: { id: req.params.id},
      include: [{model: db.EventDiscussion}, {model: db.Sport}]
    })
      .then(function (eventDetails) {
        objEventDetails.details = eventDetails
        db.UserEvent.findAll({
          where: { EventId: req.params.id }
        }).then(function (attendingUsersId) {
          // objEventDetails.attendingUsersId = attendingUsersId
          var arrUserId = []
          for (var i = 0; i < attendingUsersId.length; i++) {
            arrUserId.push(attendingUsersId[i].UserId)
          }
          console.log('user attending event id :' + arrUserId)
          db.User.findAll({
            where: { id: {[Op.in]: arrUserId} }
          }).then(function (attendingUsers) {
            objEventDetails.attendingUsers = attendingUsers
            res.json(objEventDetails)
          })
        })
      })
  })

  app.post('/api/event/:user_id', function (req, res, next) {
    var user_id = req.params.user_id
    db.Events.create({
      name: req.body.name,
      location: req.body.location,
      attendants: req.body.attendants,
      fees: req.body.fees,
      host: req.body.host,
      phone_contact: req.body.phone_contact,
      email_contact: req.body.email_contact,
      gender: req.body.gender,
      level: req.body.level,
      age: req.body.age,
      details: req.body.details,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      userId: req.params.user_id
    }).then(function (results) {
      res.status(200).end()
    })
  })

  app.put('/api/event/:event_id', function (req, res, next) {
    var event_id = req.params.event_id
    db.Events.create({
      name: req.body.name,
      location: req.body.location,
      attendants: req.body.attendants,
      fees: req.body.fees,
      host: req.body.host,
      phone_contact: req.body.phone_contact,
      email_contact: req.body.email_contact,
      gender: req.body.gender,
      level: req.body.level,
      age: req.body.age,
      details: req.body.details,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      userId: req.params.event_id
    }).then(function (results) {
      if (result.changedRows === 0) {
        return res.status(404).end()
      }else {
        res.status(200).end()
      }
    })
  })

  app.post('/api/sportEvent/:sport_id/:event_id', function (req, res, next) {
    var event_id = req.params.event_id
    var sport_id = req.params.sport_id

    db.SportEvent.create({
      SportId: sport_id,
      eventID: event_id
    }).then(function (results) {
      res.status(200).end()
    })
  })

  app.put('/api/sportEvent/:sport_id/:event_id', function (req, res, next) {
    var event_id = req.params.event_id
    var sport_id = req.params.sport_id

    db.SportEvent.update({
      SportId: sport_id,
      eventID: event_id
    }).then(function (results) {
      if (result.changedRows === 0) {
        return res.status(404).end()
      }else {
        res.status(200).end()
      }
    })
  })
}
