import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import timer from "./timer.js";
import chalkAnimation from "chalk-animation";


const firstRow = function (cardsDrawn, hideFirstCard = false) {
  cardsDrawn.forEach((card, i) => {
    if (i === 0 && hideFirstCard) {
      process.stdout.write(`${chalk.bgGreen("    ")}`);
    } else {
      // 10 take one more character space than any other card
      if (card.rank != 10) {
        process.stdout.write(`${chalk.bgWhite("    ")}`);
      } else {
        process.stdout.write(`${chalk.bgWhite("     ")}`);
      }
    }
    process.stdout.write("  ");
  });
  console.log();
};

const thirdRow = function (cardsDrawn, hideFirstCard = false) {
  cardsDrawn.forEach((card, i) => {
    if (i === 0 && hideFirstCard) {
      process.stdout.write(`${chalk.bgGreen("    ")}`);
    } else {
      // 10 take one more character space than any other card
      if (card.rank != 10) {
        process.stdout.write(`${chalk.bgWhite("    ")}`);
      } else {
        process.stdout.write(`${chalk.bgWhite("     ")}`);
      }
    }
    process.stdout.write("  ");
  });
  console.log();
};

const midRow = function (cardsDrawn, hideFirstCard = false) {
  cardsDrawn.forEach((card, i) => {
    if (i === 0 && hideFirstCard) {
      // background color before text on the same line
      process.stdout.write(`${chalk.bgGreen(" ")}`);
      process.stdout.write(`${chalk.bgGreen.black("??")}`);
      // background color after text on the same line
      process.stdout.write(`${chalk.bgGreen(" ")}`);
    } else {
      process.stdout.write(`${chalk.bgWhite(" ")}`);
      if (card.color === "black") {
        process.stdout.write(
          `${chalk.bgWhite(chalk.black(card.suit + card.rank))}`
        );
      } else {
        process.stdout.write(
          `${chalk.bgWhite(chalk.red(card.suit + card.rank))}`
        );
      }
      process.stdout.write(`${chalk.bgWhite(" ")}`);
    }
    process.stdout.write("  ");
  });
  console.log();
};

const hand = function (cardsDrawn, hideFirstCard) {
  firstRow(cardsDrawn, hideFirstCard);
  midRow(cardsDrawn, hideFirstCard);
  thirdRow(cardsDrawn, hideFirstCard);
};

const welcome =  async function () {
  figlet("Blackjack!!", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(gradient.pastel.multiline(data) + "\n");
  });

  await timer.loader(100);

  const welcomeTitle = chalkAnimation.karaoke(
    "😃 Welcome to the Blackjack ♠J table~! \n"
  );

  await timer.loader();
  welcomeTitle.stop();
};

export default {
  hand,
  welcome
};
