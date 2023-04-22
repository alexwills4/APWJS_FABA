const mongoose = require('mongoose');
//importing our users and scenarios schema
const scenarios = require('../scenarios/scenarios');
const users = require('./users');
const save = require('./save');

mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//const saveData = ["ralphie",2]
//This function is to be called when the player chooses to resume a game on /secret.

async function loadState(saveData, saveData2){
    try{
            //finding scenario with id field
            const users = await users.where("username").equals(saveData2);
            const scene = await scenarios.where("id").equals(saveData);
            console.log(scene[0].id);
            console.log(users[0].username);

            return scene[0].id, users[0].username; 
           
        }catch (err){
            console.log(err.message);
        }
}

module.exports = loadState;