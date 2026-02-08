// keep-alive server (مهم لـ Railway)
require("http").createServer((req, res) => res.end("OK")).listen(3000);

const { fork } = require("child_process");

const tokens = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3,
];

// شغّل كل بوت بعد الثاني (تجنّب rate limit)
tokens.forEach((token, i) => {
  if (!token) return;
  setTimeout(() => {
    fork("./bot.js", [token]);
  }, i * 8000);
});
