 var db = require("../app/models");

module.exports = function(app){

    app.post('/api/sport/', function(req, res, next){
        var sport_name = req.body.sport_name;
        var sport_type = req.body.sport_type;

        db.Sport.create({
            name : sport_name,
            sport_type : sport_type,
        }).then(function(result){
            console.log(result);
        })

    })
    app.post('/api/createUserSport/', function(req, res, next){
        var userId = req.body.user_id;
        var sportId = req.body.sport_id;
        var firstName = req.body.first_name;
        db.UserSport.create({
            UserId : userId,
            sportId : sportId
        }).then(function(results){
            console.log("results from create sport:");
            console.log(JSON.stringify(results));
            res.send(results);
            /* db.UserSport.addUser(results.id);
            db.UserSport.save(); */

        })
        
        /* db.UserSport.create({
            UserId : userId,
            sportId : sportId
        }).then(function(result){
            console.log(result);
        }) */
        /* 



        */

    })

    app.get('/api/getUserSport/', function(req, res, next){
        db.UserSport.findAll({
            include : [db.User]
        })
        .then(function (results){
            console.log(JSON.stringify(results));
            res.send(results);
        })
    });
    
    
};