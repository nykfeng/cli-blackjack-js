const convertRank = function (rank) {
  switch (rank) {
    case "A":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "10":
    case "J":
    case "Q":
    case "K":
      return 10;
    default:
      return 0;
  }
};

const displaySadness = function () {
  console.log(
    `😔 I am just a program, I can only take yes or no as an answer.`
  );
};

const allIner = function (bet, bal) {
  if (bet === bal) {
    console.log(
      `🤩 All in?? That's the spirit. Life is too short to not go all in.`
    );
  }
};

const lostAndGone = function () {
  console.log("Ooooo, you don't have money~");
  console.log(
    "Work hard and come lose again next time. I mean win again next time.😎\n"
  );
};

export default {
  allIner,
  convertRank,
  displaySadness,
  lostAndGone,
};
