const express = require("express");
const bodyParser = require("body-parser");

//Setting up the server and ejs
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Setting up the Project DB
const mongoose = require("mongoose");
const { type } = require("os");
const { log } = require("console");
let db = "";
async function main(){
    try{
        db = mongoose.connect("mongodb://127.0.0.1:27017/registerDB", {useNewUrlParser: true});
        console.log("successfully connected to the database");
    } catch(err) {
        console.log(err);
    }
}
main();

const register_schema = new mongoose.Schema({
    db_username: String,
    db_useremail: String,
    db_age: String,
    db_gender: String,
    db_phone: String
});

const Register = mongoose.model("registers", register_schema);

app.get("/", function(req, res){
    Register.find().then(function(user_list){
        res.render("home", {
            users: user_list
        });
    });
});


app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const new_user = Register({
        db_username: req.body.username,
        db_useremail: req.body.useremail,
        db_age: req.body.age,
        db_gender: req.body.gender,
        db_phone: req.body.phone
    });
    new_user.save();
    res.redirect("/");
});




//Listening to the port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000");
});