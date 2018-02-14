var db = require("../app/models");

module.exports = function(app){  
    var eventToDisplay = {};
    app.get('/event/', function(req, res, next){
        db.Events.findAll({}).then(function(events){
            console.log("In event API route, ")
            console.log(JSON.stringify(events))
            eventToDisplay = {
                eventTitle : "All Events",
                eventDisplay : events,
            };
        })
        res.render('index' , eventToDisplay)
    })    


}
