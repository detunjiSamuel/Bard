#!/usr/bin/env node

require("dotenv").config();

console.log("session : ", process.env.BARD_SESSION);

const Bard = require("./src/bard.js");

// console.log(new Bard(process.env.BARD_SESSION).ask('What is the meaning of life?'))

/**
 * 
 * Figure out sessions for logged in user
 * 
 * Pass question to bard if session is present
 * 
 * print answer to user 
 * 
 * 

 */

module.exports = Bard;

if (require.main === module) {
  console.log("CALLED FROM CLI");

  const bard = new Bard(process.env.BARD_SESSION);

  console.log("result:" , bard.ask("What is the meaning of life?"));
}
