$(function () {
  $('#aLogInNav').click(function () {
    $('#logIn').modal()
  })
  $('#cmdsubmitMyEventsBtn').click(function () {
    $('#myEvents').modal()
  })
  $('#cmdsubmitAllEventsBtn').click(function () {
    $('#allEvents').modal()
  })
  $('#cmdsubmitEventsNearBtn').click(function () {
    $('#eventNear').modal()
  })

  $('#hypSignUpBtn').click(function () {
    console.log('here')
    setWebSession('sign up')
    window.location.href = '/user'
  // $('#signUp').modal()
  })
  if (window.location.href.indexOf('/user/') > -1) {
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
       $('.slider').slider({
        precision: 2,
      }) 
      $('.newSportSlider').slider({
        precision: 2,
        value: 0
      }) 
      
      // for(var i =0; i < sliderValue.length; i++){
      //    console.log("here")
      //    console.log(sliderValue[i])
      // $('.slider.currentUser[data-value*='+sliderValue[i]+ ']').attr("data-value", sliderValue[i])
      // }

      console.log('remove session in user redirect')
      sessionStorage.removeItem('sessionNextPage')
    }
  }

  $('#aLogInNav').click(function () {})
  if (!sessionStorage.getItem('sessionUserId')) {
    console.log('user is not log in, hide user profile')
    $('#aSignUpBtn').hide()
  }else {
    $('#aSignUpBtn').show()
    $('.profile-username').text(sessionStorage.getItem('sessionUserName').toUpperCase() + "'s")
    $('#aSignUpBtn').attr('href', '/user/' + sessionStorage.getItem('sessionUserId'))
  }

  if (sessionStorage.getItem('sessionNextPage') === 'sign up') {
    console.log('sign up session here')
    if (window.location.href.indexOf('/user') > -1) {
      $('#signUp').modal()
      sessionStorage.removeItem('sessionNextPage')
    }
  }
  if (window.location.href.indexOf('/event/') > -1) {
    console.log('here')
    console.log(sessionStorage.getItem('sessionNextPage'))
    if (sessionStorage.getItem('sessionNextPage') === 'my event') {
      console.log('here')

      console.log('in event page')
      console.log('something pop up')
      $('#myEvents').modal()
      sessionStorage.removeItem('sessionNextPage')
    }
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
    getUserCredentials(username, password)
    setTimeout(() => {
      setWebSession('my event')
      window.location.href = '/event/' + sessionStorage.getItem('sessionUserId')
    }, 5000)
  })

  function getUserCredentials (username, password) {
    var successBool = false
    var credentials = {
      username: username,
      password: password
    }
    console.log(credentials)
    $.ajax('/api/getUser/' + credentials.username + '/' + credentials.password , {
      type: 'GET',
      data: credentials,
      success: function (data, status, xhr) {
        console.log('success')
        successBool = true
        console.log(status)
        console.log(xhr.responseJSON.error)
        if (xhr.responseJSON.error == 'User not found!') {
          console.log('User either enter wrong username or password')
        }else {
          // setUserSession(xhr.re)
          var userInfo = xhr.responseJSON.rows[0]
          console.log(xhr.responseJSON)
          console.log(xhr.responseJSON.rows[0])
          setUserSession(userInfo)
        }
      }
    })
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
        }else {
          console.log(xhr.responseJSON)
        }
      }
    })
  }
  function replacingSequelizeError (obj) {
    obj = 'Validation error' + obj.replace(/Validation error:/g, '')
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
          if (xhr.responseJSON.indexOf('Validation error') > -1) {
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
          // location.reload()
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
    sessionStorage.setItem('sessionLocation', (data.location))
    sessionStorage.setItem('sessionHometown', (data.hometown))
    sessionStorage.setItem('sessionDOB', (data.dob))
    sessionStorage.setItem('sessionPhoto', (data.photo))
    sessionStorage.setItem('sessionBio', (data.bio))
    console.log(sessionStorage)

  // NOTE: to get sessionItem. 
  // console.log('id :' + sessionStorage.getItem('sessionUserId'))
  }
  function clearSession () {
    console.log('clear user session')
    sessionStorage.clear()
  }

  var inputs = $('.txtLevel')

  // createNewUser()
  // getEvent()
  // getUserCredentials()

  $('#cmdChangeLevel').click(function () {
    try {
      var objUserSport = []
      $('.txtLevel').each(function () {
        objUserSport.push({
          SportId: $(this).attr('data-id'),
          level: parseInt(this.value),
          UserId: 1
        }
        )
      })
      for (var i = 0; i < objUserSport.length; i++) {
        editSport(objUserSport[i])
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  })

  $('#cmdAddSports').click(function () {
    try {
      var objUserSport = []
      $('.txtNewSportLevel').each(function () {
        if (parseInt(this.value) > 0) {
          objUserSport.push({
            SportId: $(this).attr('data-id'),
            level: parseInt(this.value),
            UserId: 1
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
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  })

  $('#cmdSignUp').click(function () {
    // more validation

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
              replacingSequelizeError(xhr.responseJSON)
            }
          }else {
            console.log('no error found, user added successfully')
            setTimeout(() => {
              console.log('proceed with page reload')
            // location.reload()
            }, 500)
          }
        }
      })
    } catch(e) {
      console.log('in catch')
      console.log(e)
    }
  })

  $('#btnUserInfoSave').click(function () {
    try {
      var objUpdate = {
        first_name: $('.txtCurrentFirstName').val(),
        last_name: $('.txtCurrentLastName').val(),
        location: $('.txtCurrentLocation').val(),
        hometown: $('.txtCurrentHometown').val(),
        email: $('.txtCurrentEmail').val(),
        photo: $('.txtCurrentPhoto').val(),
        bio: $('.taCurrentBio').val()
      }
      $.ajax('/api/user/' + sessionStorage.getItem('sessionUserId'), {
        type: 'PUT',
        data: objUpdate,
        success: function (data, status, xhr) {
          console.log('in updateProfile function')
          console.log(xhr)
          if (xhr.responseJSON) {
            if (xhr.responseJSON.indexOf('Validation error') > -1) {
              // console.log(xhr.responseJSON)
              console.log('Thorwing error')
              replacingSequelizeError(xhr.responseJSON)
            }
          }else {
            console.log('no error found, user profile updated successfully')
            setTimeout(() => {
              console.log('proceed with page reload')
            // location.reload()
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
})
