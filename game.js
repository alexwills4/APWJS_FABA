//BAFA - Alexander Kohanik - APW: JavaScript - April 18th, 2023

const mongoose = require('mongoose');
const textElement = document.getElementById("text");
//const userChoiceElement = document.getElementById('userChoice');
const sceneFind = require('./scenarios/scenariosFind.js');
const userFind = require('./users/usersFind.js')

mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

let state = {}

var prompt = sceneFind();

/*
async function startGame(){
    try{
        state = {}
        var prompt = await sceneFind();


    } catch (err){
        console.log(err.message);
    }


}
*/

async function displayPrompt(prmpt){
    const dspPrmpt = prompt.find(dspPrmpt => prompt.id === prmpt);
    textElement.innerText = prmpt.text
}

function userInput(){

}

//startGame();





