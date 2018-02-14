var db = require('../app/models')

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
        res.json({error: 'User not found!'})
        next('User not found!')
      }
    }).catch(function (err) {
      console.log(err)
      next(err)
    })
  })

  app.post('/api/user/', function (req, res, next) {
    console.log('first name ', first_name)
    db.User.create({
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
    }).then(function (results) {
      console.log(results)
      res.JSON(results)
    })
  })
}
