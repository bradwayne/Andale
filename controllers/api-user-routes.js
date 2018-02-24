var db = require('../app/models')
var Sequelize = require('sequelize')
var nodemailer = require('nodemailer')
var Op = Sequelize.Op

module.exports = function (app) {
  app.get('/', function (req, res, next) {
    db.User.findAll({}).then(function (users) {
      console.log('get users from sql')
      console.log(JSON.stringify(users))
      db.Events.findAll({}).then(function (events) {
        console.log('get events from sql')
        console.log(JSON.stringify(events))
        res.render('home',
          {
            title: 'Andale!!',
            users: users,
            events: events
          }
        )
      })
    })
  })

  app.get('/user/:id?', function (req, res, next) {
    var objUser = {}
    var arrSportId = []
    var arrEventId = []
    console.log('get specific user info')
    if (req.params.id) {
      db.User.findOne({
        where: { id: req.params.id },
        include: [{ model: db.UserEvent }, { model: db.UserSport }]
      })
        .then(function (user) {
          objUser = {
            title: 'User Profile',
            user: user
          }
          for (var i = 0; i < user.UserSports.length; i++) {
            arrSportId.push(user.UserSports[i].SportId)
          }
          for (var i = 0; i < user.UserEvents.length; i++) {
            arrEventId.push(user.UserEvents[i].EventId)
          }

          console.log(arrSportId)
          console.log(arrEventId)
          db.Sport.findAll({
            where: {
              Id: { [Op.notIn]: arrSportId}
            }
          })
            .then(function (otherSports) {
              objUser.otherSports = otherSports
              db.Events.findAll({
                where: {
                  id: { [Op.notIn]: arrEventId},
                  numberAttending: { $lt: Sequelize.col('attendants')},
                  [Op.or]: [{gender: objUser.user.gender}, {gender: 'Unspecified'}]
                }
                // more filter in here!! based on user specification, user gender, favorite sport, 

              }).then(function (otherEvents) {
                objUser.otherEvents = otherEvents
                db.UserSport.findAll({
                  where: {
                    SportId: { [Op.in]: arrSportId},
                    UserId: req.params.id
                  },
                  include: [db.Sport]
                }).then(function (likeSportInfo) {
                  objUser.likeSportsInfo = likeSportInfo
                  db.UserEvent.findAll({
                    where: {
                      EventId: {[Op.in]: arrEventId},
                      UserId: req.params.id
                    },
                    include: [db.Events]
                  }).then(function (likeEventInfo) {
                    objUser.likeEventInfo = likeEventInfo
                    // res.json(objUser)
                    req.flash('info', 'Flash Message Added')
                    // res.redirect('/')
                    // req.flash('info', 'Welcome')
                    res.render('user', objUser)
                  })
                })
              })
            })
        })
    }else {
      db.Sport.findAll({})
        .then(function (sports) {
          objUser.otherSports = sports
          res.render('user', objUser)
        // res.json(objUser)
        })
    }
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
        res.send(credentials).end()
        console.log(JSON.stringify(credentials))
      }else {
        // res.send("403 error")
        res.json({error: 'User not found!'}).end()
      // next('User not found!')
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

  app.post('/api/userSport/:id', function (req, res, next) {
    db.UserSport.create({
      SportId: req.body.SportId,
      level: req.body.level,
      UserId: req.params.id
    }).then(function (results) {
      res.send(results)
      res.status(200).end()
    })
  })

  app.post('/api/user/', function (req, res, next) {
    var username = req.body.username
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
          state: req.body.state,
          city: req.body.city,
          hometown: req.body.hometown,
          dob: req.body.dob,
          photo: req.body.photo,
          bio: req.body.bio
        }
      })
      .spread(function (user, created) {
        console.log(created)
        if (created) {
          res.status(200).end()

          const output = ` <h1> Welcome to Andale!</h1>
                        <h3>Application engineered to your personal preference! We find you the sport events of your interest</h3>\
                        <a href='<a href='https://salty-mountain-44153.herokuapp.com/'>Find out more about us!</a>
                        
                        <h3> Account created successfully! </h3>
                        <h3> User info</h3>
                        <ul>
                        <li> First name : ${req.body.first_name}</li>
                        <li> Last name : ${req.body.last_name}</li>
                        <li>Username : ${req.body.username}</li>
                        <li>E-mail : ${req.body.email}</li>
                        </ul>
                        <p>${req.body.bio}</p>`



          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: 'Gmail',
            // port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'bscwruproject2@gmail.com', // generated ethereal user
              pass: 'Bootcamp123' // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false
            }
          })

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Project 2 Admin" <bscwruproject2@gmail.com', // sender address
            to: req.body.first_name + ' ' + req.body.last_name + ' <' + req.body.email + '>', // list of receivers
            subject: 'Andale Account Created! 👻', // Subject line
            text: 'Hello world?', // plain text body
            html: output
          // html: '<b>Hello world?</b>' // html body
          }

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error)
            }
            console.log('Message sent: %s', info.messageId)
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          })
        }else {
          res.json('username already existed in database')
        }
      })
      .catch(function (err) {
        console.log('error in sequelize')
        console.log(err.message)
        res.json(err.message)
      })
  })
  app.get('/mail', function (req, res, next) {
    const output = ` <p> Testing nodemailer </p>
                        <h3> Blaaaaa</h3>
                        <ul>
                        <li>${req.body.first_name}</li>
                        <li>${req.body.last_name}</li>
                        <li>${req.body.user_name}</li>
                        </ul>
                        <p>${req.body.bio}</p>`
  })

  app.put('/api/user/:id', function (req, res, next) {
    db.User.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city,
      state: req.body.state,
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
    }).catch(function (err) {
      console.log('error in sequelize')
      console.log(err.message)
      res.json(err.message)
    })
  })

  app.post('/api/userSport/', function (req, res, next) {
    console.log('user sport')
    db.UserSport.create({
      SportId: req.body.sport_id,
      level: parseInt(req.body.level),
      UserId: req.body.user_id
    }).then(function (results) {
      req.flash('info', 'Flash Message Added')
      res.redirect('/user/' + req.body.user_id)
      console.log(results)
    // res.send(results)
    })
  })

  app.put('/api/userSport/', function (req, res, next) {
    console.log('user sport')
    console.log(req.body)
    db.UserSport.update({
      level: parseInt(req.body.level)
    }, {
      where: {
        UserId: req.body.UserId,
        SportId: req.body.SportId
      }
    }).then(function (results) {
      console.log('changedRows : ' + results.changedRows)
      console.log('results:')
      console.log(results)
      if (results.changedRows === 0) {
        return res.status(404).end()
      }else {
        res.status(200).end()
      }
      // req.flash('info', 'Flash Message Added')
      // res.redirect('/user/' + req.body.UserId)
      console.log(results)
    })
  })

  app.post('/api/userEvent/', function (req, res, next) {
    var EventInfo, UserInfo, UserEventInfo
    var numEvents, attendantLimit, hostName, hostEmail, hostId
    console.log('user Event')
    db.UserEvent.create({
      EventId: req.body.EventId,
      UserId: req.body.UserId
    }).then(function (results) {
      db.UserEvent.findAndCountAll({
        where: {
          EventId: req.body.EventId
        }
      }).then(function (allEvents) {
        UserEventInfo = allEvents
        numEvents = allEvents.count
        console.log(allEvents)
        console.log('All events count: ')
        console.log(numEvents)
        db.Events.update({
        numberAttending: numEvents},
          {
            where: {
              id: req.body.EventId
            }
          }).then(function (updated) {
          EventInfo = updated
          console.log('changedRows : ' + results.changedRows)
          console.log(results)
          if (results.changedRows === 0) {
            return res.status(404).end()
          }
          db.Events.findOne({
            where: {
              id: req.body.EventId
            }
          }).then(function (events) {
            console.log(events)
            eventInfo = events
            attendantLimit = eventInfo.attendants
            hostId = eventInfo.UserId
            console.log('host Id : ' + hostId)
            console.log('attendance : ' + eventInfo.attendants)
            if (attendantLimit == numEvents) {
              db.User.findOne({
                where: {
                  id: hostId
                }
              }).then(function (userInfo) {
                hostName = userInfo.first_name + ' ' + userInfo.last_name
                hostEmail = userInfo.email
                console.log('send out email to host about full attendances')

                var content = `Hi ${hostName}, <br /> you have gathered <b>${attendantLimit}</b> person for event <b>${eventInfo.name}</b>!
                                       Please check out the event detail page for your upcoming event buddies! 
                                       <br /><a href='<a href='https://salty-mountain-44153.herokuapp.com/'>Go to Andale!</a>
                                       `
                console.log(hostName + ' <' + hostEmail + '>')
                console.log('Your Event - ' + eventInfo.name + ' is ready!')
                console.log(content)
                mailer(hostName + ' <' + hostEmail + '>', 'Your Event - ' + eventInfo.name + ' is ready!', content)
              })
            }
            res.status(200).end()
          })
        })
      })
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
        SportId: req.params.id,
        UserId: req.body.UserId
      }
    }).then(function (result) {
      console.log('affected Rows : ' + result.affectedRows)
      if (result.affectedRows == 0) {
        return res.status(404).end()
      }else {
        res.status(200).end()
      }
    })
  })

  app.delete('/api/userEvent/:id', function (req, res, next) {
    var numEvents
    db.UserEvent.destroy({
      where: {
        EventId: req.params.id,
        UserId: req.body.UserId
      }
    }).then(function (result) {
      db.UserEvent.findAndCountAll({
        where: {
          EventId: req.body.EventId
        }
      }).then(function (allEvents) {
        numEvents = allEvents.count
        console.log(allEvents)
        console.log('All events count: ')
        console.log(numEvents)
        db.Events.update({
        numberAttending: numEvents},
          {
            where: {
              id: req.body.EventId
            }
          }).then(function (updated) {
          console.log('changedRows : ' + updated.changedRows)
          console.log(updated)
          if (updated.changedRows === 0) {
            return res.status(404).end()
          }
          res.status(200).end()
        })
      })
    })
  })

  function mailer (emailTo, emailSubject, emailContent) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      // port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'bscwruproject2@gmail.com', // generated ethereal user
        pass: 'Bootcamp123' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Project 2 Admin" <bscwruproject2@gmail.com>', // sender address
      to: emailTo, // list of receivers
      subject: emailSubject, // Subject line
      html: emailContent
    // html: '<b>Hello world?</b>' // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  }

  app.get('/brad/:id', function (req, res, next) {
    var objUser = {}
    var arrSportId = []
    var arrEventId = []
    console.log('get specific user info')
    db.User.findOne({
      where: { id: req.params.id },
    // include: [{ model: db.UserEvent }, { model: db.UserSport }]
    })
      .then(function (user) {
        objUser = {
          title: 'User Profile',
          user: user
        }
        if (user.UserSports) {
          for (var i = 0; i < user.UserSports.length; i++) {
            arrSportId.push(user.UserSports[i].SportId)
          }
        }
        if (user.UserEvents) {
          for (var i = 0; i < user.UserEvents.length; i++) {
            arrEventId.push(user.UserEvents[i].EventId)
          }
        }
        console.log(arrSportId)
        console.log(arrEventId)
        db.Sport.findAll({
          where: {
            Id: { [Op.notIn]: arrSportId }
          }
        })
          .then(function (otherSports) {
            objUser.otherSports = otherSports
            db.Events.findAll({
              where: {
                id: { [Op.notIn]: arrEventId },
              // more filter in here!! based on user specification, user gender, favorite sport, 
              }
            }).then(function (otherEvents) {
              objUser.otherEvents = otherEvents
              db.UserSport.findAll({
                where: {
                  SportId: { [Op.in]: arrSportId },
                  UserId: req.params.id
                },
                include: [db.Sport]
              }).then(function (likeSportInfo) {
                objUser.likeSportsInfo = likeSportInfo
                db.UserEvent.findAll({
                  where: {
                    EventId: { [Op.in]: arrEventId },
                    UserId: req.params.id
                  },
                  include: [db.Events]
                }).then(function (likeEventInfo) {
                  objUser.likeEventInfo = likeEventInfo
                  // res.json(objUser)
                  res.render('home', objUser)
                })
              })
            })
          })
      })
  })
}
