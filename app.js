//required packages
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose") 

//required files
const findPromptOpt2ById = require("./model/scenarios/scenariosOpt2");
const findPromptOptById = require("./model/scenarios/scenariosOpt");
const findUser = require("./model/users/usersFind");
const findScene = require("./model/scenarios/scenariosFind");
const ejs = require("ejs");
const User = require("./model/users/Users/User");
var app = express();
  
mongoose.connect("mongodb://127.0.0.1:27017/apwDB");
//setting up packages, ejs, express, mongoose, etc
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "n/a",
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  
//=====================
// ROUTES
//=====================
  
// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});

// Showing profile page
app.get("/profile", function (req, res) {
  res.render("profile");
});

// Showing home page
app.get("/index", function (req, res) {
  res.render("index");
});
  
// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});

// Showing leaderboard page
app.get("/leaderboard", function (req, res) {
  res.render("leaderboard");
});

// Showing game page
app.get("/game", async function (req, res) {
    const data = {
       title: await findScene(1),
       user: await findUser(1),
       prompt1: await findPromptOptById(1),
       prompt2: await findPromptOpt2ById(1)
    };

  res.render("game", data);
});
  
// Handling user signup
app.post("/register", async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    
    //res.status(200).json(user);
    res.redirect('login');
  });
  
//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});
  
//Handling user login
app.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;
          if (result) {
            res.render("secret");
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});
  
//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});
  
  
  
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
  
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});


