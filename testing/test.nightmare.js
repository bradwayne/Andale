var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true });
nightmare
  .goto("https://salty-mountain-44153.herokuapp.com")
  .goto("https://salty-mountain-44153.herokuapp.com/event/3")
  .click("#aLogInNav")
  .goto("https://salty-mountain-44153.herokuapp.com/event_details/12")
  .goto("https://salty-mountain-44153.herokuapp.com/user/11")
  .goto("https://salty-mountain-44153.herokuapp.com/event_details/3")
  .goto("https://salty-mountain-44153.herokuapp.com/event_details/1")
  .end()
  .then(function(result) {
    console.log("The tests ran successfully.");
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });