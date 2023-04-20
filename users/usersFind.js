//BAFA - Alexander Kohanik - APW: JavaScript - April 18th, 2023


//THIS DOCUMENT CONTAINS:
//    -The "findUser()" function which can be used to find a users document by username being passed into the functions parameters
//
// *** see "users.js" for layout of users schema & collection

const mongoose = require('mongoose');
//importing our usersSchema
const users = require('./users');

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//findUser() function is expendable, you can change up values in the query to obtain different results.
//findUser("Alexander John Kohanik");
async function findUser(username){
    try{
            //finding scenario with id field of 2
            const user = await users.where("name")
            .equals(username);
            console.log(user[0].name);
            return user[0].name;
        }catch (err){
            console.log(err.message);
        }
}

//exporting find user function to be used elsewhere
module.exports = findUser;
