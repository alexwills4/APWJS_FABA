const mongoose = require('mongoose');
//importing our scenariosSchema

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//creating schema
var gameStateSchema = new mongoose.Schema({
        userID : String,    // query populates the userID field in gameStateSchema
        choices : String,            // query populate upon choice the Level field in the gameStateSchema
        score : String

});

//collection creation, assigning to variable
const gameState = mongoose.model("gameState", gameStateSchema);

//exporting collection and schema for documents in collection to be used in other files
module.exports = gameState;
