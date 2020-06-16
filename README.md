## MERN stack `Hello World`  app creation process:
**Step 1**
Create a github repository called `helloWorld` or any name you want. When creating repository remember followings:

 1. Adding `.gitignore` with `Node` option is a **must.**
 2. Initialize with a README also a **must.**

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
Install mongodb community edition using the following link:
[Download mongoDB](https://docs.mongodb.com/manual/administration/install-community/)


**Step 6**
Create package.json file using the following steps:

 1. Navigate to the project folder using `command prompt` or `terminal` 
 2. Using this command `npm init` create `package.json` file

> When run `npm init`, it initialize the `npm or node package manager` for the project and it creates `package.json` file which records all the packages you installed for the current project.  `package.json` file also includes some meta data regarding to the project such as name and version etc, which we provided during the initialization process.

**Step 7**
Inside project directory `helloWorld` create a new directory called `server` using the following ways:

 1. Use `mkdir server` to create new folder both in mac and windows
 2. Or just manually create a `server` folder in the project folder `helloWorld`

**Step 8**
Set up a very basic`express` app using `express` framework:

 1. Install `expressjs` framework using `npm install express --save`, this will install the `express` framework and add it to the `package.json` as a `dependencies`
 2. Navigate to the `server` folder and create a new file called `index.js`
 3. Add the following code block to the `index.js` file:
 
const express = require('express')

const app = express()

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
