const mongoose = require('mongoose');
//importing our usersSchema
const users = require('../gamePlay/gameState');

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//findScore() function is expendable, you can change up values in the query to obtain different results.
//findScore(pass in score);
async function findScore(score){
    try{
            const score = await gameState.where("score").limit(10);
            console.log(`SCORE: ${uid[0].score} found.`);
            return uid[0].score;
        }catch (err){
            console.log(err.message);
        }
}

//exporting find user function to be used elsewhere
module.exports = findScore;
