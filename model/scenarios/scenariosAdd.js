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

async function addScenes(){
    //adding a new scenario to the DB
    const remmy = await scenarios.deleteMany({});
    console.log("All SCENES removed.");
        const scene = await scenarios.create(
            {
                id:1,
                prompt:"You wake up in a dimly lit bedroom on the second level of an old tavern. Your head is pounding and your memory is foggy. You sit up and notice a note on the table next to you. The note reads…Welcome to the Eastern Mountain Pass Tavern. We found you outside on the road and brought you inside last night. Your belongings can be found downstairs. You look around and the tavern is empty except for the bartender, who is polishing a glass behind the bar. You have two options:",
                options:{
                      prompt1:"Ask the bartender for information about the town",
                      prompt2:"Retrieve your belongings from the cabinet in the corner"
                    }
             },
             {
                id:11,
                prompt:"You take a seat at the stool at the end of the bar and ask the bartender about the nearby town, Knifes Edge. He tells you that Knifes Edge is a haven for travelers, but there have also been mysterious disappearances. He warns you to be careful if you plan on exploring the town. You have two options:",
                options:{
                      prompt1:"Leave the tavern to explore the city",
                      prompt2:"Stay in the tavern and discuss these “disappearances” further with the bartender"
                    }
             },
             {
                id:12,
                prompt:"You leave the tavern and venture deeper into the town. Eventually, you find yourself surrounded by bandits who are lying in wait. They demand your belongings. You have two options:",
                options:{
                      prompt1:"Fight the bandits",
                      prompt2:"Try to reason with the bandits"
                    }
             },
             {
                id:21,
                prompt:"You refuse to give up your belongings and fight the bandits. You fight bravely, but you are ultimately outnumbered and you succumb to your injuries.",
                options:{
                      prompt1:"YOU LOSE",
                      prompt2:"YOU LOSE"
                    }
             },
             {
                id:22,
                prompt:"You explain to the bandits that you are incredibly gifted in the art of treasure hunting, and it would make more sense for them to join you to work together. They tell you about the nearby Ruins of Ashborne. The ruins are rumored to be full of coveted treasures. You have two options:",
                options:{
                      prompt1:"Continue ahead to explore the ruins",
                      prompt2:"Return to the tavern and wait for another opportunity to present itself"
                    }
             },
             {
                id:71,
                prompt: "The bartender tells you that many of the adventurers that pass through Knifes Edge take refuge at the tavern, for it is close to the Ruins of Ashborne. The ruins are rumored to be full of coveted treasures. You have two options:",
                options: {
                    prompt1: "Ignore the warning and leave the tavern to search for the map and treasure on your own",
                    prompt2: "Go talk to the group of adventurers in the corner of the tavern"
                   }
        }
        );    
        console.log("All SCENES added successfully.");
}

module.exports = addScenes;
