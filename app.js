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
const gameState = require('./controller/gamePlay/gameStatePush');
const saveGameState = require('./controller/gamePlay/gameStatePush');

const scoreFind = require("./controller/gameScore/gameScoreFind");

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
// Should run score functions to gather the top 10 scores to display here.
app.get("/leaderboard", async function (req, res) {
  /*var scores = (
    score1: await scoreFind(0)
  ); */
  res.render("leaderboard");
});

// Showing game page       //Alex K changes comments in this section April 20th, 2023
app.get("/game", async function (req, res) {
  const data = {
    //USER
    user: await findUser(1),
    //INTRO
    intro: await findScene("intro"),
    intro1: await findPromptOptById("intro"),
    intro2: await findPromptOpt2ById("intro"),
    //ASKBAR
    askbar: await findScene("askbar"),
    askbar1: await findPromptOptById("askbar"),
    askbar2: await findPromptOpt2ById("askbar"),
    //LEAVETOWN
    leavetown: await findScene("leavetown"),
    leavetown1: await findPromptOptById("leavetown"),
    leavetown2: await findPromptOpt2ById("leavetown"),
    //FIGHTBANDITS
    fightbandits: await findScene("fightbandits"),
    fightbandits1: await findPromptOptById("fightbandits"),
    fightbandits2: await findPromptOpt2ById("fightbandits"),
    //REASONBANDITS 
    reasonbandits: await findScene("reasonbandits"),
    reasonbandits1: await findPromptOptById("reasonbandits"),
    reasonbandits2: await findPromptOpt2ById("reasonbandits"),
    //EXPLORERUINS
    exploreruins: await findScene("exploreruins"),
    exploreruins1: await findPromptOptById("exploreruins"),
    exploreruins2: await findPromptOpt2ById("exploreruins"),
    //FIGHTBANDITSRUINS1
    fightBanditsRuinsFirst: await findScene("fightBanditsRuinsFirst"),
    fightBanditsRuinsFirst1: await findPromptOptById("fightBanditsRuinsFirst"),
    fightBanditsRuinsFirst2: await findPromptOpt2ById("fightBanditsRuinsFirst"),
    //ESCAPETREASURE
    escapeTreasure: await findScene("escapeTreasure"),
    escapeTreasure1: await findPromptOptById("escapeTreasure"),
    escapeTreasure2: await findPromptOpt2ById("escapeTreasure"),
    //RETURNTAVERN
    returnTavern: await findScene("returnTavern"),
    returnTavern1: await findPromptOptById("returnTavern"),
    returnTavern2: await findPromptOpt2ById("returnTavern"),
    //TALKMAN
    talkMan: await findScene("talkMan"),
    talkMan1: await findPromptOptById("talkMan"),
    talkMan2: await findPromptOpt2ById("talkMan"),
    //TALKWOMAN
    talkWoman: await findScene("talkWoman"),
    talkWoman1: await findPromptOptById("talkWoman"),
    talkWoman2: await findPromptOpt2ById("talkWoman"),
    //DISCUSSBAR
    discussBar: await findScene("discussBar"),
    discussBar1: await findPromptOptById("discussBar"),
    discussBar2: await findPromptOpt2ById("discussBar"),
    //IGNOREWARNING
    ignoreWarning: await findScene("ignoreWarning"),
    ignoreWarning1: await findPromptOptById("ignoreWarning"),
    ignoreWarning2: await findPromptOpt2ById("ignoreWarning"),
    //BUYMAP
    buyMap: await findScene("buyMap"),
    buyMap1: await findPromptOptById("buyMap"),
    buyMap2: await findPromptOpt2ById("buyMap"),
    //REASONBANDITSRUINS
    reasonBanditsRuins: await findScene("reasonBanditsRuins"),
    reasonBanditsRuins1: await findPromptOptById("reasonBanditsRuins"),
    reasonBanditsRuins2: await findPromptOpt2ById("reasonBanditsRuins"),
    //FIGHTBANDITSRUINSSECOND
    fightBanditsRuinsSecond: await findScene("fightBanditsRuinsSecond"),
    fightBanditsRuinsSecond1: await findPromptOptById("fightBanditsRuinsSecond"),
    fightBanditsRuinsSecond2: await findPromptOpt2ById("fightBanditsRuinsSecond"),
    //DECLINESHADYFIGURE
    declineShadyFigure: await findScene("declineShadyFigure"),
    declineShadyFigure1: await findPromptOptById("declineShadyFigure"),
    declineShadyFigure2: await findPromptOpt2ById("declineShadyFigure"),
    //SPLITTREASURE
    splitTreasure: await findScene("splitTreasure"),
    splitTreasure1: await findPromptOptById("splitTreasure"),
    splitTreasure2: await findPromptOpt2ById("splitTreasure"),
    //KEEPTREASURE
    keepTreasure: await findScene("keepTreasure"),
    keepTreasure1: await findPromptOptById("keepTreasure"),
    keepTreasure2: await findPromptOpt2ById("keepTreasure"),
    //TALKADVENTURERS
    talkAdventurers: await findScene("talkAdventurers"),
    talkAdventurers1: await findPromptOptById("talkAdventurers"),
    talkAdventurers2: await findPromptOpt2ById("talkAdventurers"),
    //LEADGROUP
    leadGroup: await findScene("leadGroup"),
    leadGroup1: await findPromptOptById("leadGroup"),
    leadGroup2: await findPromptOpt2ById("leadGroup"),
    //SNEAKGUARDS
    sneakGuards: await findScene("sneakGuards"),
    sneakGuards1: await findPromptOptById("sneakGuards"),
    sneakGuards2: await findPromptOpt2ById("sneakGuards"),
    //FIGHTGUARDS
    fightGuards: await findScene("fightGuards"),
    fightGuards1: await findPromptOptById("fightGuards"),
    fightGuards2: await findPromptOpt2ById("fightGuards"),
    //DECLINEGROUP
    declineGroup: await findScene("declineGroup"),
    declineGroup1: await findPromptOptById("declineGroup"),
    declineGroup2: await findPromptOpt2ById("declineGroup"),
    //GETBELONGINGS
    getBelongings: await findScene("getBelongings"),
    getBelongings1: await findPromptOptById("getBelongings"),
    getBelongings2: await findPromptOpt2ById("getBelongings"),
    //ACCEPTJOB
    acceptJob: await findScene("acceptJob"),
    acceptJob1: await findPromptOptById("acceptJob"),
    acceptJob2: await findPromptOpt2ById("acceptJob"),
    //ACCOMPANYMERCHANT
    accompanyMerchant: await findScene("accompanyMerchant"),
    accompanyMerchant1: await findPromptOptById("accompanyMerchant"),
    accompanyMerchant2: await findPromptOpt2ById("accompanyMerchant"),
    //STEALTREASURE
    stealTreasure: await findScene("stealTreasure"),
    stealTreasure1: await findPromptOptById("stealTreasure"),
    stealTreasure2: await findPromptOpt2ById("stealTreasure"),
    //CONFRONTMERCHANT
    confrontMerchant: await findScene("confrontMerchant"),
    confrontMerchant1: await findPromptOptById("confrontMerchant"),
    confrontMerchant2: await findPromptOpt2ById("confrontMerchant"),
    //HELPMERCHANT
    helpMerchant: await findScene("helpMerchant"),
    helpMerchant1: await findPromptOptById("helpMerchant"),
    helpMerchant2: await findPromptOpt2ById("helpMerchant"),
    //LEAVEMERCHANT
    leaveMerchant: await findScene("leaveMerchant"),
    leaveMerchant1: await findPromptOptById("leaveMerchant"),
    leaveMerchant2: await findPromptOpt2ById("leaveMerchant"),
    //EXPLORETOWN
    exploreTown: await findScene("exploreTown"),
    exploreTown1: await findPromptOptById("exploreTown"),
    exploreTown2: await findPromptOpt2ById("exploreTown"),
    //DECLINEJOB
    declineJob: await findScene("declineJob"),
    declineJob1: await findPromptOptById("declineJob"),
    declineJob2: await findPromptOpt2ById("declineJob"),
    //ENTERCAVE
    enterCave: await findScene("enterCave"),
    enterCave1: await findPromptOptById("enterCave"),
    enterCave2: await findPromptOpt2ById("enterCave"),
    //FIRSTPATH
    firstPath: await findScene("firstPath"),
    firstPath1: await findPromptOptById("firstPath"),
    firstPath2: await findPromptOpt2ById("firstPath"),
    //FIGHTYETI
    fightYeti: await findScene("fightYeti"),
    fightYeti1: await findPromptOptById("fightYeti"),
    fightYeti2: await findPromptOpt2ById("fightYeti"),
    //SNEAKYETI
    sneakYeti: await findScene("sneakYeti"),
    sneakYeti1: await findPromptOptById("sneakYeti"),
    sneakYeti2: await findPromptOpt2ById("sneakYeti"),
    //SECONDPATH
    secondPath: await findScene("secondPath"),
    secondPath1: await findPromptOptById("secondPath"),
    secondPath2: await findPromptOpt2ById("secondPath"),
    //TAKECHANCE
    takeChance: await findScene("takeChance"),
    takeChance1: await findPromptOptById("takeChance"),
    takeChance2: await findPromptOpt2ById("takeChance"),
    //LEAVECAVE
    leaveCave: await findScene("leaveCave"),
    leaveCave1: await findPromptOptById("leaveCave"),
    leaveCave2: await findPromptOpt2ById("leaveCave"),
    //AVOIDCAVE
    avoidCave: await findScene("avoidCave"),
    avoidCave1: await findPromptOptById("avoidCave"),
    avoidCave2: await findPromptOpt2ById("avoidCave"),
    //HEARBANDITS
    hearBandits: await findScene("hearBandits"),
    hearBandits1: await findPromptOptById("hearBandits"),
    hearBandits2: await findPromptOpt2ById("hearBandits"),
    //JOINBANDITS
    joinBandits: await findScene("joinBandits"),
    joinBandits1: await findPromptOptById("joinBandits"),
    joinBandits2: await findPromptOpt2ById("joinBandits"),
    //CROSSBANDITS
    crossBandits: await findScene("crossBandits"),
    crossBandits1: await findPromptOptById("crossBandits"),
    crossBandits2: await findPromptOpt2ById("crossBandits"),
    //REFUSEBANDITS
    refuseBandits: await findScene("refuseBandits"),
    refuseBandits1: await findPromptOptById("refuseBandits"),
    refuseBandits2: await findPromptOpt2ById("refuseBandits"),
    //FIGHTBANDITSTAVERN
    fightBanditsTavern: await findScene("fightBanditsTavern"),
    fightBanditsTavern1: await findPromptOptById("fightBanditsTavern"),
    fightBanditsTavern2: await findPromptOpt2ById("fightBanditsTavern"),
    //RUNBANDITS
    runBandits: await findScene("runBandits"),
    runBandits1: await findPromptOptById("runBandits"),
    runBandits2: await findPromptOpt2ById("runBandits"),
  }; //edit params passed into functions to change which scenes are loaded upon /game

res.render("game", data);

});

app.post("/game", async function(req, res){
  try {
    app.listen(port);
      //const dataOB = saveGameState(user._id, gameState)  //how can I get the user._id out of the login page to be used here. Set it as a variable somehow I imagine?
      const savebutton = document.getElementById("gameSave");
      const userSaved = await savebutton.addEventListener("click", async () => {
        res.render('/game', {
          savebutton: "userSaved"
        });
        res.end()
      /*if (userSaved) {
        const result1 = req.script.gameState;
        const result2 = await saveGameState(user._id, result1);
      } if (result2) {
          res.render("game", alert("GameSaved"));
      } else {
          res.status(400).json({ error: "Error Saving Game" });
      } */}); 
    } catch (error) {
      
    }
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
  
//Handling user login POST
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


