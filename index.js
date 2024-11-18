// TODO: Include packages needed for this application
import fs from "fs";
import inquirer from "inquirer";
import { Octokit } from "@octokit/core";
import genMD from "./utils/generateMarkdown.js";

// GET the commonly used license from the Github
const octokit = new Octokit();

let licenses = await octokit.request("GET /licenses", {
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

// console.log(licenses.data);
let licenseNames = licenses.data.map((license) => license.name);

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your name? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("You need to enter your name!");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "project_name",
    message: "What is the name of your project? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("You need to enter a project name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username? (Required)",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("You need to enter your GitHub username!");
        return false;
      }
    },
  },
  {
    type: "checkbox",
    name: "license",
    message: "Which opensource license do you want to add ?",
    choices: [...licenseNames, "none"],
  },
  {
    type: "input",
    name: "description",
    message: "Provide a description of the project (Required)",
    validate: (descriptionText) => {
      if (descriptionText) {
        return true;
      } else {
        console.log("You need to add description about the project!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "imageURL",
    message: "Drag and drop of your project image.",
  },
  {
    type: "confirm",
    name: "installation",
    message: "Provide installation instructions : ",
  },

  {
    type: "confirm",
    name: "contributing",
    message: "Provide contribution guidelines : ",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return err;
    }
  });
}

// Project image section
// Copy image file to current directory with the url given
function copyImage(source, dest) {
  fs.copyFile(source, `./src/${dest}.png`, (err) => {
    if (err) {
      return err;
    }
  });
}

// TODO: Create a function to initialize app
function init(questions) {
  inquirer
    .prompt([
      /* Pass your questions in here */
      ...questions,
    ])
    .then((data) => {
      // remove the string quote from the imageURL
      let imageURL = data.imageURL.trim();
      if (imageURL.startsWith("'") && imageURL.endsWith("'")) {
        imageURL = imageURL.slice(1, -1);
      }

      copyImage(imageURL, data.project_name);

      return genMD(data, licenses, writeToFile, octokit);
    })
    .then((data) => {
      writeToFile("README.md", data, (error) => {
        if (error) {
          return error;
        }
      });
    });
}

// Function call to initialize app
init(questions);
