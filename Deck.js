import Card from "./card.js";

export default class Deck {
  #cards = [];
  #suits = ["♠", "♥", "♣", "♦"];
  constructor() {
    this.createDeck();
    this.shuffleDeck();
  }

  get cards() {
    return this.#cards;
  }

  createDeck() {
    for (let i = 1; i <= 13; i++) {
      switch (i) {
        case 1:
          this.#suits.forEach((suit) => {
            this.#cards.push(new Card(suit, "A"));
          });
          break;
        case 11:
          this.#suits.forEach((suit) => {
            this.#cards.push(new Card(suit, "J"));
          });
          break;
        case 12:
          this.#suits.forEach((suit) => {
            this.#cards.push(new Card(suit, "Q"));
          });
          break;
        case 13:
          this.#suits.forEach((suit) => {
            this.#cards.push(new Card(suit, "K"));
          });
          break;
        default:
          this.#suits.forEach((suit) => {
            this.#cards.push(new Card(suit, i.toString()));
          });
      }
    }
  }

  shuffleDeck() {
    for (let i = 0; i < this.#cards.length; i++) {
      let rand = Math.floor(Math.random() * this.#cards.length);

      let temp = new Card(this.#cards[i].suit, this.#cards[i].rank);

      this.#cards[i].suit = this.#cards[rand].suit;
      this.#cards[i].rank = this.#cards[rand].rank;
      this.#cards[i].color = this.#cards[rand].color;

      this.#cards[rand].suit = temp.suit;
      this.#cards[rand].rank = temp.rank;
      this.#cards[rand].color = temp.color;
    }
  }

  drawACard() {
    return this.#cards.shift();
  }
}
