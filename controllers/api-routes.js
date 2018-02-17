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
    res.json(true);
    });

   //a post request api to post data to the project2_DB sport database
  app.post("/api/project2_DB/sport", function(req, res) {
    sport.push(req.body);
    res.json(true);
    });

   //a post request api to post data to the project2_DB event database
  app.post("/api/project2_DB/event", function(req, res) {
    event.push(req.body);
    res.json(true);
    });


  //event discussion (blog) api's

  //a get request api to get all mysql database entries 
  //           for event discussion for any event 
  app.get("/api/project2_DB/EventDiscussion", function(req, res) {
    db.EventDiscussion.selectAll(function(data) {
      var hbsObject = {
        EventDiscussion: data
      };
      res.json(hbsObject);
    });
  });

  //a get request api to get mysql database entries 
  //        for event discussion for an event
  app.get("/api/project2_DB/EventDiscussion/:Events", function(req, res) {
    db.EventDiscussion.findAll({
      where: {
        Events: req.params.Events
        }
    })
    .then(function(dbDiscussion) {
      res.json(dbDiscussion);
    });
  });

  //a post request api to add an event discussion (blog) to an event
  app.post("/api/project2_DB/EventDiscussion/:Events", function(req, res) {
    db.EventDiscussion.create({
      id: req.body.id,
      message: req.body.message,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      timestamps: req.body.timestamps
    }),
    .then(function(dbBlog) {
      res.json(dbBlog);
    });
  });

 // DELETE route for deleting blogs (event discussions)
  app.delete("/api/project2_DB/EventDiscussion/:Events/:id", function(req, res) {
    db.EventDiscussion.destroy({
      where: {
        Events: req.params.Events,
        id: req.params.id
      }
    })
    .then(function(dbBlog) {
      res.json(dbBlog);
    });
  });

  // PUT route for updating blogs (event discussions)
  app.put("/api/project2_DB/EventDiscussion/:Events", function(req, res) {
    db.EventDiscussion.update(req.body,
      {
        where: {
          Events: req.params.Events,
          id: req.body.id
        }
      })
    .then(function(dbBlog) {
      res.json(dbBlog);
    });
  });

}