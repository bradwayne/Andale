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
        console.log(xhr.responseJSON.error);
        if(xhr.responseJSON.error == "User not found!"){
          console.log("User either enter wrong username or password");
        }else{
          //setUserSession(xhr.re)
          var userInfo = xhr.responseJSON.rows[0];
          console.log(xhr.responseJSON);
          console.log(xhr.responseJSON.rows[0]);
          setUserSession(userInfo)
        }
      }
    })
  }
  function createNewUser(){
    var credentials = {
      username: 'wutmate',
      password : 'qWer1'+1234
    }
    console.log(credentials);
    $.ajax('/api/user/', {
      type: 'POST',
      data : credentials,
      success : function(data, status, xhr){
        console.log("in create new user")
        if(xhr.responseJSON.indexOf("Validation error") > -1){
          console.log(xhr.responseJSON)
        }else{
          console.log("user created successfully")
        }
        //console.log(xhr.responseJSON.error);
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

  //createNewUser()
// getEvent()
  getUserCredentials()

})
