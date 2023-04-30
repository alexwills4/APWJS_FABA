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
                id:"intro", //0
                prompt:"You wake up in a dimly lit bedroom on the second level of an old tavern. Your head is pounding and your memory is foggy. You sit up and notice a note on the table next to you. The note reads…Welcome to the Eastern Mountain Pass Tavern. We found you outside on the road and brought you inside last night. Your belongings can be found downstairs. You look around and the tavern is empty except for the bartender, who is polishing a glass behind the bar. You have two options:",
                options:{
                      prompt1:"Ask the bartender for information about the town",
                      prompt2:"Retrieve your belongings from the cabinet in the corner"
                    }
             },
             {
                id:"askbar", //1
                prompt:"You take a seat at the stool at the end of the bar and ask the bartender about the nearby town, Knifes Edge. He tells you that Knifes Edge is a haven for travelers, but there have also been mysterious disappearances. He warns you to be careful if you plan on exploring the town. You have two options:",
                options:{
                      prompt1:"Leave the tavern to explore the city",
                      prompt2:"Stay in the tavern and discuss these “disappearances” further with the bartender"
                    }
             },
             {
                id:"leavetown", //11
                prompt:"You leave the tavern and venture deeper into the town. Eventually, you find yourself surrounded by bandits who are lying in wait. They demand your belongings. You have two options:",
                options:{
                      prompt1:"Fight the bandits",
                      prompt2:"Try to reason with the bandits"
                    }
             },
             {
                id:"fightbandits",  //111
                prompt:"You refuse to give up your belongings and fight the bandits. You fight bravely, but you are ultimately outnumbered and you succumb to your injuries.",
                options:{
                      prompt1:"YOU LOSE",
                      prompt2:"YOU LOSE"
                    }
             },
             {
                id:"reasonbandits", //112
                prompt:"You explain to the bandits that you are incredibly gifted in the art of treasure hunting, and it would make more sense for them to join you to work together. They tell you about the nearby Ruins of Ashborne. The ruins are rumored to be full of coveted treasures. You have two options:",
                options:{
                      prompt1:"Continue ahead to explore the ruins",
                      prompt2:"Return to the tavern and wait for another opportunity to present itself"
                    }
             },
             {
              id:"exploreruins", //1121
              prompt: "You continue ahead to explore the ruins and eventually find a hidden chamber filled with treasure. You are overjoyed with your discovery, however the bandits begin to turn on you. You have two options:",
              options: {
                  prompt1: "Fight the bandits to claim all of the treasure",
                  prompt2: "Escape with the treasure that you can carry"
                 }       
           },
           {
              id:"fightBanditsRuinsFirst", //11211
              prompt: "You refuse to give up your share of the treasure and fight the bandits. You fight bravely, but you are ultimately outnumbered and you succumb to your injuries.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
           },
           {
              id:"escapeTreasure", //11212
              prompt: "You avoid the temptation of greed and escape with the treasure you can carry as the bandits fight amongst themselves. You use the small amount of treasure you found to convince other travelers that the Ruins of Ashborne are in fact real. You become a guide for others, and eventually become rich beyond your wildest dreams.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
           },
           {
            id:"returnTavern",  //1122
            prompt: "You decide that it is not a good idea to venture into the unknown with people as untrustworthy as these bandits. You return to the tavern, and to your surprise, it has become much busier than last time. Among the patrons is a hooded man with a brown cloak, and a woman with long grey hair. You have two options:",
            options: {
                prompt1: "Talk to the hooded man in the brown cloak",
                prompt2: "Talk to the woman with the long grey hair"
              }       
            },
            {
              id:"talkMan", //11221
              prompt: "You decide to talk to the hooded man in the brown cloak. The man gives you a map that leads deep into the forest, where the Ruins of Ashborne are rumored to be. You follow the map, but the mystical fog of the forest takes your mind and you slowly go insane until the end of your days",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
            },
            {
              id:"talkWoman", //11222
              prompt: "You decide to talk to the woman with the long grey hair. She tells you that she has been a patron of the Eastern Mountain Pass Tavern for over fifty years, and not one single traveler has returned from their search of the Ruins of Ashborne. You take her advice not to seek the treasure, and instead, you grab a drink and enjoy the rest of your time at the tavern",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"discussBar",  //12
              prompt: "The bartender tells you that many of the adventurers that pass through Knife’s Edge take refuge at the tavern, for it is close to the Ruins of Ashborne. The ruins are rumored to be full of coveted treasures. You have two options:",
              options: {
                  prompt1: "Ignore the warning and leave the tavern to search for the map and treasure on your own",
                  prompt2: "Go talk to the group of adventurers in the corner of the tavern"
                }       
          },
            {
              id:"ignoreWarning",   //121
              prompt: "You decide to ignore the warning and leave the tavern to search for the treasure on your own. You wander around the town, asking locals about the Ruins of Ashborne, Eventually, you come across a shady figure who offers to sell you a map to the ruins. You have two options:",
              options: {
                  prompt1: "Buy the map from the shady figure",
                  prompt2: "Turn down the stranger’s offer and return to the tavern"
                }       
          },
            {
              id:"buyMap",  //1211
              prompt: "You buy the map from the shady figure and follow it deep into the forest. The journey is treacherous and long, but eventually, you find the ruins. As you start to search for the treasure, you trigger a trap and are captured by a group of bandits. You have two options:",
              options: {
                  prompt1: "Try to reason with the bandits",
                  prompt2: "Fight the bandits"
                }       
          },
            {
              id:"reasonBanditsRuins", //12111
              prompt: "You decide to use your wits and reason with the bandits. You tell them that they obviously are unable to find the treasure for themselves, and they have set traps for others out of anger. You offer your services as a treasure hunter, and together you find the treasures of Ashborne. The bandits give you a small share of the treasure in return.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"fightBanditsRuinsSecond", //12112
              prompt: "You decide to fight the bandits. You fight bravely, but you are easily overwhelmed. They force you to reveal the location of the treasure and then leave you for dead.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
          {
              id:"declineShadyFigure",  //1212
              prompt: "You decide not to trust the shady figure and instead return to the tavern to get a drink. Once there, you are approached by a group of adventurers who have also heard about the ruins. They offer to let you join them on their journey, as they need a guide. As a group, you are able to navigate the dangers of the forest and find the ruins and the treasure. You have two options:",
              options: {
                  prompt1: "Stick to your end of the deal and split the treasure",
                  prompt2: "Decide to keep the treasure for yourself"
                }       
          },
            {
              id:"splitTreasure", //12121
              prompt: "You decide that you should split the treasure with your newfound friends, for it was they in the first place who guided you to the ruins. As the months go by, you become great friends and partners, finding additional treasure throughout the Eastern Mountain Pass.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"keepTreasure", //12122
              prompt: "You decide that you are the expert treasure hunter and that your companions do not deserve any of the treasure. Unfortunately, your greed gets the best of you, and your companions turn against you, physically overwhelming you and throwing you down the steep mountainside.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"talkAdventurers", //122
              prompt: "You decide that it is better to find some allies instead of going it alone. You introduce yourself to the adventurers, one woman in a brown dress, a man in a green tunic, and a small boy with a pointy hat. Your choice paid off, as they are planning to venture to the Ruins of Ashborne and could use a talented treasure hunter such as yourself. You have two options:",
              options: {
                  prompt1: "Lead the group through the forest and into the ruins",
                  prompt2: "Decline to lead the group and find another opportunity"
                }       
          },
            {
              id:"leadGroup",  //1221
              prompt: "You agree to lead the group through the forest and into the ruins. After a long journey, you finally reach the ruins and discover that it is heavily guarded. You have two options:",
              options: {
                  prompt1: "Try to sneak past the guards",
                  prompt2: "Fight the guards to gain entry to the ruins"
                }       
          },
            {
              id:"sneakGuards", //12211
              prompt: "You attempt to sneak past the guards, but they catch you and the group is taken, prisoner.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"fightGuards", //12212
              prompt: "You decide to fight the guards. After a tough fight, you defeat your enemies, and you begin to explore the ruins. Eventually, you find a large chamber filled with treasure, but your companions turn against you. You manage to fight them off and escape with all of the treasure. You become a legend in Knife’s Edge and are known as the greatest treasure hunter of all time.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"declineGroup",  //1222
              prompt: "You decide not to lead the group and find another way to seek out the ruins. Your opportunities run out, however, and you become a failure, never living up to your projected ego as the greatest treasure hunter.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"getBelongings", //2
              prompt: "You walk over to the large wooden cabinet. Across from the cabinet is a large fireplace. You feel its warmth flow over you. Inside the cabinet, you find your tunic, hat, and bag. As you begin to leave the tavern, the bartender offers you a job as a bodyguard for a wealthy merchant who is traveling through Knife’s Edge. You have two options:",
              options: {
                  prompt1: "Accept the job and become the merchant’s bodyguard",
                  prompt2: "Decline the job and leave the tavern"
                }       
          },
            {
              id:"acceptJob",  //21
              prompt: "You decide to accept the job offer and become the merchant’s bodyguard. You spend many days traveling with the merchant, fighting off bandits and other dangers. You notice that the merchant is traveling with a significant amount of treasure. Eventually, you arrive in the town of Ashborne, where the merchant has business to attend to. You have two options:",
              options: {
                  prompt1: "Accompany the merchant to his business meeting",
                  prompt2: "Explore the town of Ashborne on your own"
                }       
          },
            {
              id:"accompanyMerchant", //211
              prompt: "You decide to accompany the merchant to his business meeting. During the meeting, you overhear a conversation about a hidden treasure in some ruins on a nearby mountaintop. You have two options:",
              options: {
                  prompt1: "Steal the merchant’s treasure and run away",
                  prompt2: "Confront the merchant about the treasure"
                }       
          },
            {
              id:"stealTreasure",  //2111
              prompt: "You decide to steal the treasure and run away. You manage to escape, but the merchant puts a bounty on your head and you are forced to flee Knife’s Edge.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"confrontMerchant",  //2112
              prompt: "You decide to confront the merchant about the treasure. He reveals that it is cursed and that whoever takes it must return every piece, or suffer a terrible fate. You have two options:",
              options: {
                  prompt1: "Help the merchant return the treasure",
                  prompt2: "Leave the merchant to his fate"
                }       
          },
            {
              id:"helpMerchant", //21121
              prompt: "You decide to help the merchant return the treasure. Together, you find the ruins of Ashborne and you return every piece of treasure. The merchant thanks you for your efforts, and you go on to become an apprentice of the nobleman until you make a name for yourself as one of the best merchants in the Eastern Mountain Pass.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"leaveMerchant", //21122
              prompt: "You decide to leave the merchant to his fate. You owe nothing to this merchant, and you plan to take the his treasure for yourself once he is no more. Unfortunately, the fate of the merchant becomes your own, as you could not resist the temptation of greed.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"exploreTown", //212
              prompt: "While the merchant is busy with his meeting, you decide to explore the town of Ashborne on your own. You find a hidden cave that leads to a chamber filled with treasure. However, the merchant is found dead the next day and his family set a bounty on your head for abandoning your duties. You are captured and unable to use the wealth you acquired.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"declineJob",  //22
              prompt: "You decide to decline the job and leave the tavern. You think that you can make more money in search of nearby treasure. You venture out into the wilderness, facing various challenges along the way. After several days of travel, you come across a mysterious cave entrance hidden deep in the forest. You have two options:",
              options: {
                  prompt1: "Enter the cave and explore its depths",
                  prompt2: "Avoid the cave and continue your journey"
                }       
          },
            {
              id:"enterCave", //221
              prompt: "You decide to enter the cave and explore its depths. Inside, you encounter two paths. Down the first path, you can hear the roars of a primal beast in the distance. Down the second path, you can make out candlelit runes on the wall. You have two options:",
              options: {
                  prompt1: "Take the first path toward the roars of the primal beast",
                  prompt2: "Take the second path towards the candlelit runes on the wall"
                }       
          },
            {
              id:"firstPath",  //2211
              prompt: "You decide to take the first path toward the roars of the primal beast. You discover that the beast is in fact a Yeti, and she is hungry. You have two options:",
              options: {
                  prompt1: "Try to fight the Yeti",
                  prompt2: "Try to sneak past the Yeti"
                }       
          },
            {
              id:"fightYeti", //22111
              prompt: "You decide to fight the beast, but she easily defeats you in close combat.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"sneakYeti", //22112
              prompt: "You decide to sneak past the Yeti. Over the roars and screams of the Yeti, you make no sound. You are able to make it past the Yeti and you acquire the treasure at the end of the cave.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"secondPath",  //2212
              prompt: "You decide to take the second path toward the candlelit runes on the wall. They are in a foreign language, and upon close inspection, you see that the runes correspond to movable platforms on the floor. You have two options:",
              options: {
                  prompt1: "Take a chance, and randomly arrange the runes in a pattern. You need this treasure.",
                  prompt2: "Leave the cave. You don’t know how to enter the chamber."
                }       
          },
            {
              id:"takeChance", //22121
              prompt: "You decide that you didn’t come out here to leave empty-handed, and you arrange the runes in a random pattern. Unfortunately, you triggered a trap and become trapped in the cave. Your greed got the best of you.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"leaveCave", //22122
              prompt: "You decide that it is not worth risking your life to enter the cave when you do not know the rules of the puzzle. Instead, you leave the cave and find someone who can speak the language of the runes. Together, you find the treasure and split it both ways. Your patience paid off.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"avoidCave", //222
              prompt: "You decide to avoid the cave and continue your journey. You make your way through the wilderness. Along the way, you meet a group of bandits who seem to know the location of hidden treasure. You have two options:",
              options: {
                  prompt1: "Hear what the bandits have to say",
                  prompt2: "Refuse to talk to the bandits"
                }       
          },
            {
              id:"hearBandits",  //2221
              prompt: "You decide to hear what the bandits have to say. They tell you that there are rumored to be treasures hidden in the basement of the Eastern Mountain Pass Tavern. You have two options:",
              options: {
                  prompt1: "Join the bandits in an attempt to rob the tavern",
                  prompt2: "Plan to double-cross the bandits and turn them in"
                }       
          },
            {
              id:"joinBandits", //22211
              prompt: "You decide to join the bandits in an attempt to rob the tavern. After making plans to sneak into the tavern, you make it into the basement. Unfortunately, the bartender had put traps in place to protect the treasure. You and your group of bandits are arrested and placed in jail.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
            {
              id:"crossBandits", //22212
              prompt: "You decide that robbing the bartender who took you in is not a good idea. You plan to tell the bartender of the plan to rob his treasure. The bartender thanks you for your honesty, and you receive a reward for turning in the bandits. You use this money to buy yourself a nearby home and you become the bartender’s apprentice.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"refuseBandits",  //2222
              prompt: "You decide to refuse to talk to the bandits. You know they are up to no good and you do not want to associate with them. The bandits decide to rob you of the possessions you received back at the tavern. You have two options:",
              options: {
                  prompt1: "Fight the bandits",
                  prompt2: "Run away from the bandits"
                }       
          },
            {
              id:"fightBanditsTavern", //22221
              prompt: "You decide to fight the bandits. To their surprise, your superior strength overwhelms them. You interrogate the bandits and turn them over the local authorities. You receive a reward for turning in the bandits, and you use this money to barter passage to the Western Passage, where you can begin a new life.",
              options: {
                  prompt1: "YOU",
                  prompt2: "WIN"
                }       
          },
            {
              id:"runBandits", //22222
              prompt: "You try to run away from the bandits. You think you made it far enough away from them, but you are suddenly ambushed. You are strong, but they caught you by surprise. They rob you of your items, and you are left stranded in the wilderness with nothing of value.",
              options: {
                  prompt1: "YOU",
                  prompt2: "LOSE"
                }       
          },
           
        );    
        console.log("All SCENES added successfully.");
}

module.exports = addScenes;
