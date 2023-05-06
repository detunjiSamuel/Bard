

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

require('dotenv').config()

class person {
 constructor(name, age) {
  this.name = name;
  this.age = age;
}
 sayName() {
  console.log(this.name);
 }

}

console.log(process.env.BARD_SESSION)

console.log(new person('John', 25).sayName())