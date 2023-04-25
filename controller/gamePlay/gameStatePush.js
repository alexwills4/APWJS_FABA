


const mongoose = require('mongoose');

const gameState = require('./gameState.js');


//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

async function populateUserState(id){
    try{
            //finding scenario with id field
        const gameStatus =  await gameState.create({
                                userID: id,
                                choices: {
                                    Level1: "null", 
                                    Level2: "null", 
                                    Level3: "null", 
                                    Level4: "null", 
                                    Level5: "null",
                                    Level6: "null",
                                    Level7: "null",
                                    Level8: "null",
                                    Level9: "null",
                                    Level10: "null"
                                }
        });
            console.log(`USER NUMBER: ${id} added to gameState.`);
            console.log(`GAMESTATE: ${gameStatus}`);
            //return user[0].id;

        }catch (err){
            console.log(err.message);
        }

}

module.exports = populateUserState;

