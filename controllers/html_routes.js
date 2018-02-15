// dependencies
var path = require("path");

// routing
module.exports = function(app) {

  //get api to the user html page
  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../html_project_2/userpage.html"));
  });

  //get api to the sport html page
  app.get("/sport", function(req, res) {
    res.sendFile(path.join(__dirname, "../html_project_2/sportpage.html"));
  });

  //get api to the user html page
  app.get("/event", function(req, res) {
    res.sendFile(path.join(__dirname, "../html_project_2/eventpage.html"));
  });

    //get api to the user html page
  app.get("/review", function(req, res) {
    res.sendFile(path.join(__dirname, "../html_project_2/reviewpage.html"));
  });

  //get api to the homepage
  app.get("/homePage", function(req, res) {
    res.sendFile(path.join(__dirname, "../html_project_2/homepage.html"));
  });
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../html_project_2/homepage.html"));
  });
};