var db = require("../app/models");

module.exports = function(app){
    app.get('/', function(req, res, next){
        /*
        db.User.findAll({}).then(function(users){
            console.log("get user result")
            res.render('index', 
                {
                    title: 'PROJECT 2 TITLE NAME HERE',
                    users : users
                })
        })


        */
        var usersExample = 
            [
                {
                    name: "SK",
                    age : "1",
                    sport : "badminton"
                },
                {
                    name: "Doggo",
                    age : "27",
                    sport : "play fetch"
                },
                {
                    name: "Patterson",
                    age : "31",
                    sport : "basketball"
                }
                
            ]
        
        res.render('index', {
            title: 'PROJECT 2 TITLE NAME HERE',
            user : usersExample ,
        })
    })
}
