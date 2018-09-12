const fs = require('fs');
fs.readFile('bloc.txt', (err, data) => {
 if (err) throw err;
 console.log("I'm going first");
 console.log("I'm going second");
});
