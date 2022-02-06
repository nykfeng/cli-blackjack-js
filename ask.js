import inquirer from "inquirer";

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  return answers.player_name;
}

const startingBalance = async function () {
  const answers = await inquirer.prompt({
    name: "balance",
    type: "input",
    message: "How much did you bring?",
    default() {
      return 0;
    },
  });
  return answers.balance;
};

const bettingAmount = async function () {
  const answers = await inquirer.prompt({
    name: "betting_amount",
    type: "input",
    message: "How much are you betting?",
    default() {
      return 0;
    },
  });
  return answers.betting_amount;
};

const yesOrNo = async function () {
  const answers = await inquirer.prompt({
    name: "yes_or_no",
    type: "input",
    message: "Yes or No?",
    default() {
      return 0;
    },
  });
  return answers.yes_or_no.toLowerCase();
};

export default { askName, startingBalance, bettingAmount, yesOrNo };
