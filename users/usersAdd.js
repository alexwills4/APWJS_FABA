//BAFA - Alexander Kohanik - APW: JavaScript - April 18th, 2023


//THIS DOCUMENT CONTAINS:
//    -The "addUser()" function which can be used to add a user
//
// *** see "users.js" for layout of users schema & collection

const mongoose = require('mongoose');
//importing our usersSchema
const users = require('./users');

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//addUser("frank",17,"piecake@outlook.mail");
async function addUser(username,userId,userEmail){
        //adding a new scenario to the DB
        try{
        const user = await users.create({
            id: userId,
            name: username,
            email: userEmail
        });
        console.log(user);
    } catch (err) {
        console.log(err);
    }
}

module.exports = addUser;



