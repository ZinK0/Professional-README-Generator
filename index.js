// TODO: Include packages needed for this application

// const { type } = require("os");
// const fs = require("fs");
// const inquirer = import("inquirer");
import inquirer from "inquirer";
// import { input } from "@inquirer/prompts";

// GET the commonly used license from the Github


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
    type: "comfirm",
    name: "badges",
    message: "Do you want to add predefined badges ?",
    default: true,
  },
  {
    type: "checkbox",
    name: "license",
    message: "Which opensource license do you want to add ?",
    choices: ["MIT", "GNU GPL v3.0", "none"],
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
    message: "Enter the image URL (optional, press ENTER to skip):",
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
  {
    type: "input",
    name: "test",
    message: "Enter test filename : ",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init(questions) {
  inquirer
    .prompt([
      /* Pass your questions in here */
      ...questions,
    ])
    .then((answers) => {
      console.log(answers);
    });
}

// Function call to initialize app
init(questions);
