$(function () {
  $('#msg-center').hide()
  $('.create-event').hide()
  $('.ddl-sports').chosen({width: '100%'})
  $('.slider').slider({
    precision: 2
  })
  $('.newSportSlider').slider({
    precision: 2,
    value: 0
  })

  $('i.time').each(function () {
    console.log($(this).text())
    $(this).text(moment($(this).text()).format('YYYY-MM-DD hh:mm a'))
  })

  $('#aLogInNav').click(function () {
    if ((window.location.href.indexOf('/user') > -1) || (window.location.href.indexOf('/event') > -1)) {
      setWebSession('login')
      window.location.href = '/'
    }else {
      $('#logIn').modal()
      sessionStorage.removeItem('sessionNextPage')
    }
  })
  if (sessionStorage.getItem('sessionNextPage') == 'login') {
    $('#logIn').modal()
    sessionStorage.removeItem('sessionNextPage')
  }else if (sessionStorage.getItem('sessionNextPage') == 'details') {
    $('#activity').modal()
    sessionStorage.removeItem('sessionNextPage')
  }
  $('#cmdsubmitMyEventsBtn').click(function () {
    $('#myEvents').modal()
  })
  $('#cmdsubmitAllEventsBtn').click(function () {
    $('#allEvents').modal()
  })
  $('#cmdsubmitEventsNearBtn').click(function () {
    $('#eventNear').modal()
  })
  $('#cmdsubmitMyInterestsBtn').click(function () {
    $('#myInterests').modal()
  })
  $('#cmdsubmitCreateEventBtn').click(function () {
    $('#createEvent').modal()
  })

  $('#hypSignUpBtn').click(function () {
    console.log('here')
    setWebSession('sign up')
    window.location.href = '/user'
  // $('#signUp').modal()
  })

  $('#aEventNav').click(function () {
    console.log('going to event page')
    if (sessionStorage.getItem('sessionUserId')) {
      window.location.href = '/event/' + sessionStorage.getItem('sessionUserId')
    }else {
      console.log('you need to sign in to view the event page')
      setWebSession('all event')
      window.location.href = '/event'
    }
  })

  $('.cmdDetails').click(function () {
    setTimeout(() => {
      setWebSession('details')
      window.location.href = '/event_details/' + $(this).attr('data-event-id')
    }, 500)
  })
  if (window.location.href.indexOf('/user/') > -1) {
    if (sessionStorage.getItem('sessionMsgCenter')) {
      $('#msg-center').html(sessionStorage.getItem('sessionMsgCenter'))
      $('#msg-center').show()
      $('#msg-center').addClass('alert-success').removeClass('alert-danger')

      sessionStorage.removeItem('sessionMsgCenter')
    }
    if (sessionStorage.getItem('sessionUserName')) {
      $('.profile-username').text(sessionStorage.getItem('sessionUserName').toUpperCase() + "'s")
      $('#aSignUpBtn').removeAttr('href')
      $('#signUp').modal()
      $('#aSignUpBtn').click(function () {
        $('#signUp').modal()
      })
      if (sessionStorage.getItem('sessionUserId')) {
        $('#signUp :input').addClass('currentUser')
      }else {
        $('#signUp :input').addClass('newUser')
      }

      var sliderValue = $('#slider')
      $('.slider.currentUser').each(function () {
        console.log($(this).attr('data-slider-value'))
        var value = $(this).attr('data-slider-value')
        console.log('here')
        if (value) {
          console.log('here')
          $(this).data('value', value)
          $(this).val('data-slider-value')
        }
      })

      console.log('remove session in user redirect')
      sessionStorage.removeItem('sessionNextPage')
    }
  }

  if (!sessionStorage.getItem('sessionUserId')) {
    console.log('user is not log in, hide user profile')
    $('#aSignUpBtn').hide()
    $('#aSignUpNav').show()
    $('#aLogInNav').show()
    $('#aLogOutNav').hide()
    $('.createEvents').hide()
  }else {
    $('#aSignUpNav').hide()
    $('#aSignUpBtn').show()
    $('#aLogInNav').hide()
    $('#aLogOutNav').show()
    $('.createEvents').show()
    $('.profile-username').text(sessionStorage.getItem('sessionUserName').toUpperCase() + "'s")
    $('#aSignUpBtn').attr('href', '/user/' + sessionStorage.getItem('sessionUserId'))
  }

  $('#aSignUpNav').click(function () {
    setWebSession('sign up')
    window.location.href = '/user'
  })

  if (sessionStorage.getItem('sessionNextPage') === 'sign up') {
    console.log('sign up session here')
    if (window.location.href.indexOf('/user') > -1) {
      $('.sport-section').hide()
      $('#signUp').modal()
      sessionStorage.removeItem('sessionNextPage')
    }
  }else if (window.location.href.indexOf('/event') > -1) {
    if (sessionStorage.getItem('sessionMsgCenter')) {
      $('#msg-center').html(sessionStorage.getItem('sessionMsgCenter'))
      $('#msg-center').show()
      $('#msg-center').addClass('alert-success').removeClass('alert-danger')
    }
    // $('#eventNear').modal()
    if (!sessionStorage.getItem('sessionUserId')) {
      $('.myEvents').hide()
    }else {
      $('.myEvents').show()
    }
    console.log('here')
    console.log(sessionStorage.getItem('sessionNextPage'))
    if (sessionStorage.getItem('sessionNextPage') === 'my event') {
      console.log('here')

      console.log('in event page')
      console.log('something pop up')
      $('#myInterests').modal()
      sessionStorage.removeItem('sessionNextPage')
    }else if (sessionStorage.getItem('sessionNextPage') === 'all event') {
      console.log('in event page, going to all event')
      $('#allEvents').modal()
    }else if (sessionStorage.getItem('sessionNextPage') === 'create event') {
      $('#createEvent').modal()
      console.log('here')
      if (sessionStorage.getItem('sessionMsgCenter')) {
        $('.create-event').show()
        $('.create-event').addClass('alert-success').removeClass('alert-danger')
        $('.create-event').html(sessionStorage.getItem('sessionMsgCenter'))
      }
    }
    sessionStorage.removeItem('sessionNextPage')
    sessionStorage.removeItem('sessionMsgCenter')
  }

  $('#aLogOutNav').click(function () {
    console.log('user logged out successfully, clear session items')
    $('#aSignUpBtn').hide()
    clearSession()
    window.location.href = '/'
  })

  $('#cmdsubmitLogin').click(function () {
    username = $('#txtLoginUserName').val()
    password = $('#pwdLoginPwd').val()
    console.log(username, password)
    setWebSession('my event')
    getUserCredentials(username, password)
  })

  var getUserCredentials = function (username, password) {
    var successBool = false
    var credentials = {
      username: username,
      password: password
    }
    console.log(credentials)
    $.ajax('/api/getUser/' + credentials.username + '/' + credentials.password , {
      type: 'GET',
    data: credentials})
      .then(function (result) {
        console.log(result)
        if (result.error == 'User not found!') {
          console.log('User either enter wrong username or password')
          $('#msg-center').show()
          $('#msg-center').addClass('alert-danger')
          $('#msg-center').text('Invalid username or password!')
          successBool = false
        }else {
          console.log('here')
          var userInfo = result.rows[0]
          console.log(result)
          console.log(result.rows[0])
          setUserSession(userInfo)
          setTimeout(() => {
            console.log('proceed with page reload')
            if (sessionStorage.getItem('sessionUserId')) {
              if (sessionStorage.getItem('sessionNextPage') == 'my event') {
                window.location.href = '/event/' + sessionStorage.getItem('sessionUserId')
              } else if (sessionStorage.getItem('sessionNextPage') == 'user profile') {
                window.location.href = '/user/' + sessionStorage.getItem('sessionUserId')
              }
            }else {
              window.location = '/'
            }
          // location.reload()
          }, 500)
        }
      })
  /* success: function (data, status, xhr) {
    console.log('success')
    console.log(status)
    console.log(xhr.responseJSON.error)
    console.log('xhr')
    console.log(xhr)
    if (xhr.responseJSON.error == 'User not found!') {
      console.log('User either enter wrong username or password')
      $('#msg-center').show()
      $('#msg-center').addClass('alert-danger')
      $('#msg-center').text('Invalid username or password!')
      throw(xhr.responseJSON.error)    

    }else {
      console.log('here')
      var userInfo = xhr.responseJSON.rows[0]
      console.log(xhr.responseJSON)
      console.log(xhr.responseJSON.rows[0])
      setUserSession(userInfo)
      successBool = true
      return true
    }
  } */
  }
  function createNewUser () {
    var credentials = {
      username: 'wutmate',
      password: 'qWer1' + 1234
    }
    console.log(credentials)
    $.ajax('/api/user/', {
      type: 'POST',
      data: credentials,
      success: function (data, status, xhr) {
        console.log('in create new user')
        if (xhr.responseJSON.indexOf('Validation error') > -1) {
          console.log(xhr.responseJSON)
        }else {
          console.log('user created successfully')
        }
      // console.log(xhr.responseJSON.error)
      },complete: function (data) {
        console.log('Done')
        console.log(data.responseJSON)
      }
    })
  }

  function getEvent () {
    var successBool = false
    var orderParam = {
      orderParam: 'name',
      orderMethod: 'DESC'
    }
    console.log(orderParam.order)
    $.ajax('/api/event/' + orderParam.orderParam + '/' + orderParam.orderMethod, {
      type: 'GET',
      data: orderParam,
      success: function (data, status, xhr) {
        successBool = true
      // console.log(xhr)
      },
      error: function (xhr, status, err) {
        console.log('failed')
      // console.log(xhr)
      },
      complete: function (data) {
        if (successBool) {
          console.log('Done')
          console.log(data.responseJSON)
        }
      }
    })
  }

  function getSport () {
    var successBool = false
    var orderParam = {
      orderParam: 'sport_type',
      orderMethod: 'DESC'
    }
    $.ajax('/api/sport/' + orderParam.orderParam + '/' + orderParam.orderMethod, {
      type: 'GET',
      data: orderParam,
      success: function (data, status, xhr) {
        successBool = true
      // console.log(xhr)
      },
      error: function (xhr, status, err) {
        console.log('failed')
      // console.log(xhr)
      },
      complete: function (data) {
        if (successBool) {
          console.log('Done')
          console.log(data.responseJSON)
        }
      }
    })
  }

  function notGoingEvent (obj) {
    $.ajax('/api/userEvent/' + obj.EventId, {
      type: 'DELETE',
      data: obj,
      success: function (data, status, xhr) {
        console.log('not going to event function')
        if (xhr.status == 200) {
          console.log('event removed from user event successfully!')
          sessionStorage.setItem('sessionNextPage', 'my event')
          location.reload()
        }else {
          console.log(xhr.responseJSON)
        }
      }
    })
  }

  function goingEvent (obj) {
    $.ajax('/api/userEvent/', {
      type: 'POST',
      data: obj,
      success: function (data, status, xhr) {
        console.log('going to event function')
        if (xhr.status == 200) {
          console.log('user set to attend event!!')
          sessionStorage.setItem('sessionNextPage', 'my event')
          location.reload()
        }else {
          console.log(xhr.responseJSON)
        }
      }
    })
  }
  function replacingSequelizeError (obj) {
    obj = 'Please fix the following error: ' + obj.replace(/Validation error:/g, '<br />')
    console.log(obj)
    return obj
  }
  /*   function SignUp (obj) {
      $.ajax('/api/user/', {
        type: 'POST',
        data: obj,
        success: function (data, status, xhr) {
          console.log('add User')
          if (xhr.responseJSON) {
            if (xhr.responseJSON.indexOf('Validation error') > -1) {
              // console.log(xhr.responseJSON)
              return replacingSequelizeError(xhr.responseJSON)
            }else {
              console.log('user added successfully')
            }
          }
        }
      })
    } */

  function updateProfile (obj) {
    $.ajax('/api/user/' + sessionStorage.getItem('sessionUserId'), {
      type: 'PUT',
      data: obj,
      success: function (data, status, xhr) {
        console.log('in updateProfile function')
        console.log(xhr)
        if (xhr.responseJSON) {
          if (xhr.responseJSON.indexOf('Please fix the following error: ') > -1) {
            return replacingSequelizeError(xhr.responseJSON)
          }else {
            console.log('user added successfully')
          }
        }
      }
    })
  }

  function addSport (obj) {
    $.ajax('/api/userSport/' + sessionStorage.getItem('sessionUserId'), {
      type: 'POST',
      data: obj,
      success: function (data, status, xhr) {
        console.log('add sport function')
        if (xhr.status == 200) {
          console.log('user sport added successfully')
        }else {
          console.log(xhr.responseJSON)
        }
      }
    }
    )
  }

  function editSport (obj) {
    console.log('sport level' + obj.level)
    console.log('sport sport id' + obj.SportId)
    if (obj.level == 0) {
      console.log('deleting user sport')
      $.ajax('/api/userSport/' + obj.SportId, {
        type: 'DELETE',
        data: obj,
        success: function (data, status, xhr) {
          console.log('deleting user sport')
          console.log(xhr)
          if (xhr.status == 200) {
            console.log('sport deleted from user successfully!')
          // location.reload()
          }else {
            console.log(xhr.responseJSON)
          }
        }
      })
    }else {
      console.log('editing user sport')
      $.ajax('/api/userSport/' , {
        type: 'PUT',
        data: obj,
        success: function (data, status, xhr) {
          console.log('in edit sport function')
          console.log(xhr)
          if (xhr.status == 200) {
            console.log('user sport edit successfully')
            sessionStorage.setItem('sessionMsgCenter', 'Sports added/removed successfully! Check out event page for upcoming events!')
            sessionStorage.setItem('sessionNextPage', 'my event')
            location.reload()
          }else {
            console.log(xhr.responseJSON)
          }
        // console.log(xhr.responseJSON.error)
        }
      })
    }
  }
  function setWebSession (pageModal) {
    sessionStorage.removeItem('sessionNextPage')
    sessionStorage.setItem('sessionNextPage', pageModal.trim())
  }
  function setUserSession (data) {
    sessionStorage.setItem('sessionUserId', (data.id))
    sessionStorage.setItem('sessionUserFullName', (data.first_name + ' ' + data.last_name))
    sessionStorage.setItem('sessionGender', (data.gender))
    sessionStorage.setItem('sessionUserName', (data.username))
    sessionStorage.setItem('sessionEmail', (data.email))
    sessionStorage.setItem('sessionCity', (data.city))
    sessionStorage.setItem('sessionState', (data.state))
    sessionStorage.setItem('sessionHometown', (data.hometown))
    sessionStorage.setItem('sessionDOB', (data.dob))
    sessionStorage.setItem('sessionPhoto', (data.photo))
    sessionStorage.setItem('sessionBio', (data.bio))
    console.log(sessionStorage)
  }

  function clearSession () {
    console.log('clear user session')
    sessionStorage.clear()
  }

  var inputs = $('.txtLevel')

  $('#cmdChangeLevel').click(function () {
    try {
      var objUserSport = []
      $('.slider.currentUser').each(function () {
        if ($(this).attr('data-slider-value') !== $(this).attr('data-value')) {
          objUserSport.push({
            SportId: $(this).attr('data-id'),
            level: parseInt(this.value),
            UserId: sessionStorage.getItem('sessionUserId')
          })
        }
      })
      for (var i = 0; i < objUserSport.length; i++) {
        editSport(objUserSport[i])
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        // location.reload()
      }, 500)
    }
  })

  $('#cmdAddSports').click(function () {
    try {
      var objUserSport = []
      $('.newSportSlider').each(function () {
        if (parseInt(this.value) > 0) {
          objUserSport.push({
            SportId: $(this).attr('data-id'),
            level: parseInt(this.value),
            UserId: sessionStorage.getItem('sessionUserId')
          })
        }
      })
      console.log(objUserSport)
      for (var i = 0; i < objUserSport.length; i++) {
        addSport(objUserSport[i])
      }
    } catch(e) {
      console.log(e)
    } finally {
      sessionStorage.setItem('sessionMsgCenter', 'Sports added/removed successfully! Check out event page for upcoming events!')
      sessionStorage.setItem('sessionNextPage', 'my event')
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  })

  $('.cmdCancel').click(function () {
    var objUserEvent = {
      UserId: sessionStorage.getItem('sessionUserId'),
      EventId: $(this).attr('data-event-id')
    }

    console.log($(this).attr('data-event-id'))
    try {
      notGoingEvent(objUserEvent)
    } catch(e) {
      console.log(e)
    }finally {
      sessionStorage.setItem('sessionMsgCenter', 'You have remove yourselves from an event.')
      sessionStorage.setItem('sessionNextPage', 'my event')
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  })

  $('.cmdGoing').click(function () {
    console.log($(this).attr('data-event-id'))
    try {
      var objUserEvent = {
        UserId: sessionStorage.getItem('sessionUserId'),
        EventId: $(this).attr('data-event-id')
      }
      goingEvent(objUserEvent)
    } catch(e) {
      console.log(e)
    }finally {
      sessionStorage.setItem('sessionMsgCenter', 'You have sign up for an event!')
      sessionStorage.setItem('sessionNextPage', 'my event')
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  })

  $('#cmdSignUp').click(function () {
    // more validation
    setWebSession('user profile')
    try {
      var objSignUp = {
        username: $('.txtUserName').val(),
        email: $('.txtEmail').val(),
        password: $('.txtPassword').val(),
        first_name: $('.txtFirstName').val(),
        last_name: $('.txtLastName').val(),
        gender: document.querySelector('input[name="gender"]:checked').value,
        location: $('.txtLocation').val(),
        hometown: $('.txtHometown').val(),
        dob: $('.dpDob').val(),
        photo: $('.txtPhoto').val(),
        bio: $('.taBio').val()
      }

      $.ajax('/api/user/', {
        type: 'POST',
        data: objSignUp,
        success: function (data, status, xhr) {
          console.log('add User')
          if (xhr.responseJSON) {
            if (xhr.responseJSON.indexOf('Validation error') > -1) {
              // console.log(xhr.responseJSON)
              console.log('Thorwing error')
              $('#msg-center').addClass('alert-danger')
              $('#msg-center').show()
              $('#msg-center').html(replacingSequelizeError(xhr.responseJSON))
            }
          }else {
            sessionStorage.setItem('sessionMsgCenter', 'User profile created successfully, select some sports to get going!')
            $('#msg-center').empty()
            $('#msg-center').addClass('alert-success').removeClass('alert-danger')
            $('#msg-center').show()
            $('#msg-center').html('User profile created successfully')
            console.log('no error found, user added successfully')
            getUserCredentials(objSignUp.username, objSignUp.password)
          }
        }
      })
    } catch(e) {
      console.log('in catch')
      console.log(e)
    }
  })

  $('#cmdSaveChanges').click(function () {
    try {
      var objUpdate = {
        first_name: $('#txtFirstName').val(),
        last_name: $('#txtLastName').val(),
        city: $('#txtLocationCity').val(),
        state: $('#txtLocationState').val(),
        email: $('#txtCurrentEmail').val(),
        photo: $('#txtUserImage').val(),
        bio: $('#txtUserBio').val()
      }
      $.ajax('/api/user/' + sessionStorage.getItem('sessionUserId'), {
        type: 'PUT',
        data: objUpdate,
        success: function (data, status, xhr) {
          console.log('in updateProfile function')
          console.log(xhr)
          if (xhr.responseJSON) {
            if (xhr.responseJSON.indexOf('Validation error') > -1) {
              console.log(xhr.responseJSON)
              console.log('Thorwing error')
              replacingSequelizeError(xhr.responseJSON)
            }
          }else {
            console.log('no error found, user profile updated successfully')
            setTimeout(() => {
              console.log('proceed with page reload')
              sessionStorage.setItem('sessionMsgCenter', 'Profile updated successfully!')
              location.reload()
            }, 500)
          }
        }
      })
    } catch(e) {
      console.log('in update profile catch')
      console.log(e)
    }
  // console.log(objUpdate)
  })
  $('.cmdEditDetails').click(function () {
    console.log('set session to remember event id to edit')
    setWebSession('create event')
    location.reload()

    sessionStorage.setItem('sessionEventId', $(this).attr('data-event-id'))
  })
  $('.cmdRemoveEvent').click(function () {
    var objEvent = {
      eventId: $(this).attr('data-event-id')
    }
    console.log($(this).attr('data-event-id'))
    $.ajax('/api/event/' + $(this).attr('data-event-id'), {
      type: 'DELETE',
      data: objEvent,
      success: function (data, status, xhr) {
        console.log(xhr)
        if (xhr.status == 200) {
          console.log('event deleted successfully!')
          sessionStorage.removeItem('sesionNextPage')
          sessionStorage.setItem('sessionNextPage', 'create event')
          location.reload()
        }else {
          console.log('event delete failed')
        }
      }
    })
  })
  $('#cmdEditEvent').click(function () {
    try {
      var objEditEvent = {
        name: $('#txtcreateEventName').val().trim(),
        location: $('#txtLocation').val().trim(),
        attendants: $('#txtTotalPlayers').val().trim(),
        fees: $('#txtFees').val().trim(),
        host: $('#txtHostedBy').val().trim(),
        phone_contact: $('#txtContactNumber').val().trim(),
        email_contact: $('#txtEmailAddress').val().trim(),
        gender: document.querySelector('input[name="gender"]:checked').value,
        level: $('#txtLevel').val().trim(),
        age: $('#txtAge').val().trim(),
        start_time: moment($('#txtStartsAtDate').val() + ' ' + $('#txtStartAtTime').val()).format(),
        end_time: moment($('#txtEndsAtDate').val() + ' ' + $('#txtEndsAtTime').val()).format(),
        sport_id: $('.ddl-sports').chosen().val(),
        geolocation_x: '',
        geolocation_y: '',
        details: $('#txtEventDetails').val().trim()
      }
      console.log(sessionStorage.getItem('sessionuserId'))
      console.log(objEditEvent)
      console.log('event id in session' + sessionStorage.getItem('SessionEventId'))
      $.ajax('/api/event/' + sessionStorage.getItem('sessionEventId'), {
        type: 'PUT',
        data: objEditEvent,
        success: function (data, status, xhr) {
          console.log(xhr)
          if (xhr.status == 200) {
            console.log('edit successfully')
            sessionStorage.removeItem('sessionEventId')
            sessionStorage.setItem('sessionNextPage', 'create event')
            sessionStorage.setItem('sessionMsgCenter', 'Event edited successfully')
            window.location.href = '/event/' + sessionStorage.getItem('sessionUserId')
          }else {
            console.log('something wrong')
          }
        }
      })
    } catch(err) {
      console.log('in edit event function')
      console.log(e)
    }
  })
  $('#cmdCreateEvent').click(function () {
    try {
      var objNewEvent = {
        name: $('#txtcreateEventName').val().trim(),
        location: $('#txtLocation').val().trim(),
        attendants: $('#txtTotalPlayers').val().trim(),
        fees: $('#txtFees').val().trim(),
        host: $('#txtHostedBy').val().trim(),
        phone_contact: $('#txtContactNumber').val().trim(),
        email_contact: $('#txtEmailAddress').val().trim(),
        gender: document.querySelector('input[name="gender"]:checked').value,
        level: $('#txtLevel').val().trim(),
        age: $('#txtAge').val().trim(),
        start_time: moment($('#txtStartsAtDate').val() + ' ' + $('#txtStartAtTime').val()).format(),
        end_time: moment($('#txtEndsAtDate').val() + ' ' + $('#txtEndsAtTime').val()).format(),
        sport_id: $('.ddl-sports').chosen().val(),
        geolocation_x: '',
        geolocation_y: '',
        details: $('#txtEventDetails').val().trim()
      }
      console.log(sessionStorage.getItem('sessionUserId'))
      console.log(objNewEvent)
      $.ajax('/api/event/' + sessionStorage.getItem('sessionUserId'), {
        type: 'POST',
        data: objNewEvent,
        success: function (data, status, xhr) {
          console.log(' in create event function')
          console.log(xhr)
          if (xhr.responseJSON) {
            if ((xhr.responseJSON.indexOf('Validation error') > -1) || (xhr.responseJSON.indexOf('Incorrect') > -1)) {
              console.log(xhr.responseJSON)
              $('.alert.create-event').empty()
              $('.alert.create-event').html(replacingSequelizeError(xhr.responseJSON))
              $('.alert.create-event').addClass('alert-danger')
              $('.alert.create-event').show()
            }else {
              console.log('no error found, event created successfully')
              sessionStorage.setItem('sessionMsgCenter', 'Event created successfully!')
              sessionStorage.setItem('sessionNextPage', 'create event')
              setTimeout(() => {
                location.reload()
              }, 500)
            }
          }else {
            console.log('no error found, event created successfully')
            sessionStorage.setItem('sessionMsgCenter', 'Event created successfully!')
            sessionStorage.setItem('sessionNextPage', 'create event')
            setTimeout(() => {
              location.reload()
            }, 500)
          }
        }
      })
    } catch (e) {
      console.log('in create event function')
      console.log(e)
    }
  })

  /*   var map
    window.initMap = function () {
      // Create a map object and specify the DOM element for display.
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      })
    } */
  var marker1, marker2

  window.initMap = function () {
    var mapOptions = {
      center: new google.maps.LatLng(41.505493, -81.681290),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var input = $('#txtSearchLocation')

    var map = new google.maps.Map(document.getElementById('mapCanvas'),
      mapOptions)
    marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(41.505493, -81.681290)
    })
    marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(41.485493, -81.681290)
    })
    var userLocation = {
      currentLocation: {
        center: {lat: 41.505493, lng: -81.681290},
        population: 2000
      }
    }

    console.log(userLocation.currentLocation.center)
    marker1.setMap(map)
    marker2.setMap(map)
    var circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: userLocation.currentLocation.center,
      radius: 5000
    })
  }
})
