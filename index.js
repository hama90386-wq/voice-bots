const { fork } = require("child_process");

const tokens = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3
];
tokens.forEach((token, i) => {
  setTimeout(() => {
    fork("./bot.js", [token]);
  }, i * 7000);
});

