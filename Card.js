export default class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.color = suit === "♥" || suit === "♦" ? "red" : "black";
  }

  get card() {
    return this;
  }
}
