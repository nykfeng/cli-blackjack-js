import { createSpinner } from "nanospinner";

import GameSummary from "./GameSummary.js";
import Deck from "./deck.js";
import ask from "./ask.js";
import print from "./print.js";
import timer from "./timer.js";
import helper from "./helper.js";

export default class Blackjack {
  #balance;
  #playerName;
  #playerHand = [];
  #dealerHand = [];
  #deck;
  #gameSummary;
  #bettingAmount = 0;

  set balance(bal) {
    this.#balance = bal;
  }

  get balance() {
    return this.#balance;
  }

  async startGame() {
    // console.log("😃 Welcome to the Blackjack table~!");
    await print.welcome();
    this.#playerName = await ask.askName();
    const balance = await ask.startingBalance();

    if (parseFloat(balance) > 0) {
      this.#balance = parseFloat(balance);
      this.#gameSummary = new GameSummary(this.#balance);
      console.log(`- Hi ${this.#playerName}`);
      console.log("🤑 🤑 Looks like you've got some money. Let's do it~!");
    } else if (parseFloat(balance) <= 0) {
      console.log(`💀💀💀 Lol, you are broke!`);
      process.exit(0);
    } else {
      console.log("Gotta start with legit 💵 U.S. dollars");
      process.exit(0);
    }
  }

  async makeBet() {
    let amount;

    do {
      const answers = await ask.bettingAmount();
      amount = parseFloat(answers);
      this.#bettingAmount = amount;
    } while (await this.isNotValid(amount));
  }

  async betValidation() {
    console.log("Make another bet?");
    const ans = await ask.yesOrNo();
    if (ans === "no" || ans === "n") {
      console.log("Aye. See ya!");
      process.exit(0);
    } else if (ans === "yes" || ans === "y") {
      return;
    } else {
      helper.displaySadness();
      return await this.betValidation();
    }
  }

  async isNotValid(amount) {
    if (!parseFloat(amount)) {
      console.log("I may be a program 😒, but I speak human only.");
      return true;
    }
    if (amount > this.#balance) {
      console.log("Uhhh...You might want to check your balance 🙄. Bet lower");
      await this.betValidation();
      return true;
    } else {
      console.log("👍 That is a legit bet!");
      helper.allIner(this.#bettingAmount, this.#balance);
      return false;
    }
  }

  async makeStartingHands() {
    const spinner = createSpinner("Shuffling Cards...").start();
    await timer.loader();

    this.#deck = new Deck();

    if (this.#deck) {
      spinner.success({
        text: `😎 Alright ${this.#playerName}, cards are all set!\n`,
      });
    }

    // At the beginning, player and dealer both draw 2 cards
    this.#playerHand.push(this.#deck.drawACard());
    this.#playerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());

    // Show the hands at the start, two cards each
    console.log("Dealer hand");
    // second argument is whether to fold the first card
    // Since one of dealer's card will be folded until it has to reveal
    print.hand(this.#dealerHand, true);
    console.log("----------");

    console.log("Player hand");
    print.hand(this.#playerHand);
    console.log();
  }

  // entire game process
  async game() {
    await this.startGame();
    do {
      if (this.#balance > 0) {
        await this.makeBet();
        await this.makeStartingHands();
        await this.gameState();
      } else {
        helper.lostAndGone();
        process.exit(0);
      }
    } while (await this.validateAnotherRound());
    this.#gameSummary.display();
  }

  // Each round process, including each time a card is drawn
  async gameState() {
    while (
      this.#playerHand.length != 5 ||
      this.calculate(this.#playerHand) < 21
    ) {
      if (await this.drawPrompt()) {
        this.#playerHand.push(this.#deck.drawACard());
        this.showHands();
        if (this.calculate(this.#playerHand) > 21) {
          await this.finishGame();
          break;
        }
        if (
          this.#playerHand.length === 5 &&
          this.calculate(this.#playerHand) <= 21
        ) {
          await this.finishGame();
          break;
        }
      } else {
        this.dealerPlay();
        await this.finishGame();
        break;
      }
    }
    this.#gameSummary.displayBalance();
  }

  // calculate the points a player or dealer has
  calculate(handOfCards) {
    let sum = 0;
    let hasA = 0;

    for (let i = 0; i < handOfCards.length; i++) {
      if (helper.convertRank(handOfCards[i].rank) === 1) {
        hasA++;
      }
      sum += helper.convertRank(handOfCards[i].rank);
    }

    if (hasA > 0) {
      if (21 - (sum + 10) >= 0 && 21 - (sum + 10) < 21 - sum) return sum + 10;
    }
    return sum;
  }

  async drawPrompt() {
    console.log("👀 Would you like a hit? 💰");
    const answer = await ask.yesOrNo();
    if (answer === "yes" || answer === "y") {
      return true;
    } else if (answer === "no" || answer === "n") {
      return false;
    } else {
      helper.displaySadness();
      return await this.drawPrompt();
    }
  }

  async validateAnotherRound() {
    console.log("Would you like another game?");
    const ans = await ask.yesOrNo();
    if (ans === "yes" || ans === "y") {
      return true;
    } else if (ans === "no" || ans === "n") {
      return false;
    } else {
      helper.displaySadness();
      return await this.validateAnotherRound();
    }
  }

  // After player stop drawing cards, dealer will play too
  dealerPlay() {
    while (
      this.calculate(this.#dealerHand) < 18 &&
      this.#dealerHand.length < 5 &&
      this.calculate(this.#dealerHand) <= this.calculate(this.#playerHand)
    ) {
      this.#dealerHand.push(this.#deck.drawACard());
    }
  }

  // Closing up the game
  async finishGame() {
    console.log(`Stop!...`);
    this.showHands(false);

    const spinner = createSpinner(
      "Analyzing winner... with my super AI brain💾"
    ).start();
    await timer.loader();
    const who = this.whoWins();
    if (who === "player") {
      spinner.success({
        text: `👍 Good work ${this.#playerName}, that was impressive 👏\n`,
      });
    } else if (who === "dealer") {
      spinner.error({
        text: `💀 Lol, that was easy money. Thank you! ${this.#playerName}\n`,
      });
    } else {
      spinner.stop({ text: ` A draw is a draw!\n` });
    }
    this.reset();
  }

  // After a game, player and dealer hands should be reset, and deck too
  reset() {
    this.#playerHand = [];
    this.#dealerHand = [];
    this.#deck = new Deck();
  }

  // Show both players hands
  showHands(fold = true) {
    // console.clear();

    console.log();
    console.log("Dealer hand");
    // second argument is whether to fold the first card
    // Since one of dealer's card will be folded until it has to reveal
    print.hand(this.#dealerHand, fold);
    this.#dealerHand.forEach(() => {
      process.stdout.write("------");
    });

    console.log();

    console.log("Player hand");
    print.hand(this.#playerHand);
    console.log();
  }

  // Set balance to both the object balance and game summary balance each time it is changed
  setBalance(bal) {
    this.#balance += bal;
    this.#gameSummary.addBalance(bal);
  }

  whoWins() {
    console.log();
    console.log("Dealer has ", this.calculate(this.#dealerHand));
    console.log("Player has ", this.calculate(this.#playerHand));

    if (this.calculate(this.#playerHand) > 21) {
      console.log("Dealer wins. ");
      this.#gameSummary.addGamesLost();
      this.setBalance(this.#bettingAmount * -1);

      return "dealer";
    } else if (
      this.#playerHand.length === 5 &&
      this.calculate(this.#playerHand) <= 21
    ) {
      console.log("🎉 You win. That's a 5-Card Charlie. Cool!");
      this.#gameSummary.addGamesWon();
      this.setBalance(this.#bettingAmount);

      return "player";
    } else if (
      this.calculate(this.#playerHand) === this.calculate(this.#dealerHand)
    ) {
      console.log("It's a draw. Can you believe it 🤢");
      this.#gameSummary.addGamesTied();
      return "draw";
    } else if (
      this.calculate(this.#playerHand) <= 21 &&
      this.calculate(this.#dealerHand) > 21
    ) {
      console.log("🎉 You win.");
      this.#gameSummary.addGamesWon();
      this.setBalance(this.#bettingAmount);
      return "player";
    } else {
      if (this.calculate(this.#playerHand) > this.calculate(this.#dealerHand)) {
        console.log("You win.");
        this.#gameSummary.addGamesWon();
        this.setBalance(this.#bettingAmount);

        return "player";
      } else {
        console.log("Dealer wins. ");
        this.#gameSummary.addGamesLost();
        this.setBalance(this.#bettingAmount * -1);
        return "dealer";
      }
    }
  }
}
