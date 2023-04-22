const mongoose = require('mongoose');
//importing our users and scenarios schema
const users = require('./users');
const load = require('./load');

localStorage = new LocalStorage('./scratch');

mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//const saveData = ["ralphie",2]
//This function is to be called when the player chooses to save their game.
//Added functionality to usersFind.js to assist with saving.

async function saveState(username, newSave){
  try{
          //finding scenario with id field of 2
          const user = await users.where("id")
          .equals(username).populate(newSave);
          console.log(user[0].name);
          return user[0].name;
      }catch (err){
          console.log(err.message);
      }
}

module.exports = saveState;