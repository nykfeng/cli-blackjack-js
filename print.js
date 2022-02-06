import chalk from "chalk";

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

export default {
  hand,
};
