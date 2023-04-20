//BAFA - Alexander Kohanik - APW: JavaScript - April 18th, 2023


//THIS DOCUMENT CONTAINS:
//    -The "findScene()" function which can be used to find a scenario
//      ** you can change around this function to return the entire object from mongo or just one field, right now it is set to return the prompt.
//
// *** see "scenarios.js" for layout of scenarios schema & collection

const mongoose = require('mongoose');
//importing our scenariosSchema
const scenarios = require('./scenarios');

//connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//findScene() function is expendable, you can change up values in the query to obtain different results.
//findScene(1); 
/*
async function findScene(sceneID){
    try{
            //finding scenario with id field
            const scene = await scenarios.where("id")
                .equals(sceneID);
            console.log(scene[0].prompt);
        }catch (err){
            console.log(err.message);
        }
}
*/
//exporting find scene function to be used elsewhere
async function findAllScene(){
    try{
        const allScene = await scenarios.find();
        console.log(allScene);
        //document.getElementById("text").textContent = allScene;
        return allScene;
    } catch (err){
        console.log(err.message);
    }
    
}

//window.onload = findAllScene("Testinig");

//module.exports = findScene;
module.exports = findAllScene;
