var db = require('../app/models')
var Sequelize = require('sequelize')

var Op = Sequelize.Op

module.exports = function (app) {
  app.get('/', function (req, res, next) {
    db.User.findAll({}).then(function (users) {
      console.log('get users from sql')
      console.log(JSON.stringify(users))
      db.Events.findAll({}).then(function (events) {
        console.log('get events from sql')
        console.log(JSON.stringify(events))
        res.render('index',
          {
            title: 'Andale!!',
            users: users,
            events: events
          }
        )
      })
    })
  })

  app.get('/user/:id', function (req, res, next) {
    var objUser = {}
    console.log('get specific user info')
    db.User.findById(req.params.id)
      .then(function (user) {
        objUser = {
          title: 'User Profile',
          user: user
        }
        console.log(user)
        console.log('id : ' + objUser.user.id)
        console.log('location : ' + objUser.user.location)
        console.log('name : ' + objUser.user.first_name + objUser.user.last_name)
        db.UserSport.findAll(
          {where: {UserId: objUser.user.id}}
        ).then(function (interestedSport) {
          objUser.interestedSportId = interestedSport
          var arrSportId = []
          for (var i = 0; i < objUser.interestedSportId.length; i++) {
            arrSportId.push(objUser.interestedSportId[i].dataValues.sportId)
          }
          db.Sport.findAll({
            where: {
              id: arrSportId
            }
          }).then(function (sport) {
            console.log('after getting sports..')
            // console.log(sport)
            objUser.sports = sport
            console.log(objUser.sports)
            db.UserEvent.findAll({
              where: {UserId: objUser.user.id }
            }).then(function (bookedEventId) {
              console.log(JSON.stringify(bookedEventId))
              var arrBookedEventId = []
              objUser.bookedEventId = bookedEventId
              for (var i = 0; i < objUser.bookedEventId.length; i++) {
                arrBookedEventId.push(objUser.bookedEventId[i].dataValues.eventID)
              }
              console.log('array of booked event id : ' + arrBookedEventId)
              db.Events.findAll({
                where: {
                  id: arrBookedEventId
                }
              }).then(function (bookedEvent) {
                console.log('array of booked event id : ' + arrBookedEventId)
                console.log('getting booked event..')
                objUser.bookedEvent = bookedEvent
                console.log(JSON.stringify(objUser.bookedEvent))
                console.log('before not interested sport...')
                console.log(arrSportId)
                db.Sport.findAll({
                  where: {
                    id: { [Op.notIn]: arrSportId}
                  }
                }).then(function (otherSports) {
                  console.log('sports not in..')
                  console.log(JSON.stringify(otherSports))
                  objUser.otherSports = otherSports
                  res.render('index', objUser)
                })
              })
            })
          })
        })
      })
  })

  app.get('/api/getUser/:username/:password', function (req, res, next) {
    console.log('in getUser..')
    db.User.findAndCountAll({
      where: {
        username: req.params.username,
        password: req.params.password
      },
      limit: 1
    }).then(function (credentials) {
      console.log('Result return : ' + credentials.count)
      if (credentials.count > 0) {
        console.log('Found user!')
        res.send(credentials)
        console.log(JSON.stringify(credentials))
      }else {
        //res.send("403 error");
        res.json({error: 'User not found!'})
        //next('User not found!')
      }
    }).catch(function (err) {
      console.log(err)
    })
  })
  app.get('/api/getUserEvent/', function (req, res, next) {
    db.UserEvent.findAll({
      include: [db.User]
    })
      .then(function (results) {
        console.log(JSON.stringify(results))
        res.send(results)
        res.status(200).end()
      })
  })
  app.get('/api/getUserLevel/', function (req, res, next) {
    db.UserLevel.findAll({
      include: [db.User]
    })
      .then(function (results) {
        console.log(JSON.stringify(results))
        res.send(results)
        res.status(200).end()
      })
  })
  app.get('/api/getUserReview/', function (req, res, next) {
    db.UserReview.findAll({
      include: [db.User]
    })
      .then(function (results) {
        console.log(JSON.stringify(results))
        res.send(results)
        res.status(200).end()
      })
  })
  app.get('/api/getUserRole/', function (req, res, next) {
    db.UserRole.findAll({
      include: [db.User]
    })
      .then(function (results) {
        console.log(JSON.stringify(results))
        res.send(results)
        res.status(200).end()
      })
  })
  app.get('/api/getUserSport/', function (req, res, next) {
    db.UserSport.findAll({
      include: [db.User]
    })
      .then(function (results) {
        console.log(JSON.stringify(results))
        res.send(results)
        res.status(200).end()
      })
  })

  app.post('/api/user/', function (req, res, next) {
    var username = req.body.username;
    db.User.findOrCreate(
      { 
        where: { username: username }, 
      defaults: { 
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        hometown: req.body.hometown,
        dob: req.body.dob,
        photo: req.body.photo,
        bio: req.body.bio
      } 
      })
      .spread(function(user, created){
        console.log(created)
        if(created){
          res.status(200).end()
        }else{
          res.json("username already existed in database")
        }
      })
      .catch(function(err){
        console.log("error in sequelize");
        console.log(err.message);
         res.json(err.message); 
      })
  })

  app.put('/api/user/:id', function (req, res, next) {
    db.User.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
      hometown: req.body.hometown,
      dob: req.body.dob,
      photo: req.body.photo,
      bio: req.body.bio
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (results) {
        
      if (results.changedrows === 0) {
        return res.status(404).end()
      }
      res.status(200).end()
    })
  })

  app.post('/api/userSport/', function (req, res, next) {
    console.log('user sport')
    db.UserSport.create({
      sportId: req.body.sport_id,
      UserId: req.body.user_id
    }).then(function (results) {
      console.log(results)
      res.send(results)
    })
  })

  app.post('/api/userEvent/', function (req, res, next) {
    console.log('user Event')
    db.UserEvent.create({
      eventID: req.body.event_id,
      UserId: req.body.user_id
    }).then(function (results) {
      console.log(results)
      res.send(results)
    })
  })

  app.post('/api/userLevel/', function (req, res, next) {
    console.log('user level')
    db.UserLevel.create({
      sportId: req.body.sport_id,
      level: req.body.level,
      UserId: req.body.user_id
    }).then(function (results) {
      console.log(results)
      res.send(results)
    })
  })

  app.post('/api/userRole/', function (req, res, next) {
    console.log('user role')
    db.UserRole.create({
      eventId: req.body.event_id,
      RoleId: req.body.role_id,
      UserId: req.body.user_id
    }).then(function (results) {
      console.log(results)
      res.send(results)
    })
  })

  app.post('/api/userReview/', function (req, res, next) {
    console.log('user review')
    db.UserReview.create({
      name: req.body.comment_from_user,
      comment: req.body.comment,
      rating: req.body.rating,
      UserId: req.body.user_id
    }).then(function (results) {
      console.log(results)
      res.send(results)
    })
  })

  app.delete('/api/userSport/:id', function (req, res, next) {
    db.UserSport.destroy({
      where: {
        sportId: req.params.id
      }
    }).then(function (result) {
      if (result.affectedRows == 0) {
        return res.status(404).end()
      }else {
        res.status(200).end()
      }
    })
  })

  app.delete('/api/userEvent/:id', function (req, res, next) {
    db.UserEvent.destroy({
      where: {
        eventID: req.params.id
      }
    }).then(function (result) {
      if (result.affectedRows == 0) {
        return res.status(404).end()
      }else {
        res.status(200).end()
      }
    })
  })
}
