# Bard <img src="https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg" width="35px" />
Reverse engineering of Google's Bard chatbot API


## Installation
```bash
 $ npm install break-bard --save
```

## Authentication
Go to https://bard.google.com/

- F12 for console
- Copy the values
  - Session: Go to Application → Cookies → `__Secure-1PSID`. Copy the value of that cookie.


## Usage
```javascript
const Bard = require("break-bard")

const bard = new Bard(process.env.BARD_SESSION);
  
(async () => {

   const result = await bard.ask("What is the meaning of life?");
   console.log("Result:", result);
 })();
```


Credits:
-- [acheong08](https://github.com/acheong08) - Derivative of his python version