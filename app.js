const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");
const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){

   const firstname = req.body.fName;
   const lastname = req.body.lName;
   const email = req.body.email;

   const data ={
     members:[
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firstname,
           LNAME: lastname
         }
       }
     ]
   };
  const jsonData =JSON.stringify(data);

const url = "https://us2.api.mailchimp.com/3.0/lists/2b847d6ef9";

const options = {
  method: "POST",
  auth: "irfan:e0a4ac90959bddc84c1106261776733b-us2"
}

 const request = https.request(url, options, function(response){

       if (response.statusCode===200){
         res.sendFile(__dirname + "/success.html");
       } else{
          res.sendFile(__dirname + "/failure.html");
       }
          response.on("data", function(data){
            console.log(JSON.parse(data));
          })
 })

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req,res){
  res.redirect("/");
})



//API key
//e0a4ac90959bddc84c1106261776733b-us2

//  audience // ID
// 2b847d6ef9.
