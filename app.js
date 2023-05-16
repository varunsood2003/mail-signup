const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const first = req.body.fname;
  const last = req.body.lname;
  const email = req.body.email;
  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: first,
          LNAME: last
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us13.api.mailchimp.com/3.0/lists/defa55ec0b";
  const options={
    method: "POST",
    auth: "varun:c32736d6d096d469d6469f3271f193c7-us13"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    }else{
      res.sendFile(__dirname+"/failure.html")
    }
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started");
});

//unique defa55ec0b
//pi c32736d6d096d469d6469f3271f193c7-us13