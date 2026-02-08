const { fork } = require("child_process");

const tokens = [
  process.env.MTM4MzA0NDA4ODc4NTQwMzkyNA.G6PRxe.2C-ZpdqOaRQzPFqoVh5cl1OxE7PI8odVeVI810,
  process.env.MTQ2OTQzNDg4OTM1Mzk1MzI5Mg.Gp1_zQ.FQFA-YwB9aGnFV7pVhm4eIhL1_qbPruKsKcmHc,
  process.env.MTQ2OTY3NDQ0ODAyOTM1MjEzMQ.GJBYco.5j1r5Sbgadg2Rmd4B1XTYzwHKFleldGET1x1WM
];

tokens.forEach((token, i) => {
  setTimeout(() => {
    fork("./bot.js", [token]);
  }, i * 7000);
});
