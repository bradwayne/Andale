$(function () {

    function getUserCredentials(){
        var successBool = false;
        var credentials = {
            username : 'sktan',
            password : 'test'
        }
        $.ajax("/api/getUser/"+credentials.username + "/" + credentials.password ,{
            type: 'GET',
            data : credentials,
            success : function(data, status, xhr){
                console.log("success");
                successBool = true;
                console.log(status);
                console.log(xhr);
            },
            error : function(xhr, status, err){
                console.log("failed");
                console.log(xhr);
                console.log(err);
            },
            complete : function(){
                if(successBool){
                    console.log("Done");
                }
            }
        });
    }
    

    getUserCredentials();
})