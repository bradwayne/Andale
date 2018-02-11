var db = require("../app/models");

module.exports = function(app){
    app.get('/', function(req, res, next){
        db.User.findAll({}).then(function(users){
            console.log("get users from sql")
            console.log(JSON.stringify(users));
            db.Events.findAll({}).then(function(events){
                console.log("get events from sql")
                console.log(JSON.stringify(events));
                res.render('index', 
                    {
                        title: 'Andale!!',
                        users : users,
                        events : events,
                    }
                )
            })
            
        })
    })
}
