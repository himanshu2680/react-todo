//jshint -W033, esversion:6
//f init code
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
// const mongoose = require("mongoose")
app.use(cors({origin: 'http://localhost:3000',
optionsSuccessStatus: 200}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static("public/assets"))
// mongoose.connect("mongodb://localhost:27017/reactToDoDB",
//  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
// const itemSchema = new mongoose.Schema({
//   name: String,
//   isChecked: Boolean
// })
// const Item = mongoose.model("Item", itemSchema)
///f init code

var formData =[]

app.post("/formData", function(req, res){
  formData.push(req.body)
  res.end()
})

app.get("/formData", function (req, res) {
  if(formData){
    res.send(formData)
  }
})

app.post("/delete", function (req, res) {
  formData.splice(req.body.index, 1)
  res.redirect("/formData")
})

app.post("/check", (req, res)=>{
  var i=req.body.index
  formData[i].isChecked=!formData[i].isChecked
  res.end()
})
//f server started
app.listen(process.env.PORT || 5000, function(){
  console.log("Server started successfully(5000)");
})
///f server started