var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose") 

//functions - AlexK
//findPromptOpt2ById() pass in id as param, will return that scenes second option for user
//findPromptOptById() pass in id as param, will return that scenes first option for the user
//findUser() pass in a users id as param, will return that users username
//findScene() pass in a scenes id as param, will return that scenes prompt aka the text displayed to the user.
const findPromptOpt2ById = require("./model/scenarios/scenariosOpt2");
const findPromptOptById = require("./model/scenarios/scenariosOpt");
const findUser = require("./model/users/usersFind");
const findScene = require("./model/scenarios/scenariosFind");
const sceneAddAll = require("./model/scenarios/scenariosAdd");
const populateUserState = require('./controller/gamePlay/gameStatePush');

const ejs = require("ejs");
const User = require("./model/User");
var app = express();

var path = require('path');
  
mongoose.connect("mongodb://127.0.0.1:27017/apwDB");

sceneAddAll(); // Removes all Scenes from users DB, then adds them. Does this whenever app.js is ran.
  
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

// Showing home page
app.get("/index", function (req, res) {
  res.render("index");
});

// Showing profile page
app.get("/profile", function (req, res) {
  res.render("profile");
});

// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});

// Showing leaderboard page
app.get("/leaderboard", function (req, res) {
  res.render("leaderboard");
});

// Showing game page       //Alex K changes comments in this section April 20th, 2023
app.get("/game", async function (req, res) {
    const data = {
       //USER
       user: await findUser(1),
       //SCENE 1
       title: await findScene(1),
       prompt1: await findPromptOptById(1),
       prompt2: await findPromptOpt2ById(1),
      //SCENE 2
       title2: await findScene(11),
      prompt21: await findPromptOptById(11),
      prompt22: await findPromptOpt2ById(11),
      //SCENE 3
      title3: await findScene(12),
      prompt31: await findPromptOptById(12),
      prompt32: await findPromptOpt2ById(12),
      //SCENE 4
      title4: await findScene(21),
      prompt41: await findPromptOptById(21),
      prompt42: await findPromptOpt2ById(21),
      //SCENE 5
      title5: await findScene(22),
      prompt51: await findPromptOptById(22),
      prompt52: await findPromptOpt2ById(22),
      //SCENE 6
      title6: await findScene(71),
      prompt61: await findPromptOptById(71),
      prompt62: await findPromptOpt2ById(71)
    }; //edit params passed into functions to change which scenes are loaded upon /game

  res.render("game", data);

});


// Handling user signup
app.post("/register", async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    });
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
          await populateUserState(user._id);  //When a User logs in, their primary key becomes the cooresponding key of their gameState object.
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
  
  
  
function isLoggedIn(req, res, next) { //looking to use this to possibly integrate sessions/save games in the future.
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
  
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});


