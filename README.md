## MERN stack `Hello World`  app creation process:
**Step 1**
Create a github repository called `helloWorld` or any name you want. When creating repository remember followings:

 - Adding `.gitignore` with `Node` option is a **must.**
 - Initialize with a README also a **must.**

**Step 2**
Create a directory called `workspace`  or any directory name you prefer manually or using command line on your local machine.

> The reason why we create `workspace` directory is that it is not a good idea to directly clone the project repository to your `root` folder, since sometimes it gives `permission denied` error

**Step 3**
Clone the project repository to the `workspace` directory created before using the following command:

    git clone <your project repository url>
    
**Step 4**
Download and install `Node.js` `npm` through the following link:
[Download Node.js](https://nodejs.org/en/download/)

**Step 5**
Check if `Node.js` installation is successful or not by checking the version of installed `Node.js` using the following command:

    node -v
 If it prints out the version number then the installation is successful.
 And follow up please make sure `npm`  is installed by checking the version number using the following command:
 

    npm -v

**Step 5**
Install and set up `mongodb`:

 - Install mongodb community edition using the following link: [Download
   mongoDB](https://docs.mongodb.com/manual/administration/install-community/)
  - After the installation is successful, follow the instructions and create data directory`/data/db`, on the root folder
   - Start the `mongodb` as a system service, so that it starts running when the system started

**Step 6**
Create package.json file using the following steps:

 - Navigate to the project folder using `command prompt` or `terminal` 
  - Using this command `npm init` create `package.json` file

> When run `npm init`, it initialize the `npm or node package manager` for the project and it creates `package.json` file which records all the packages you installed for the current project.  `package.json` file also includes some meta data regarding to the project such as name and version etc, which we provided during the initialization process.

**Step 7**
Inside project directory `helloWorld` create a new directory called `server` using the following ways:

 - Use `mkdir server` to create new folder both in mac and windows
 - Or just manually create a `server` folder in the project folder `helloWorld`

**Step 8**
Set up a very basic`express` app using `express` framework:

 - Install `expressjs` framework using `npm install express --save`, this will install the `express` framework and add it to the `package.json` as a `dependencies`
 -  Navigate to the `server` folder and create a new file called `index.js`
 - Add the following code block to the `index.js` file:
 

*const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));*

**Step 9**
Create React App using `create-react-app` CLI:

 - CD  into the project's root folder `helloWorld` in the command prompt or terminal
 - And using this command `npx create-react-app client` to create a React App called `client`
 - After above two steps, there will be one `client` folder in the project's root folder and all the React App related codes will go there
 -  CD into the `client`  folder and run `npm start` and check if the React App is successfully created or not.

**Step 10**

 Create .env file and add some environment variables:
 
 -  CD into the server folder and create file called `.env`
 -  Add the development environment variable using this line: `NODE_ENV=development`
 -  Add development environment port number using this line:  `PORT=5000`
 -  Add MongoDB URL for development environment using this line: `MONGO_URL=mongodb://localhost:27017/helloworld,`

**Step 11**
Use Env variables in the app:

 -  Install `dotenv` as a dependency using this command `npm install dotenv --save`
 - Put the following blocks of code just after all the `require()` statements

    *if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }*
 -  Put this line of code just before the line  `app.listen()`: `const  PORT = process.env.PORT || 5000;`

**Step 12**
Connect to `mongoDB` from Express App:

 -  Install `mongoose` as a dependency using this command `npm install mongoose --save`
 - Make the `mongoose` available in the  `index.js` file, using this line: `const  mongoose  =  require('mongoose');`
 -  Using `mongoose.connect()` function to connect the Express App to `mongoDB`, add the following block of code just before this `const  app = express();` line in `index.js` file:
 

    *try {
    mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/helloworld', {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
    }, () =>
    console.log("Connected..."));
    } catch (error) {
    console.log("could not connect");
    }*
    4.Restart the app and check the `Terminal or command prompt`, if the connection is successful, see logs saying `connected...`

**Step 13**
Add middleware called `body-parser` :
 - Install `body-parser`  as a dependency using this command `npm install body-parser --save`
 - Add this line `app.use(bodyParser.json());` of code to just after this line `const  app  =  express();` this will let this Express App to use `body-parser` middleware

**Step 14**
Create data model using `mongoose schema`:

 - Create folder called `models` inside `server` folder
-  Create `Hello.js` file inside `models` folder
 - Add the following blocks of code inside `Hello.js` file:
 
    *const  mongoose = require('mongoose');
    const { Schema } = mongoose;
    
    const  helloSchema = new  Schema({
    text:  String,
    });*
    module.exports = helloSchema;**

**Step 15**
Create `API END POINT` for posting *hello texts*

 -  Create folder called `routes` inside `server` folder
 - Create `helloRoute.js` inside `routes` folder