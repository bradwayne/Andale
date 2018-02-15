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
        console.log(xhr)
      },
      error: function (xhr, status, err) {
        console.log('failed')
        console.log(xhr)
        console.log(err)
      },
      complete: function (data) {
        if (successBool) {
          console.log('Done')
          console.log(data.responseJSON.rows[0])
          setUserSession(data.responseJSON.rows[0])
        }
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

// getUserCredentials()
// getEvent()
})
