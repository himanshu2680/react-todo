//jshint -W033, esversion:6
//f init code
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
app.use(cors({origin: 'http://localhost:3000',
optionsSuccessStatus: 200}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static("public/assets"))
mongoose.connect("mongodb://localhost:27017/reactToDoDB",
 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
const itemSchema = new mongoose.Schema({
  itemName: String,
  isChecked: Boolean
})
const Item = mongoose.model("Item", itemSchema)
///f init code


app.post("/formData", (req, res)=>{
  var newItem = new Item(req.body)
  newItem.save()
  res.redirect("/formData")
})

app.get("/formData", (req, res)=> {
  Item.find({}, function(err, formData){
    if(!err){
      if (formData) {
        res.send(formData)
      }
    }
  })
})

app.post("/delete", (req, res)=> {
  var id = req.body._id
  Item.deleteOne({_id:id}, (err)=>{res.redirect("/formData")})
})

app.post("/check", (req, res)=>{
  var id = req.body._id
  var isChecked = req.body.isChecked
  Item.findByIdAndUpdate(id, {isChecked: !isChecked}, ()=>{res.redirect("/formData")})
})
//f server started
app.listen(process.env.PORT || 5000, function(){
  console.log("Server started successfully(5000)");
})
///f server started