#!/usr/bin/env node
// Shebang is required to run this file as a script

import chalk from "chalk";
// Colors the ouput text in terminal in uni-color
import inquirer from "inquirer";
// Prompts the user for input
import gradient from "gradient-string";
// Colors the output text in terminal in gradient colors
import chalkAnimation from "chalk-animation";
// Animates the output text in terminal
import figlet from "figlet";
// Displays the output text in terminal in ascii format in bigger size
import { createSpinner } from "nanospinner";
// Creates a spinner animation

let playername;
let lang;

// Questions related to JavaScript
let J_q = [
  {
    name: "question",
    type: "list",
    message: "The 'var' and 'function' are know as:",
    choices: ["Keywords", "Data Types", "Prototypes", "Declaration statement"],
    answer: "Declaration statement",
  },
  {
    name: "question",
    type: "list",
    message: "Node.js was written initially by:",
    choices: ["Brendan Eich", "James Gosling", "Tim Berners-Lee", "Ryan Dahl"],
    answer: "Ryan Dahl",
  },
  {
    name: "question",
    type: "list",
    message:
      "Which of these is know as the Equality operator used for checking whether both the values are equal?",
    choices: ["=", "==", "===", "&&"],
    answer: "==",
  },
  {
    name: "question",
    type: "list",
    message: "Which of these is not a keyword?",
    choices: ["debugger", "use strict", "with", "if"],
    answer: "use strict",
  },
  {
    name: "question",
    type: "list",
    message: "Which of these symbols is used to create comments in JavaScript?",
    choices: ["//", "\\", "**/", "**/"],
    answer: "//",
  },
];

// Questions related to Python
let P_q = [
  {
    name: "question",
    type: "list",
    message: "Who developed the Python Language?",
    choices: [
      "Zim Den",
      "Guido van Rossum",
      "Dennis Ritchie",
      "Linus Torvalds",
    ],
    answer: "Guido van Rossum",
  },
  {
    name: "question",
    type: "list",
    message: "In which year was the Python Language developed?",
    choices: ["1995", "1972", "1981", "1989"],
    answer: "1989",
  },
  {
    name: "question",
    type: "list",
    message:
      "Which one of the following is the correct extension of the Python file?",
    choices: [".py", ".p", ".python", "None of these"],
    answer: ".py",
  },
  {
    name: "question",
    type: "list",
    message:
      "Which of the following statements is correct regarding the object-oriented programming concept in Python?",
    choices: [
      "Classes are real-world entites while objects are not real",
      "Objects are real-world entites while classes are not real",
      "Both objects and classes are reals-world entites",
      "All of the above",
    ],
    answer: "Objects are real-world entites while classes are not real",
  },
  {
    name: "question",
    type: "list",
    message:
      "Which one of the following has the highest precedence in the expression?",
    choices: ["**", "/", "-", "+"],
    answer: "**",
  },
];

// Questions related to C Language
let C_q = [
  {
    name: "question",
    type: "list",
    message: "Who is the father of C language?",
    choices: [
      "Bjarne Stroustrup",
      "Dennis Ritchie",
      "Ken Thompson",
      "James Gosling",
    ],
    answer: "Dennis Ritchie",
  },
  {
    name: "question",
    type: "list",
    message: "Which of the following is a valid C identifier?",
    choices: [
      "2nd class",
      "2nd_class",
      "2nd class variable",
      "_2nd_class_variable",
    ],
    answer: "_2nd_class_variable",
  },
  {
    name: "question",
    type: "list",
    message: "Which of the following is a valid expression",
    choices: ["i+", "-i+", "i++", "-+i"],
    answer: "i++",
  },
  {
    name: "question",
    type: "list",
    message: "Which of the following is true for variable names in C?",
    choices: [
      "They can contain alphanumeric characters as well as special characters",
      "It is not an error to declare a variable to be one of the keywords(like goto, static)",
      "Variable names cannot start with a digit",
      "Varaible can be any length",
    ],
    answer: "Variable names cannot start with a digit",
  },
  {
    name: "question",
    type: "list",
    message: "Which of the following cannot be a variable name in C?",
    choices: ["volatile", "true", "friend", "export"],
    answer: "volatile",
  },
];

// Sleep variable
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Welcome Screen
async function welcome() {
  console.clear();
  const welcometitle = chalkAnimation.rainbow(
    `Who wants be a Coding Language Millionaire $1,000,000?\n`
  );
  await sleep();
  welcometitle.stop();

  console.log(`
  ${chalk.bgBlue("HOW TO PLAY")}
  If you get any question wrong I will be ${chalk.bgRed("killed☠️")}
  So get all the answers ${chalk.bgGreen("right✅")}...\n`);
}

// Prompts the user to enter their name
async function askName() {
  const name = await inquirer.prompt({
    name: "playername",
    type: "input",
    message: "What is your name?\n>>",
  });

  playername = name.playername;
}

// Asks question based on the language choice
async function question() {
  if (lang === "C") {
    for (let i = 0; i < C_q.length; i++) {
      console.log("\n");
      await askquestion(C_q[i]);
    }
  }
  if (lang === "Python") {
    for (let i = 0; i < P_q.length; i++) {
      console.log("\n");
      await askquestion(P_q[i]);
    }
  }
  if (lang === "JavaScript") {
    for (let i = 0; i < J_q.length; i++) {
      console.log("\n");
      await askquestion(J_q[i]);
    }
  }
}

// Prompts the question with choice
async function askquestion(data) {
  const asking = await inquirer.prompt(data);
  return handleAnswer(asking.question == data.answer);
}

// Animation that checks if the answer is correct
async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer ...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Correct answer ✅` });
  } else {
    spinner.error({ text: `☠️☠️☠️ Game over, you lose ${playername}!` });
    process.exit(1);
  }
}

// Choice to choose language
async function language() {
  console.log("\n");
  const answers = await inquirer.prompt({
    name: "language",
    type: "list",
    message: "Get Ready and choose a language!",
    choices: ["C", "Python", "JavaScript"],
  });
  lang = answers.language;
}

// On completion displays winner message
function winner() {
  console.clear();
  const msg = `Congrats, ${playername}! 
    You are a Millionaire!`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await language();
await question();
await winner();
