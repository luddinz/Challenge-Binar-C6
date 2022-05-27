const { ugamehistory } = require("./models");

ugamehistory
  .create({
    userGameId: 58,
    score: 7960,
  })
  .then((ugamehistory) => {
    console.log(ugamehistory);
  });
