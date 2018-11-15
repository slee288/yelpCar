var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride  = require("method-override"),
    User       = require("./models/user");

var commentRoutes    = require("./routes/comments"),
    carRoutes       = require("./routes/cars"),
    authRoutes       = require("./routes/index");

//connect mongoose
//creates yelpcamp database for us inside mongodb
mongoose.connect("mongodb://localhost/yelp_car");
//mongoose.connect("mongodb://slee:1q2w3e4r!@ds157923.mlab.com:57923/yelpcar")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//__dirname refers to the directory that the script is running
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//flash message install
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add our own middleware for passing the user variable
app.use(function(req, res, next){
    //pass req.user to every single template
    res.locals.currentUser = req.user; 
    //IMPORTANT: if we don't have this, program will simply stop
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//requiring routes
app.use("/", authRoutes);
app.use("/cars/:id/comments", commentRoutes);
app.use("/cars", carRoutes);

//Home Route
app.get("/", function(req, res){
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCar Server Started...");
});