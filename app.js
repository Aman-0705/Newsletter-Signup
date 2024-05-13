const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res) {

  const name1 = req.body.Name;
  const email1 = req.body.email;
  const pass = req.body.password;

  const data = {
    members: [
      {
        email_address: email1,
        status: "subscribed",
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/923ac89f0b";

  const options = {
    method:"POST",
    auth: "aman1:77f5aac66a2b05eb8953ccc33971f8cc-us21"
  }

  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});

app.listen(3000, function(){
  console.log("Server is running.")
});




// 77f5aac66a2b05eb8953ccc33971f8cc-us21

// 923ac89f0b
