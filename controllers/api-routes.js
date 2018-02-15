var db = require("../app/models");

module.exports = function(app){ 

 //api routes
//a get request api to get data from the project2_DB user database
  app.get("/api/project2_DB/user", function(req, res) {
    res.json(user);
  });

  //a get request api to get data from the project2_DB sport database
  app.get("/api/project2_DB/sport", function(req, res) {
    res.json(sport);
  });

  //a get request api to get data from the project2_DB event database
  app.get("/api/project2_DB/event", function(req, res) {
    res.json(event);
  }); 

  //a post request api to post data to the project2_DB user database
  app.post("/api/project2_DB/user", function(req, res) {
    user.push(req.body);
    console.log(req.body);
    res.json(true);
    });

   //a post request api to post data to the project2_DB sport database
  app.post("/api/project2_DB/sport", function(req, res) {
    sport.push(req.body);
    console.log(req.body);
    res.json(true);
    });

   //a post request api to post data to the project2_DB event database
  app.post("/api/project2_DB/event", function(req, res) {
    event.push(req.body);
    console.log(req.body);
    res.json(true);
    });

}