async function delayedAsync(delayCondition, delayInSeconds, asyncFn) {
 if (delayCondition) {
   await new Promise(resolve => setTimeout(resolve, delayInSeconds * 1000));
 }
 return asyncFn();
}

module.exports = delayedAsync