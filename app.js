//jshint eversion 6

// requiring the installed modules
const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');

const app= express();

//codes to tell our app to use required modules
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

//codes for linking our signup pageto the home route
app.get('/', function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req, res){
   
    var firstname = req.body.Fname;
    var lastname = req.body.Lname;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status:'subscribed',
                merge_fields :{
                    FNAME : firstname,
                    LNAME : lastname
                    //Code specs from mailchimp API if i needed the underlisted fields in my signup
                    // ADDRESS: MediaStreamTrackEvent,
                    // PHONE: 12345
                }
            }

        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us3.api.mailchimp.com/3.0/lists/1541f4aa6a",
        method:'POST',
        headers:{
            "Authorization": "victor1 9c830812c136824f5fd5958f5c1929bc-us3"
        },
        body:jsonData
    };


    request(options, function(error, response , body){
        if(error){ //use res.send to tell the user if there was an error
               res.sendFile(__dirname +"/failure.html");
        }else{ 
            if (response.statusCode === 200 ){
                    res.sendFile(__dirname +"/success.html");
            // res.send('Thanks!!, Your Sign up was Successful');
            }else{
                    res.sendFile(__dirname +"/failure.html");
                // res.send('Sorry, there was an error with Signup, Please try Again'); 
            }
       
        }
    });
      // console.log(firstname, lastname, email);  
});

app.post('/failure', function(req, res){
    res.redirect('/');
});

//code for our server to listen on spec. port
app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running on port 3000');
});

//API key
// 9c830812c136824f5fd5958f5c1929bc-us3

//List_id
//1541f4aa6a

