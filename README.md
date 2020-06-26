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

 1. Use `mkdir server` to create new folder both in mac and windows
 2. Or just manually create a `server` folder in the project folder `helloWorld`

**Step 8**
Set up a very basic`express` app using `express` framework:

 3. Install `expressjs` framework using `npm install express --save`, this will install the `express` framework and add it to the `package.json` as a `dependencies`
 4.  Navigate to the `server` folder and create a new file called `index.js`
 5. Add the following code block to the `index.js` file:
 

*const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));*

**Step 9**
Create React App using `create-react-app` CLI:

 6. CD  into the project's root folder `helloWorld` in the command prompt or terminal
 7. And using this command `npx create-react-app client` to create a React App called `client`
 8. After above two steps, there will be one `client` folder in the project's root folder and all the React App related codes will go there
 9.  CD into the `client`  folder and run `npm start` and check if the React App is successfully created or not.

**Step 10**

 Create .env file and add some environment variables:
 
 10.  CD into the server folder and create file called `.env`
 11.  Add the development environment variable using this line: `NODE_ENV=development`
 12.  Add development environment port number using this line:  `PORT=5000`
 13.  Add MongoDB URL for development environment using this line: `MONGODB_URI="mongodb://127.0.0.1:27017/full_stack"`

**Step 11**
Use Env variables in the app:

 14.  Install `dotenv` as a dependency using this command `npm install dotenv --save`
 15. Put the following blocks of code just after all the `require()` statements

    *if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }*
 16.  Put this line of code just before the line  `app.listen()`: `const  PORT = process.env.PORT || 5000;`

**Step 12**
Connect to `mongoDB` from Express App:

 17.  Install `mongoose` as a dependency using this command `npm install mongoose --save`
 18. Make the `mongoose` available in the  `index.js` file, using this line: `const  mongoose  =  require('mongoose');`
 19.  Using `mongoose.connect()` function to connect the Express App to `mongoDB`, add the following block of code just before this `const  app = express();` line in `index.js` file:
 

    *try {
    mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/full_stack', {
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
 20. Install `body-parser`  as a dependency using this command `npm install body-parser --save`
 21. Add this line `app.use(bodyParser.json());` of code to just after this line `const  app  =  express();` this will let this Express App to use `body-parser` middleware

**Step 14**
Create data model using `mongoose schema`:

 22. Create folder called `models` inside `server` folder
 23.  Create `Student.js` file inside `models` folder
 24. Add the following blocks of code inside `Student.js` file:
 
    *const  mongoose = require('mongoose');
    const { Schema } = mongoose;
    
    const  StudentSchema= new  Schema({
    first_name:  String,
    });*
    module.exports = mongoose.model("Student", StudentSchema);**

**Step 15**
Create `API END POINT: /add` for adding student with **firstname**:

 25. Create folder called `routes` inside `server` folder
 26. Create `studentRoute.js` inside `routes` folder
 27. Require `mongoose` using `const  mongoose = require('mongoose');`
 28. Require already created mongoose schema using `const  Student = require("../models/Student");`
 29. Add following code blocks just after the Require statements:
 
	*module.exports = app  => {
	app.post("/add", (req, res) => {
	let  newStudent = new  Student();
	newStudent.first_name = req.body.first_name;
	newStudent.save((err) => {
	if (err) {
	console.log('Error', err);
	}
	res.send({ message:  "Student Added!" });
	});
	});
	}*

**Step 16**
Create `API END POINT: /all` for fetching all the students already added:

 30. Open the `StudentRoute.js` file and add the following block of code just after the `/add` end point imeplentation:
 *app.get("/all", (req, res) => {
   Student.find({}, (err, students) => {
   if (err) {
   console.log('Error', err);
  }
  return  res.json(students);
 });
 });*

**Step 17**
Create a npm run script for both `server`  and `client` seperately and concurrently:
 31. CD into the project root folder and open the `package.json` file
 32. Remove the `"test":""` from the scripts block
 33. Add this run script `"server": "node server/index.js"` inside scripts block, this run script goes to the `server` folder and execute the `index.js` 
 34. Add this run script `"client": "npm run start --prefix client"` inside scripts block, this goes to the client folder and start the React App
 35. Install `concurrently` using `npm install concurrently --save`, this module helps us run several run scripts simultanously, use this module to start the Express server and React App server at the same time
 36. Add this run script `"dev": "concurrently \"npm run server\"  \"npm run client\""` to the scripts block in the package.json
 37. Run `npm run dev` to check if both Express server and React App server started successfully or not

**Step 18**
Enable hot reloading in the Express App, after enabled App restarts automatically whenever there is a new changes:

 38. Install `nodemon` as development dependency using this line `npm install --save-dev nodemon`
 39. Open the `package.json` and in the scripts block, replace the run script for server with this `"server": "nodemon server/index.js",`
 40. Stop the server and run `npm run dev` again
 41. Change something in the Express App and check if the server restarted or not

**Step 19**
Proxy API Request in development

 42. Open the `package.json` file in the `client` folder
 43. Remember our Express App is running on `http://localhost:5000`
 44. In order to send API request from our React App which is running on `http://localhost:3000` to our Express App which is running on `http://localhost:5000` , we need to set up a proxy pass by adding this line `"proxy": "http://localhost:5000"` as a new key-value pair

**Step 20**
In order to connect the `React App` to the `Express App` and make use of the `Api End Point or routes` will do the followings:

 45. CD into the `/client/src`  folder
 46. Inside `src` folder create four folders called: `container`,`pages`,`views`, `styles`
 47. Move App component inside `container` folder, just move the `App.js` and remove the `App.css` and `App.test.js` file
 48. CD into the `/client` folder and install `react-router-dom` using this command: `npm install react-router-dom --save`
 49. Open the `App.js` inside `container` and set up navigation and router
 50. Create `home.js` and `createStudent.js` file inside `pages` folder
 51. Install `axios` using `npm install axios --save`
 52. Create `class component` inside `home.js` and make GET Api Request to fetch all the records from database
 53. Create `functional component` called `CreateStudent` inside `createStudent.js` file and use the `AddForm` component as a child component
 54. Create CSS files for different page or view and put them all in the `styles` folder
 55. Create file called `spinner.js` inside `views` folder and create `functional component` called `Spinner`
 56. Create file called `addForm.js` inside `views` folder and create `class component` called `AddForm` and make POST API call to add new student to the database
 
 
   /**
   * 'v1/post/:id'  --Delete post by id
   */
  api.delete("/:id", (req, res) => {
    Post.deleteOne({ _id: req.params.id }, (err, Post) => {
      if (err) {
        res.send({ message: err });
      }
      res.json({ message: "Post Deleted." });
    });
  });
 
**That is it! Congratulations:)**
