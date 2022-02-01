import chalk from "chalk";

export default class GameSummary {
  #balance;
  #gamesWon;
  #gamesLost;
  #gamesTied;

  constructor(balance) {
    this.#balance = balance;
    this.#gamesWon = 0;
    this.#gamesLost = 0;
    this.#gamesTied = 0;
  }

  set balance(bal) {
    this.#balance = bal;
  }

  get balance() {
    return this.#balance;
  }

  addBalance(amount) {
    this.#balance += amount;
  }

  addGamesWon() {
    this.#gamesWon++;
  }

  addGamesLost() {
    this.#gamesLost++;
  }

  addGamesTied() {
    this.#gamesTied++;
  }

  get gamesWon() {
    return this.#gamesWon;
  }

  get gamesLost() {
    return this.#gamesLost;
  }

  get gamesTied() {
    return this.#gamesTied;
  }

  display() {
    console.log("📃- Here's a little summary for the games you've played:");
    console.log("Games won  " + this.gamesWon);
    console.log("Games lost " + this.gamesLost);
    console.log("Games tied " + this.gamesTied);
    console.log("Your final balance: $", this.balance);
  }

  displayBalance() {
    console.log(
      `You have 💵 $${chalk.bgWhite(chalk.black(this.balance))} now!\n`
    );
  }
}
