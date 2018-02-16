$(function () {
  function getUserCredentials () {
    var successBool = false
    var credentials = {
      username: 'sktan',
      password: 'abcd123'
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

  function editSport (obj) {

    console.log('sport level' + obj.level)
    console.log('sport sport id' + obj.SportId)
    if (obj.level == 0) {
        console.log("deleting user sport");
      $.ajax('/api/userSport/' + obj.SportId, {
        type: 'DELETE',
        data: obj,
        success: function (data, status, xhr) {
          console.log('deleting user sport')
          console.log(xhr)
          if (xhr.status == 200) {
            console.log('sport deleted from user successfully!')
            //location.reload()
          }else {
            console.log(xhr.responseJSON)
          }
        }
      })
    }else {
        console.log("editing user sport")
      $.ajax('/api/userSport/' , {
        type: 'PUT',
        data: obj,
        success: function (data, status, xhr) {
          console.log('in edit sport function')
          console.log(xhr)
          if (xhr.status == 200) {
            console.log('user sport edit successfully')
            //location.reload()
          }else {
            console.log(xhr.responseJSON)
          }
        // console.log(xhr.responseJSON.error)
        }
      })
    }
  }

  function setUserSession (data) {
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
  }
  function clearSession () {
    console.log('clear user session')
    sessionStorage.clear()
  }

  var inputs = $('.txtLevel')

  // createNewUser()
  // getEvent()
  getUserCredentials()

  $('#cmdChangeLevel').click(function () {

    /*     for (var i = 0; i < inputs.length; i++) {
        console.log('value for input[' + i + '] ' + inputs[i].value)
        console.log('data-id for input[' + i + '] ' + inputs[i].data('data-id'))
        }  */
    var objUserSport = []

    $('.txtLevel').each(function () {
      console.log('value is .. ' + this.value)
      console.log('data id is .. ' + $(this).attr('data-id'))
      objUserSport.push({   SportId: $(this).attr('data-id'),
        level: this.value,
      UserId: 1}
      )
    })
    console.log(objUserSport)
    for (var i = 0; i < objUserSport.length; i++) {
      editSport(objUserSport[i])
    }
  // editSport($('#txtLevel').attr('data-id'), $('#txtLevel').val(), 1)
  })
})
