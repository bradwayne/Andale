let db = require('../app/models');
let Sequelize = require('sequelize');

let Op = Sequelize.Op;

module.exports = function (app) {
    app.get('/api/editEvent/:eventId', function (req, res, next) {
        console.log(req.body);
        db.Events.findOne({
            where: {id: req.params.eventId}
        }).then(function (results) {
            console.log(results);
            if (results) {
                res.json(results);
            }else {
                res.json('Error getting data');
            }
        });
    });
    app.get('/api/event/:orderParam/:orderMethod?', function (req, res, next) {
        let eventToDisplay = {};
        let orderStatement = {};
        console.log(req.params);
        if (req.params.orderParam && req.params.orderMethod) {
            orderStatement = {
                orderParam: req.params.orderParam, // orderBy must include column name and asc/desc i.e: name ASC, gender DESC
                orderMethod: req.params.orderMethod
            };
        }

        db.Events.findAll({order: [[orderStatement.orderParam, orderStatement.orderMethod]]}).then(function (events) {
            console.log('In event API route, ');
            console.log(JSON.stringify(events));
            eventToDisplay = {
                eventTitle: 'All Events',
                eventDisplay: events
            };
        });
        res.json(eventToDisplay);
    // res.render('index' , eventToDisplay)

    });

    app.get('/event/:id?/:edit?', function (req, res, next) {
        let arrEventId = [];
        let arrSportId = [];
        let eventToDisplay = {};
        if (req.params.id) {
            db.User.findOne({
                where: { id: req.params.id },
                include: [
                    { model: db.Events,
                        include : [
                            {
                                model: db.Sport
                            }
                        ]},
                    {
                        model: db.UserSport,
                        include: [
                            {
                                model: db.Sport
                            }
                        ]
                    }, {model: db.UserEvent}
                ]
            })
                .then(function (userHostedEvents) {
                    eventToDisplay = {
                        title: 'Events User Hosting',
                        user: userHostedEvents
                    };
                    if (eventToDisplay.user.UserEvents) {
                        for (var i = 0; i < eventToDisplay.user.UserEvents.length; i++) {
                            arrEventId.push(eventToDisplay.user.UserEvents[i].EventId);
                        }
                    }
                    if (eventToDisplay.user.UserSports) {
                        for (var i = 0; i < eventToDisplay.user.UserSports.length; i++) {
                            arrSportId.push(eventToDisplay.user.UserSports[i].SportId);
                        }
                    }

                    console.log(arrEventId);
                    db.UserEvent.findAll({
                        where: {
                            EventId: { [Op.in]: arrEventId },
                            UserId: req.params.id
                        },
                        include: [{model: db.Events, include : [
                            {model: db.Sport},{model: db.User}
                        ]}]
                    }).then(function (likeEventInfo) {
                        eventToDisplay.likeEventInfo = likeEventInfo;
                        db.Events.findAll({
                            where: {
                                id: {[Op.notIn]: arrEventId},
                                SportId: {[Op.in]: arrSportId},
                                UserId: {[Op.ne]: req.params.id},
                                gender: {[Op.in]: [eventToDisplay.user.gender.toLowerCase() , 'unspecified']},
                                numberAttending: {[Op.lt]: Sequelize.col('attendants')}, // compare two columns in a same table
                            },
                            include: [{model:db.User},{model:db.Sport}]
                        })
                            .then(function (otherEvents) {
                                eventToDisplay.otherEvents = otherEvents;

                                db.Events.findAll({include: [{model: db.User}, {model: db.Sport}]})
                                    .then(function (allEvents) {
                                        eventToDisplay.allEvents = allEvents;
                                        db.Sport.findAll({})
                                            .then(function (allSports) {
                                                eventToDisplay.allSports = allSports;
                                                db.Events.findOne({where: {
                                                    id: req.params.edit
                                                },
                                                include: db.Sport
                                                }).then(function (toEdit) {
                                                    eventToDisplay.eventToEdit = toEdit;
                                                    console.log('here');
                                                    //res.json(eventToDisplay)
                                                    res.render('events', eventToDisplay);
                                                });
                                            });
                                    });
                            });
                    });
                });
        }else {
            db.Events.findAll(
                {include: [{model: db.User}, {model: db.Sport}]}).then(function (allEvents) {
                eventToDisplay.allEvents = allEvents;
                console.log('here');
                //res.json(eventToDisplay)
                res.render('events', eventToDisplay);
            });
        }
    });

    app.get('/event_details/:eventId', function (req, res, next) {
        let objEventDetails = {};
        if (req.params.eventId) {
            db.Events.findOne({
                where: { id: req.params.eventId},
                include: [{model: db.EventDiscussion}, {model: db.Sport}, {model: db.User}]
            })
                .then(function (eventDetails) {
                    objEventDetails.details = eventDetails;
                    db.UserEvent.findAll({
                        where: { EventId: req.params.eventId }
                    }).then(function (attendingUsersId) {
                        // objEventDetails.attendingUsersId = attendingUsersId
                        let arrUserId = [];
                        for (let i = 0; i < attendingUsersId.length; i++) {
                            arrUserId.push(attendingUsersId[i].UserId);
                        }
                        console.log('user attending event id :' + arrUserId);
                        db.User.findAll({
                            where: { id: {[Op.in]: arrUserId} },
                            include : [
                                {model: db.UserSport, include : {
                                    model:db.Sport,
                                    where : {id : objEventDetails.details.SportId}
                                }}
                            ]
                        }).then(function (attendingUsers) {
                            objEventDetails.attendingUsers = attendingUsers;
                            db.EventDiscussion.findAll({
                                where: {EventId: req.params.eventId},
                                include: db.User
                            }).then(function (eventDiscussion) {
                                objEventDetails.discussion = eventDiscussion;
                                //res.json(objEventDetails)
                                console.log(objEventDetails);
                                res.render('activity', objEventDetails);
                            });
                        });
                    });
                });
        }else {
            res.json('event id not found');
        }
    });
    /* function objValidation(obj){
    var errMessage = []
    if(obj.name){
        if(obj.name.length > 255 || obj.name.length < 1){
          errMesasge.push("Event name must be between 1 and 255 characters")
        }
    }else{
        errMessage.push("Event name cannot be blank")
    }
    if(!obj.location){
        errMesasge.push("Location is empty")
    }
    if(obj.attedants){
        if(!typeof(obj.attedants) == "number"){
          errMessage.push("Attedance must be integer")
        }
    }
    if(obj.fees){
        if(!typeof(obj.fees) == "number"){
            errMessage.push("Fees must be numeric")
        }
    }
    if(!obj.host){
      errMessage.push("Host cannot be empty")
    }
    if(obj.phone_contact){
        if(!typeof(obj.phone_contact)){
            errMessage.push("Phone number must be integer")
        }
    }
    if(obj.gender !== 'male' || obj.gender !== 'female' || obj.gender != 'unspecified'){
        errMessage.push("Gender cannot be empty")
    }

  } */
    app.post('/api/event/:user_id', function (req, res, next) {
        console.log('here');
        let user_id = req.params.user_id;
        db.Events.create({
            name: req.body.name,
            location: req.body.location,
            attendants: req.body.attendants,
            fees: req.body.fees,
            host: req.body.host,
            phone_contact: req.body.phone_contact,
            email_contact: req.body.email_contact,
            gender: req.body.gender,
            level: req.body.level,
            age: req.body.age,
            details: req.body.details,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            geolocation_x: req.body.geolocation_x,
            geolocation_y: req.body.geolocation_y,
            UserId: req.params.user_id,
            SportId: req.body.sport_id
        }).then(function (results) {
            /* if (err) {
            console.log(err)
          return res.status(500).end()
        } */

            // Send back the ID of the new todo
            res.status(200).end();
            // res.json({ id: results.insertId })
            // console.log({ id: results.insertId })
        }).catch(function (err) {
            console.log('error in sequelize');
            console.log(err.message);
            res.json(err.message);
        });
    });

    app.put('/api/event/:event_id', function (req, res, next) {
        let event_id = req.params.event_id;
        db.Events.update({
            name: req.body.name,
            location: req.body.location,
            attendants: req.body.attendants,
            fees: req.body.fees,
            host: req.body.host,
            phone_contact: req.body.phone_contact,
            email_contact: req.body.email_contact,
            gender: req.body.gender,
            level: req.body.level,
            age: req.body.age,
            details: req.body.details,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            userId: req.params.event_id
        }, {
            where: {
                id: req.params.event_id
            }
        }).then(function (results) {
            if (results.changedRows === 0) {
                res.json(results).end();
                // return res.status(404).end()
            }else {
                res.status(200).end();
            }
        });
    });

    app.post('/api/sportEvent/:sport_id/:event_id', function (req, res, next) {
        let event_id = req.params.event_id;
        let sport_id = req.params.sport_id;

        db.SportEvent.create({
            SportId: sport_id,
            eventID: event_id
        }).then(function (results) {
            res.status(200).end();
        });
    });

    app.put('/api/sportEvent/:sport_id/:event_id', function (req, res, next) {
        let event_id = req.params.event_id;
        let sport_id = req.params.sport_id;

        db.SportEvent.update({
            SportId: sport_id,
            eventID: event_id
        }).then(function (results) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }else {
                res.status(200).end();
            }
        });
    });

    app.delete('/api/event/:event_id', function (req, res, next) {
        let EventId = req.params.event_id;
        if (EventId) {
            db.Events.destroy({
                where: { id: EventId }
            }).then(function (result) {
                console.log('affected Rows : ' + result.affectedRows);
                if (result.changedRows == 0) {
                    return res.status(404).end();
                } else {
                    console.log('Event deleted successfully!');
                    res.status(200).end();
                }
            });
        }else {
            res.json('Event ID is not provided, delete failed');
        }
    });
};
