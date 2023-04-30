//BAFA - Alexander Kohanik - APW: JavaScript - April 18th, 2023


//THIS DOCUMENT CONTAINS:
//    -The scenarios Schema (aka the format of the scenarios collection documents)
//    -it is exported and can be used via "const scenarios = require('./scenarios');"
//    -from there you can create new scenarios in your code by:
//                         -establishing a db connection
//                         -using mongoose functions to find(), insert(), etc.
// *** see "scenariosScript.js" for examples of adding/updating scenarios

const mongoose = require('mongoose');

//connection to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');



//creating schema
var scenarioSchema = new mongoose.Schema({
    id: String,
       prompt: String,
       options: {
             prompt1: String,
             prompt2: String
          }
});

//collection creation, assigning to variable
const scenarios = mongoose.model("Scenarios", scenarioSchema);

//exporting collection and schema for documents in collection to be used in other files
module.exports = scenarios;
