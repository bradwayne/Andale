// dependencies
var path = require("path");

// routing
module.exports = function(app) {

  //get api to the activity html page
  app.get("/activity", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/activity.handlebars"));
  });

  //get api to the events html page
  app.get("/events", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/events.handlebars"));
  });

  //get api to the index html page
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });

  //get api to the user html page
  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/user.handlebars"));
  });

  //get api to the homepage
  app.get("/homePage", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home.handlebars"));
  });
  // If no matching route is found default to homepage
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home.handlebars"));
  });
};