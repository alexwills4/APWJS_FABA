var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
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
const saveState =  require("./model/users/save");
const loadState =  require("./model/users/load");

const ejs = require("ejs");
const User = require("./model/User");
var app = express();

var path = require('path');
//app.use(express.static(path.join(__dirname, 'public'))); //trying to apply the styles.css 

  
mongoose.connect("mongodb://127.0.0.1:27017/apwDB");
  
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
    title: await findScene(1),
    user: await findUser(1),
    prompt1: await findPromptOptById(1),
    prompt2: await findPromptOpt2ById(1),
    //title2: await findScene(2),
    //promtp21: await findPromptOptById(2),
    //prompt22: await findPromptOpt2ById(2)
  }; // ----------testing different ways to make the buttons function.
  //const test1 = document.addEventListener("prompt1", onclick, true);
  const data2 = {
    title2: await findScene(2),
    prompt21: await findPromptOptById(2),
    prompt22: await findPromptOpt2ById(2)
  };
  //This will be the save state function. /game calls here when the button is pressed and then this 
  //will reference the ** file containing the save function.
  const data3 = {
      save: await saveState(),
  }; 

  res.render('game', data, data3);//if I try to pass data2 in it crashes the site ***BE AWARE.
    
});


// Handling user signup
app.post("/register", async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    
    //return res.status(200).json(user);
    res.redirect('login');
  });
  
//Showing login form
app.get("/login", function(req, res){
  res.render("login");
});

//Handling user login
app.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          //check if password matches *****AND calls to load.js for loadState function.
          const result = req.body.password === user.password;
          if (result) {
            const LOAD = {
              load: await loadState(1,'alexw')
            };
            res.render("secret", LOAD);
            
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


