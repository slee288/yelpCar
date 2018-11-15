var express = require("express");
var router = express.Router();
var Car     = require("../models/car");
var middleware = require("../middleware");


//Car page
//Show form to create new idol
router.get("/", function(req, res){
    //Get all cars from DB
    Car.find({}, function(err, allcars){
       if(err){
            console.log(err);
       } else{
            //req.user contains username and id of currently logged in user
            res.render("cars/index", {cars:allcars});
       }
    });
    
});

//create route
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to cars array
    //redirect back to cars page
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCar = {
        name: name,
        price: price,
        image: image,
        description: description,
        author: author
    }
    
    //Create a new car and save to DB
    Car.create(newCar, function(err, newCreated){
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
        } else {
            //redirect back to campgrounds page
            //default is to redirect as a get request
            res.redirect("/cars");
        }
    });
 });

//shows form for new cars
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("cars/new"); 
});


//show page
//This MUST be declared after /cars/new; else, it will catch the 
//word "new" as an id
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Car.findById(req.params.id).populate("comments").exec(function(err, foundCar){
        if(err){
            console.log(err);
        }
        else {
            console.log(foundCar);
            //render show tamplate with that car
            //with foundcar as car parameter
            res.render("cars/show", {car:foundCar});
        }
    });
   
});

//EDIT CAR ROUTE
router.get("/:id/edit", middleware.checkCarOwnership, function(req, res){
    Car.findById(req.params.id, function(err, foundCar){
        if(err) {
            console.log(err);
        } else {
            res.render("cars/edit", {car: foundCar});
        }
    });
});

//UPDATE CAR ROUTE
router.put("/:id", middleware.checkCarOwnership, function(req, res){
    //find and update the correct car
    Car.findByIdAndUpdate(req.params.id, req.body.car, function(err, updatedCar){
        if(err) {
            res.redirect("/cars");
        } else {
            //redirect somewhere(show page)
            res.redirect("/cars/" + req.params.id);
        }
    });
});

//DESTROY CAR ROUTE
router.delete("/:id", middleware.checkCarOwnership, function(req, res){
    Car.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/cars");
        } else {
            req.flash("success", "Car data deleted");
            res.redirect("/cars");    
        }
    });
});

module.exports = router;