const express = require("express");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1+num2;
  console.log(req.body);
  res.send("The result of the calculation is: "+result);
});


app.get("/bmicalculator", function(req,res){
  res.sendFile(__dirname+"/bmicalculator.html");
});

app.post("/bmicalculator", function(req,res){
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var result = weight/(height*height);
  // console.log(req.body);
  res.send("Your BMI is: "+result);
});

app.listen(3000);
