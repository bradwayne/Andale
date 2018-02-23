$(function () {
  /*-----------------application initialization-----------------
    - Create sliders
    - Since everything is built in modal, we have to trigger what page to open what modal.
    - beautify date time
  -----------------------------------------------------------------*/
  $('.msg-center').hide()
  $('.create-event').hide()
  $('.ddl-sports').chosen({
    width: '100%'
  })

  $('.slider').slider({
    precision: 2
  })
  $('.newSportSlider').slider({
    precision: 2,
    value: 0
  })
  $('i.time').each(function () {
    $(this).text(moment($(this).text()).format('YYYY-MM-DD hh:mm a'))
  })
  let inputs = $('.txtLevel')
  let states = ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']
  for (let i = 0; i < states.length; i++) {
    let stateOption = $('<option>')
    stateOption.addClass('ddlStates')
    stateOption.val(states[i])
    stateOption.text(states[i])
    $('.ddl-states').append(stateOption)
  }
  $('.ddl-states').chosen({
    width: '100%'
  })
  /*
  Session tracking
  several sessionNextPage to keep track of - login, details, create event, sign up, all events
  */

  if (sessionStorage.getItem('sessionNextPage') === 'sign up') {
    if (window.location.href.indexOf('/user') > -1) {
      $('.sport-section').hide()
      $('.other-sport-section').hide()
      $('#signUp').modal()
      sessionStorage.removeItem('sessionNextPage')
    }
  }
  if (sessionStorage.getItem('sessionNextPage') == 'login') {
    $('#logIn').modal()
    sessionStorage.removeItem('sessionNextPage')
  } else if (sessionStorage.getItem('sessionNextPage') == 'details') {
    $('#activity').modal()
    sessionStorage.removeItem('sessionNextPage')
  }

  if (window.location.href.indexOf('/event_details') > -1) {
    if (sessionStorage.getItem('sessionMsgCenter')) {
      $('.msg-center').html(sessionStorage.getItem('sessionMsgCenter'))
      $('.msg-center').show()
      $('.msg-center').addClass('alert-success').removeClass('alert-danger')
      sessionStorage.removeItem('sessionMsgCenter')
    }
    $('.post-delete-footer').each(function () {
      if ($(this).attr('data-user-id') == sessionStorage.getItem('sessionUserId')) {
        $(this).show()
      } else {
        $(this).hide()
      }
    })

    $('.cmdBoot').each(function () {
      if ($(this).attr('data-host-id') == sessionStorage.getItem('sessionUserId')) {
        $(this).show()
      } else {
        $(this).hide()
      }
    })
    $('#activity').modal()
  } else if (window.location.href.indexOf('/event') > -1) {
    if (sessionStorage.getItem('sessionMsgCenter')) {
      $('.msg-center').html(sessionStorage.getItem('sessionMsgCenter'))
      $('.msg-center').show()
      $('.msg-center').addClass('alert-success').removeClass('alert-danger')
    }
    if (!sessionStorage.getItem('sessionUserId')) {
      $('.myEvents').hide()
    } else {
      $('.myEvents').show()
    }
    if (sessionStorage.getItem('sessionNextPage') === 'my event') {
      $('#myInterests').modal()
      sessionStorage.removeItem('sessionNextPage')
    } else if (sessionStorage.getItem('sessionNextPage') === 'all event') {
      $('#allEvents').modal()
    } else if (sessionStorage.getItem('sessionNextPage') === 'create event') {
      $('#createEvent').modal()
      if (sessionStorage.getItem('sessionMsgCenter')) {
        $('.create-event').show()
        $('.create-event').addClass('alert-success').removeClass('alert-danger')
        $('.create-event').html(sessionStorage.getItem('sessionMsgCenter'))
      }
    }
    sessionStorage.removeItem('sessionNextPage')
    sessionStorage.removeItem('sessionMsgCenter')
  } else if (window.location.href.indexOf('/user/') > -1) {
    if (sessionStorage.getItem('sessionMsgCenter')) {
      $('.msg-center').html(sessionStorage.getItem('sessionMsgCenter'))
      $('.msg-center').show()
      $('.msg-center').addClass('alert-success').removeClass('alert-danger')

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
      } else {
        $('#signUp :input').addClass('newUser')
      }

      let sliderValue = $('#slider')
      $('.slider.currentUser').each(function () {
        console.log($(this).attr('data-slider-value'))
        let value = $(this).attr('data-slider-value')
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
  } else {
    $('#aSignUpNav').hide()
    $('#aSignUpBtn').show()
    $('#aLogInNav').hide()
    $('#aLogOutNav').show()
    $('.createEvents').show()
    $('.profile-username').text(sessionStorage.getItem('sessionUserName').toUpperCase() + "'s")
    $('#aSignUpBtn').attr('href', '/user/' + sessionStorage.getItem('sessionUserId'))
  }

  /* ----------------SESSION TRACKING --------------------
  End of Session tracking
    several sessionNextPage to keep track of - login, details, create event, sign up, all events
  -------------------------------------------------------*/

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

  $('#aLogInNav').click(function () {
    // if url contains '/user' and '/event', take user to homepage where sign in modal sits in and set a session to pop up login modal on page load
    if ((window.location.href.indexOf('/user') > -1) || (window.location.href.indexOf('/event') > -1)) {
      setWebSession('login')
      window.location.href = '/'
    // otherwise pop up login modal
    } else {
      $('#logIn').modal()
      sessionStorage.removeItem('sessionNextPage')
    }
  })

  $('#hypSignUpBtn').click(function () {
    console.log('here')
    setWebSession('sign up')
    window.location.href = '/user'
  // $('#signUp').modal()
  })

  $('#hypSignUp').click(function () {
    console.log('here')
    setWebSession('sign up')
    window.location.href = '/user'
  // $('#signUp').modal()
  })

  $('#aEventNav').click(function () {
    console.log('going to event page')
    if (sessionStorage.getItem('sessionUserId')) {
      window.location.href = '/event/' + sessionStorage.getItem('sessionUserId')
    } else {
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

  $('#aSignUpNav').click(function () {
    setWebSession('sign up')
    window.location.href = '/user'
  })

  $('#aLogOutNav').click(function () {
    console.log('user logged out successfully, clear session items')
    $('#aSignUpBtn').hide()
    clearSession()
    window.location.href = '/'
  })

  $('#cmdsubmitLogin').click(function () {
    let username = $('#txtLoginUserName').val()
    let password = $('#pwdLoginPwd').val()
    console.log(username, password)
    setWebSession('my event')
    getUserCredentials(username, password)
  })

  let getUserCredentials = function (username, password) {
    let successBool = false
    let credentials = {
      username: username,
      password: password
    }
    console.log(credentials)
    $.ajax('/api/getUser/' + credentials.username + '/' + credentials.password, {
      type: 'GET',
      data: credentials
    })
      .then(function (result) {
        console.log(result)
        if (result.error == 'User not found!') {
          console.log('User either enter wrong username or password')
          $('.msg-center').show()
          $('.msg-center').addClass('alert-danger')
          $('.msg-center').text('Invalid username or password!')
          successBool = false
        } else {
          console.log('here')
          let userInfo = result.rows[0]
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
            } else {
              window.location = '/'
            }
          // location.reload()
          }, 500)
        }
      })
  }

  $('#cmdChangeLevel').click(function () {
    try {
      let objUserSport = []
      $('.slider.currentUser').each(function () {
        if ($(this).attr('data-slider-value') !== $(this).attr('data-value')) {
          objUserSport.push({
            SportId: $(this).attr('data-id'),
            level: parseInt(this.value),
            UserId: sessionStorage.getItem('sessionUserId')
          })
        }
      })
      for (let i = 0; i < objUserSport.length; i++) {
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
      let objUserSport = []
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
      for (let i = 0; i < objUserSport.length; i++) {
        addSport(objUserSport[i])
      }
    } catch (e) {
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
    let objUserEvent = {
      UserId: sessionStorage.getItem('sessionUserId'),
      EventId: $(this).attr('data-event-id')
    }

    console.log($(this).attr('data-event-id'))
    try {
      notGoingEvent(objUserEvent)
    } catch (e) {
      console.log(e)
    } finally {
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
      let objUserEvent = {
        UserId: sessionStorage.getItem('sessionUserId'),
        EventId: $(this).attr('data-event-id')
      }
      goingEvent(objUserEvent)
    } catch (e) {
      console.log(e)
    } finally {
      sessionStorage.setItem('sessionMsgCenter', 'You have sign up for an event!')
      sessionStorage.setItem('sessionNextPage', 'my event')
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  })
  function validateName (name) {
    let arrError = []
    if (name) {
      if (name.length < 1) {
        arrError.push('Name cannot be empty.')
      }else if (name.length >= 255) {
        arrError.push('Name cannot be more than 255 characters')
      }
    }else {
      arrError.push('Name cannot be empty.')
    }
    console.log(arrError)
    return arrError
  }
  function validateGender (gender) {
    let arrError = []
    console.log(gender)
    if (!gender) {
      arrError.push('Gender cannot be empty')
    }
    if (gender !== 'male') {
      if (gender !== 'female') {
        if (gender !== 'unspecific') {
          arrError.push("Gender must be 'male, 'female' or 'unspecific'")
        }
      }
    }
    return arrError
  }
  function validateDate (start, end, starttime, endtime) {
    let arrError = []
    if (!start || !end || !starttime || !endtime) {
      arrError.push('Date/time cannot be empty')
    }else if (!moment(start).isValid() || !moment(starttime).isValid()) {
      arrError.push('Invalid start date/time')
    }
    if (!moment(end).isValid() || !moment(endtime).isValid()) {
      arrError.push('Invalid end date/time')
    }
    if (moment(end).isBefore(moment(start))) {
      arrError.push('End date cannot be earlier than start date')
    }
    if (moment(start) == moment(end)) {
      if (moment(endtime).isBefore(moment(starttime))) {
        arrError.push('End time cannot be earlier than start time')
      }
    }

    return arrError
  }
  function validateOneDate (date) {
    let arrError = []
    if (!date) {
      arrError.push('Date cannot be empty')
    }
    if (!moment(date).isValid()) {
      arrError.push('Date is not in in a correct format')
    }
    return arrError
  }
  function validateInteger (number) {
    let arrError = []
    if (!Number.isInteger(number)) {
      arrError.push('Data entered is not an integer')
    }
    return arrError
  }
  function validateDecimal (number) {
    let arrError = []
    if (!number) {
      arrError.push('Field cannot be empty')
    }
    if (isNaN(number)) {
      arrError.push('Data entered is not a number')
    }
    return arrError
  }
  function validatePassword (password) {
    let arrError = []
    if (password.search(/^(?=.*[A-Z])(?=.*\\d)[A-Z0-9]{6,}$/i)) {
      arrError.push('Password does not meet the requirement')
    }
    return arrError
  }
  function validateState (state) {
    let arrError = []
    if ($.inArray(state, states) == -1) {
      arrError.push('Invalid state found')
    }
    return arrError
  }

  $('#cmdSignUp').click(function () {
    // more validation
    setWebSession('user profile')
    let objSignUp = {
      username: $('.txtUserName').val(),
      email: $('.txtEmail').val(),
      password: $('.txtPassword').val(),
      first_name: $('.txtFirstName').val(),
      last_name: $('.txtLastName').val(),
      gender: document.querySelector('input[name="gender"]:checked').value,
      city: $('.txtCityLocation').val(),
      state: $('.ddl-states').chosen().val(),
      hometown: $('.txtHometown').val(),
      dob: $('.dpDob').val(),
      photo: $('.txtPhoto').val(),
      bio: $('.taBio').val()
    }
    console.log(objSignUp.first_name)
    console.log(objSignUp.last_name)
    let arrError = []
    arrError = arrError.concat(validateName(objSignUp.first_name))
    arrError = arrError.concat(validateName(objSignUp.last_name))
    arrError = arrError.concat(validateGender(objSignUp.gender))
    arrError = arrError.concat(validateName(objSignUp.username))
    arrError = arrError.concat(validatePassword(objSignUp.password))
    arrError = arrError.concat(validateState(objSignUp.state))
    arrError = arrError.concat(validateOneDate(objSignUp.dob))
    console.log(arrError)
    arrError = cleanArray(arrError)
    console.log(arrError)

    if (arrError.length == 0) {
      try {
        $.ajax('/api/user/', {
          type: 'POST',
          data: objSignUp,
          success: function (data, status, xhr) {
            console.log('add User')
            if (xhr.responseJSON) {
              if (xhr.responseJSON.indexOf('Validation error') > -1) {
                // console.log(xhr.responseJSON)
                console.log('Thorwing error')
                $('.msg-center').addClass('alert-danger')
                $('.msg-center').show()
                $('.msg-center').html(replacingSequelizeError(xhr.responseJSON))
              }
            } else {
              sessionStorage.setItem('sessionMsgCenter', 'User profile created successfully, select some sports to get going!')
              $('.msg-center').empty()
              $('.msg-center').addClass('alert-success').removeClass('alert-danger')
              $('.msg-center').show()
              $('.msg-center').html('User profile created successfully')
              console.log('no error found, user added successfully')
              getUserCredentials(objSignUp.username, objSignUp.password)
            }
          }
        })
      } catch (e) {
        console.log('in catch')
        console.log(e)
      }
    }else {
      let errMsg = ''
      for (let i = 0; i < arrError.length; i++) {
        if (errMsg.indexOf(arrError[i]) == -1) {
          errMsg += arrError[i] + '<br />'
        }
      }
      $('.msg-center').addClass('alert-danger')
      $('.msg-center').show()
      $('.msg-center').html(errMsg)
    }
  })

  $('.cmdDeletePost').click(function () {
    try {
      console.log('here')
      let objMsg = {
        EventId: $('.eventDetailsOnMap').attr('data-id'),
        Id: $(this).attr('data-id'),
        UserId: sessionStorage.getItem('sessionUserId')
      }
      $.ajax('/api/eventdiscussions/' + $('.eventDetailsOnMap').attr('data-id') + '/' + sessionStorage.getItem('sessionUserId'), {
        type: 'DELETE',
        data: objMsg
      }).then(function (results) {
        console.log('after delete message')
        console.log(results)
        if (results) {
          sessionStorage.setItem('sessionMsgCenter', 'Message deleted successfully.')
          setWebSession('event detail')
          setTimeout(() => {
            location.reload()
          }, 500)
        } else {
          throw (results)
        }
      })
    } catch (e) {
      console.log(e)
    }
  })
  $('#cmdPostMsg').click(function () {
    if ($('#txtEventBlog').val()) {
      try {
        let objMsg = {
          EventId: $('.eventDetailsOnMap').attr('data-id'),
          message: $('#txtEventBlog').val(),
          UserId: sessionStorage.getItem('sessionUserId')
        }
        $.ajax('/api/eventdiscussions/' + $('.eventDetailsOnMap').attr('data-id'), {
          type: 'POST',
          data: objMsg
        }).then(function (results) {
          console.log('after post message')
          console.log(results)
          if (results) {
            sessionStorage.setItem('sessionMsgCenter', 'post submitted successfully!')
            setWebSession('event detail')
            setTimeout(() => {
              location.reload()
            }, 500)
          } else {
            throw (results)
          }
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      $('.msg-center').show()
      $('.msg-center').addClass('alert-danger')
      $('.msg-center').html('Message cannot be empty')
    }
  })

  $('#cmdSaveChanges').click(function () {
    try {
      let objUpdate = {
        first_name: $('#txtFirstName').val(),
        last_name: $('#txtLastName').val(),
        city: $('#txtLocationCity').val(),
        state: $('.ddl-states').chosen().val(),
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
          } else {
            console.log('no error found, user profile updated successfully')
            setTimeout(() => {
              console.log('proceed with page reload')
              sessionStorage.setItem('sessionMsgCenter', 'Profile updated successfully!')
              location.reload()
            }, 500)
          }
        }
      })
    } catch (e) {
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
    let objEvent = {
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
        } else {
          console.log('event delete failed')
        }
      }
    })
  })
  $('.cmdBoot').click(function () {
    let objBoot = {
      UserId: $(this).attr('data-user-id'),
      EventId: $(this).attr('data-event-id')
    }
    try {
      notGoingEvent(objBoot)
    } catch (e) {
      console.log(e)
    } finally {
      sessionStorage.setItem('sessionMsgCenter', 'You have remove yourselves from an event.')
      sessionStorage.setItem('sessionNextPage', 'my event')
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  })
  $('#cmdEditEvent').click(function () {
    let arrError = []
    let objEditEvent = {
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
      sd: moment($('#txtStartsAtDate').val()),
      ed: moment($('#txtEndsAtDate').val()),
      st: moment($('#txtStartAtTime').val()).format(),
      et: moment($('#txtEndsAtTime').val()).format(),
      sport_id: $('.ddl-sports').chosen().val(),
      geolocation_x: '',
      geolocation_y: '',
      details: $('#txtEventDetails').val().trim()
    }
    /* let o = objEditEvent
    arrError = [
        ...[o.name, o.location, o.host].map(prop => validateName(prop)),
        validateGender(o.gender),
        ...[o.attendants, o.phone_contact, o.level, o.age].map(prop => validateInteger(prop)),
        validateState(o.state),
        validateDecimal(o.fees),
        validateDate(objEditEvent.sd, objEditEvent.ed, objEditEvent.st, objEditEvent.et)
    ]; */
    // arrError = arrError.concat(validateName(objEditEvent.name))
    // arrError = arrError.concat(validateName(objEditEvent.location))
    // arrError = arrError.concat(validateGender(objEditEvent.gender))
    // arrError = arrError.concat(validateName(objEditEvent.host))
    // arrError = arrError.concat(validateInteger(objEditEvent.attendants))
    // arrError = arrError.concat(validateInteger(objEditEvent.phone_contact))
    // arrError = arrError.concat(validateInteger(objEditEvent.level))
    // arrError = arrError.concat(validateInteger(objEditEvent.age))
    // arrError = arrError.concat(validateDecimal(objEditEvent.fees))
    // arrError = arrError.concat(validateState(objEditEvent.state))
    // arrError = arrError.concat(validateDate(objEditEvent.sd, objEditEvent.ed, objEditEvent.st, objEditEvent.et))
    /* console.log(arrError)
    arrError = cleanArray(arrError)
    console.log(arrError); */

    if (arrError.length == 0) {
      try {
        console.log(sessionStorage.getItem('sessionuserId'))
        console.log(objEditEvent)
        console.log('event id in session' + sessionStorage.getItem('SessionEventId'))
        $.ajax('/api/event/' + sessionStorage.getItem('sessionEventId'), {
          type: 'PUT',
          data: objEditEvent,
          success: function (data, status, xhr) {
            console.log(xhr)
            if (status == 200) {
              console.log('edit successfully')
              sessionStorage.removeItem('sessionEventId')
              sessionStorage.setItem('sessionNextPage', 'create event')
              sessionStorage.setItem('sessionMsgCenter', 'Event edited successfully')
              window.location.href = '/event/' + sessionStorage.getItem('sessionUserId')
            } else {
              console.log('something wrong')
            }
          }
        })
      } catch (err) {
        console.log('in edit event function')
        console.log(err)
      }
    }else {
      console.log('edit event error')
      let errMsg = ''
      for (let i = 0; i < arrError.length; i++) {
        console.log(arrError[i])
        if (errMsg.indexOf(arrError[i]) == -1) {
          errMsg += arrError[i] + '<br />'
        }
      }
      console.log(errMsg)
      $('.msg-center').addClass('alert-danger')
      $('.msg-center').show()
      $('.msg-center').html(errMsg)
    }
  })
  $('#cmdCreateEvent').click(function () {
    try {
      let objNewEvent = {
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
            } else {
              console.log('no error found, event created successfully')
              sessionStorage.setItem('sessionMsgCenter', 'Event created successfully!')
              sessionStorage.setItem('sessionNextPage', 'create event')
              setTimeout(() => {
                location.reload()
              }, 500)
            }
          } else {
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

  function createNewUser () {
    let credentials = {
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
        } else {
          console.log('user created successfully')
        }
      // console.log(xhr.responseJSON.error)
      },
      complete: function (data) {
        console.log('Done')
        console.log(data.responseJSON)
      }
    })
  }

  function getEvent () {
    let successBool = false
    let orderParam = {
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
    let successBool = false
    let orderParam = {
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
        } else {
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
        } else {
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
          } else {
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
        } else {
          console.log(xhr.responseJSON)
        }
      }
    })
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
            location.reload()
          } else {
            console.log(xhr.responseJSON)
          }
        }
      })
    } else {
      console.log('editing user sport')
      $.ajax('/api/userSport/', {
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
          } else {
            console.log(xhr.responseJSON)
          }
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
    sessionStorage.clear()
  }

  function cleanArray (actual) {
    let newArray = [ ]
      for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i])
        }
      }
      return newArray
    }
    // ////////////////////////////////////////////

    // Google Map API Related

    // /////////////////////////////////////////////

    let map
    let infoWindow = null
    let eventWindow = null

    let allEvents = function (eventName, eventLocation, eventPhone, placeId, lat, lng, address) {
      this.eventName = eventName
      this.eventLocation = eventLocation
      this.eventPhone = eventPhone
      this.eventPlaceId = placeId
      this.eventLat = lat
      this.eventLng = lng
      this.eventAddress = address
    }

    let arrAddressCoordinate = []

    $('.eventDetailsOnMap').each(function () {
      let event = new allEvents(
        $(this).attr('data-name'),
        $(this).attr('data-location'),
        $(this).attr('data-phone')
      )
      arrAddressCoordinate.push(event)
    })

    function getGeoLocation (address) {
      $.ajax('https://maps.googleapis.com/maps/api/geocode/json?address=' + address.eventLocation + '&key=AIzaSyAsoBvfyTjb2cv09tBpnkZxhRF6MTKIgOM', {
        type: 'GET'
      }).then(function (data) {
        let objadddressCoordinate = {}
        if (data.status == 'OK') {
          address.eventPlaceId = data.results[0].place_id
          address.eventLat = data.results[0].geometry.location.lat
          address.eventLng = data.results[0].geometry.location.lng
          address.eventAddress = data.results[0].formatted_address
        } else {
          console.log('something wrong with your address')
        }
      })
    }
    for (let i = 0; i < arrAddressCoordinate.length; i++) {
      getGeoLocation(arrAddressCoordinate[i])
    }

    window.initMap = function () {
      let mapOptions = {
        center: new google.maps.LatLng(41.505493, -81.681290),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      let map = new google.maps.Map(document.getElementById('mapCanvas'),
        mapOptions)

      infoWindow = new google.maps.InfoWindow()
      eventWindow = new google.maps.InfoWindow()
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let pos
          if (window.location.href.indexOf('/event_details') > -1) {
            pos = {
              lat: arrAddressCoordinate[0].eventLat,
              lng: arrAddressCoordinate[0].eventLng
            }
          } else {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }

          map.setCenter(pos)
          let marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          })
          if (window.location.href.indexOf('/event_details') == -1) {
            let circle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: map,
              center: pos,
              radius: 8050
            })
          }
          if (window.location.href.indexOf('/event_details') == -1) {
            for (let thingy of arrAddressCoordinate) {
              let pos = {
                lat: thingy.eventLat,
                lng: thingy.eventLng
              }
              let eventWindow = new google.maps.InfoWindow({
                content: `
<div> 
  Event : ${thingy.eventName}
</div>
<div>
  Phone : ${thingy.eventPhone}
</div>
<div>
  Address : ${thingy.eventAddress}
</div>
`
              })

              let marker = new google.maps.Marker({
                position: pos,
                map,
                title: thingy.eventAddress
              })

              marker.addListener('click', function () {
                eventWindow.open(map, this)
              })
            }
          }
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter())
        })
      } else {
        handleLocationError(false, infoWindow, map.getCenter())
      }
    }

    function handleLocationError (browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos)
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        "Error: Your browser doesn't support geolocation.")
      infoWindow.open(map)
    }

    // ////////////////////////////////////////////

    // WEATHER API!!

    // /////////////////////////////////////////////
    setTimeout(() => {
      let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + arrAddressCoordinate[0].eventLat + '&lon=' + arrAddressCoordinate[0].eventLng + '&mode=json&appid=29ac769a18c2d2cd2cf53ab49109f23b'

      $.ajax({
        url: queryURL,
        method: 'GET'
      })

        .done(function (response) {
          // response from weather api.
          let arrWeather = []

          for (let i = 0; i < response.list.length; i++) {
            let objWeather = {
              temp: '',
              weather: '',
              date: ''
            }
            objWeather.temp = 9 / 5 * (response.list[i].main.temp - 273) + 32
            objWeather.weather = response.list[i].weather[0].main
            objWeather.date = response.list[i].dt_txt
            arrWeather.push(objWeather)
          }
          $('.wlc').html(arrAddressCoordinate[0].eventAddress)
          $('.day3').html(moment(response.list[20].dt_txt).format('MMM D'))
          $('.day4').html(moment(response.list[28].dt_txt).format('MMM D'))
          $('.day5').html(moment(response.list[36].dt_txt).format('MMM D'))
          $('.fc1').html(Math.round(arrWeather[4].temp) + '°F')
          $('.fc2').html(Math.round(arrWeather[12].temp) + '°F')
          $('.fc3').html(Math.round(arrWeather[20].temp) + '°F')
          $('.fc4').html(Math.round(arrWeather[28].temp) + '°F')
          $('.fc5').html(Math.round(arrWeather[36].temp) + '°F')
          $('.w1').html(arrWeather[4].weather)
          $('.w2').html(arrWeather[12].weather)
          $('.w3').html(arrWeather[20].weather)
          $('.w4').html(arrWeather[28].weather)
          $('.w5').html(arrWeather[36].weather)

          $('#weather1').text("Today's Forecast for: " + Math.round(arrWeather[4].temp) + '°F')
          $('#weather2').text("Tomorrow's Forecast: " + Math.round(arrWeather[12].temp) + '°F')
          $('#weather3').text('Forecast for ' + response.list[20].dt_txt + ': ' + Math.round(arrWeather[20].temp) + '°F')
          $('#weather4').text('Forecast for: ' + response.list[28].dt_txt + ': ' + Math.round(arrWeather[28].temp) + '°F')
          $('#weather5').text('Forecast for: ' + response.list[28].dt_txt + ': ' + Math.round(arrWeather[36].temp) + '°F')
        })
    }, 1000)
  })
