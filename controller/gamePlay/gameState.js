const mongoose = require('mongoose');
//importing our scenariosSchema

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//creating schema
var gameStateSchema = new mongoose.Schema({
        userID : String,    // query populates the userID field in gameStateSchema
        choices : {             // query populate upon choice the Level field in the gameStateSchema
            Level1: String, 
            Level2: String, 
            Level3: String, // example save location, level 4 to the DB.
            Level4: String, 
            Level5: String,
            Level6: String,
            Level7: String,
            Level8: String,
            Level9: String,
            Level10: String
        }
});

// example, will have a find query to search for a level that has a notation on it,
// this can then be sent BACK to the game from the DB to resume progress in the game at another time.

//collection creation, assigning to variable
const gameState = mongoose.model("gameState", gameStateSchema);

//exporting collection and schema for documents in collection to be used in other files
module.exports = gameState;
