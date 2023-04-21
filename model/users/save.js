const mongoose = require('mongoose');
//importing our usersSchema
const users = require('./users');

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

var state = {
    user:{},

}
var saveID = 'save';

async function saveState(state){
    localStorage.setItem(saveID, JSON.stringify(state));
}

async function findUser(username){
    try{
            //finding scenario with id field of 2
            const user = await users.where("id")
            .equals(username);
            console.log(user[0].name);
            return user[0].name;
        }catch (err){
            console.log(err.message);
        }
}


module.exports = saveState;