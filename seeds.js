var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "NaEun",
        image: "http://www.stardailynews.co.kr/news/photo/201711/173137_205330_449.jpg",
        description: "APink Ace"
    },
    {
        name: "Yura",
        image: "http://img.hankyung.com/photo/201603/01.11468670.1.jpg",
        description: "Girl's Day visual"
    },
    {
        name: "Hyeri",
        image: "https://pds.joins.com/news/component/htmlphoto_mmdata/201704/12/f8ab2d70-afde-4827-9c92-5128d1e2e68c.jpg",
        description: "Girl's Day ace"
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
       /* if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
    
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        
                        //create a comment
                        Comment.create({
                            text: "This girl idol is great!!",
                            author: "Fan"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        });*/
    });
    
    
    
    //add a few comments
}

module.exports = seedDB;