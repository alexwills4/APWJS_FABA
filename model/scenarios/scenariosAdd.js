//BAFA - Alexander Kohanik - APW: JavaScript - April 18th, 2023


//THIS DOCUMENT CONTAINS:
//    -The "addScene()" function which can be used to add a scenario
//
// *** see "scenarios.js" for layout of scenarios schema & collection

const mongoose = require('mongoose');
//importing our scenariosSchema
const scenarios = require('./scenarios');

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

addScene();
async function addScene(){
    //adding a new scenario to the DB
    const scene = await scenarios.create({
        id:2,
        prompt:"This is level 2",
        options:[
        {
            prompt:"(a) to runaway"
        },
        {
            prompt:"(f) to fight"
        }
        ]});
       
    console.log(scene);
}

module.exports = addScene();
