#!/usr/bin/env node

require("dotenv").config();

console.log("session : ", process.env.BARD_SESSION);

const Bard = require("./src/bard.js");

module.exports = Bard;

if (require.main === module) {
  console.log("CALLED FROM CLI");

  const bard = new Bard(process.env.BARD_SESSION);
  (async () => {

   const result = await bard.ask("What is the meaning of life?");
   console.log("Result:", result);
 })();
}
