const mongoose = require('mongoose');
const LocalStorage = require('node-localstorage').LocalStorage;
//importing our users and scenarios schema
const scenarios = require('../scenarios/scenarios');
const users = require('./users');

localStorage = new LocalStorage('./scratch');

mongoose.connect('mongodb://127.0.0.1:27017/apwDB');

//function saveState(){
  //  localStorage.setItem(saveID, JSON.stringify(state));
//}

//async function loadState() {
//    JSON.parse(localStorage.getItem('saveID'));
//}
const saveData = ["ralphie",2]
function saveState() {
    localStorage.setItem('user', JSON.stringify(saveData));
}

function loadState() {
    localStorage.getItem('name');
}

JSON.parse(localStorage.getItem('user'));

const userData = JSON.parse(localStorage.getItem('user'));

saveState(saveData)
loadState()
console.log(userData);
console.log(saveData);
//var state = loadState();
//state.score += 1;
//saveState(state)


module.exports = saveState();
module.exports = loadState();