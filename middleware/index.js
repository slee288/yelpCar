var Car = require("../models/car");
var Comment = require("../models/comment")

//ALL THE MIDDLEWARE GOES HERE
var middlewareObj = {
    
};

middlewareObj.checkCarOwnership = function (req, res, next){
    //is user logged in
    if(req.isAuthenticated()) {
        Car.findById(req.params.id, function(err, foundCar){
            if(err) {
                req.flash("error", "Car is not found");
                res.redirect("back");
            } else {
                //does user own the campground?
                if(foundCar.author.id.equals(req.user._id)){
                    next();
                } else {    //otherwise, redirect
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {    //if not, redirect
        req.flash("error", "You need to be logged in first");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {    //otherwise, redirect
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {    //if not, redirect
        req.flash("error", "You need to be logged in first");
        res.redirect("back");
    }
}

//next is the function that is called after middleware
//this function can be used anywhere in this file
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        //moves on to rendering the requested page
        return next();
    } else {
        req.flash("error", "You must be logged in first");
        res.redirect('/login');
    }
}


module.exports = middlewareObj;