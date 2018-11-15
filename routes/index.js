var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



//Home Route
router.get("/", function(req, res){
    res.render("landing");
});


//Show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    //register() is provided by passport local mongoose package
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){    //if user already exists, render back to register page
            return res.render("register", {"error": err.message});
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCar " + user.username);
                res.redirect("/cars");
            });
        }
    });
});

//show login form
router.get('/login', function(req, res){
    res.render("login"); 
});

//create login route for handling login logic
//passport.authenticate() here is a middleware
//when we call passport.authenticate(), takes req, and authenticate
//that data with what we have in the database
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/cars",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "Successfully Logged out");
    res.redirect('/cars');
});


module.exports = router;