//BAFA - Alexander Kohanik - APW: JavaScript - April 18th, 2023


//THIS DOCUMENT CONTAINS:
//    -The users Schema (aka the format of the users collection documents)
//    -it is exported and can be used via "const users = require('./users');"
//    -from there you can create new users in your code by:
//                         -establishing a db connection
//                         -using mongoose functions to find(), insert(), etc.
// *** see "usersScript.js" for examples of adding/updating scenarios

const mongoose = require('mongoose');

//connection to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');



//creating schema
var usersSchema = new mongoose.Schema({
    id: Number,
       name: String,
       email: String,
});

//collection creation, assigning to variable
const users = mongoose.model("users", usersSchema);

//exporting collection and schema for documents in collection to be used in other files
module.exports = users;


//*****to do: add dateCreated field to users document, add input validation for schema