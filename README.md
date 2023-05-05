# APW-JS2

## FABA The Game

FABA is a text based story adventure game. Programmed using JavaScript, express, mongodb, ejs.
---------------------------------------------------------------------------------------------------
## Install the following packages:

npm install express
npm install ejs
npm install mongoose
npm install body-parser
npm install express-session
npm install passport passport-local 
npm install passport-local-mongoose 

Run 'npm install' afterwards to confirm all are up to date.

Run app.js to start the applicatiion. -> Go to localhost:3000
---------------------------------------------------------------------------------------------------
## AlexanderKohanik's Running Notes of changes w/Screenshots:
(04/23/2023) entries -----------------------------------------------------------
-added gameState object within the game.ejs file as well as...
-added several if/elseif statements to handle the use of the buttons on the page. from this the user presses a button and then displays the scene according to which button they pressed. We need to be able to handle this in an easier way, we all need to discuss how we can create functions for the gameState and buttons.
-updated scenariosAdd.js the sceneAddAll() function stems from the scenariosAdd.js file. It is required in the app.js file, and on boot will remove all documents from the usesr scenarios in apwDB, and add all of the scenarios that are within the function in the scenariosAdd.js file. 

see video below for demo of game functionality as of todays changes - Alex Kohanik
![FABAgif](https://user-images.githubusercontent.com/118318185/233880666-3ded940b-5214-4025-8980-b58864be10d7.gif)


(04/19-22/2023) entries --------------------------------------------------------
-Implemented gameState tracking on the game.ejs page. Implemented onclick for buttons associated with page to execute and function the game itself. (Need to go back over & use post for this). 
-Had difficulties implementing css as express static, even from public folder, etc. Didnt want to get too caught up in this so...for now all HTML/ejs is style'd by style="stylestuff".
-Implemented /game to res.render() info pertaining to the firstScene() and display it.
-Tweeked userFind(username), sceneFind(id). They now are easily expendable to suit any query to the DB.
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/118318185/233802807-1c6619d3-74b3-4ee9-a3dd-6f51df2f5032.png">

<img width="1280" alt="image" src="https://user-images.githubusercontent.com/118318185/233802794-c259422c-3dc5-4be3-a090-73d754b2bdfe.png">

<img width="1279" alt="image" src="https://user-images.githubusercontent.com/118318185/233802608-0f4044fe-82d4-4c09-933d-a2190dc4aa1c.png">

<img width="1275" alt="image" src="https://user-images.githubusercontent.com/118318185/233802584-0df16782-6284-4df0-8487-904dfe94864d.png">




(04/18/2023) entry -------------------------------------------------------------
The Scenarios Folder contains: 
-"scenarios.js" : which contains the schema for the scenarios
-"scenariosFind.js" : which contains the sceneFind() function, you can require this atop, and use this to find a scene from the DB. just pass in the scene id #
-"scenariosAdd.js" : which contains the sceneAdd() function, you can require this atop, and use this to add a scene to the DB.
-"scenariosImport.json" : some template scenarios you can import to your mongodb using the "MongoDB Compass" Interface. So you can use the functions above. The DB I reference/connect to is called "apwDB" so you may need to create that DB first.

The Users Folder contains:
-"users.js" : which contains the schema for the users
-"usersAdd.js": which contains the addUser() function, you can require this atop a file, and use this to add a user to the DB. ***Needs tweaking
-"usersFind.js": which contains the findUser() function, you can require this atop a file, and use this to find a user from the DB. just pass in the username as a function arg
-"usersImport.json": same as scenariosImport but import for users.

-game.js is about to commence and I will create the framework for the game itself. probably adding other functions/schemas/collections/documents along the way.

![image](https://user-images.githubusercontent.com/118318185/233802476-3b4f9d81-f715-4768-b6ad-822668b5b4bb.png)

![image](https://user-images.githubusercontent.com/118318185/233802465-a362e003-cb33-430a-834d-c653de9a460d.png)

![image](https://user-images.githubusercontent.com/118318185/233802455-feac3b21-d2fe-4029-b1cc-787c0a696ede.png)
