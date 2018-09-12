const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write('' + output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
 //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
       case "echo":
        //we will add the functionality of echo next within the object commandLibrary
         commandLibrary.echo(userInputArray.slice(1).join(" "));
         break;
       case "cat":
        commandLibrary.cat(userInputArray.slice(1));
        break;
      case "head":
        commandLibrary.head(userInputArray.slice(1));
      case "tail":
        commandLibrary.tail(userInputArray.slice(1));
      default:
        done('\x1b[31m\x1b[5mCommand does not exist' + '\n\x1b[0mAvailable commands are:\necho\ncat\nhead\ntail');
     }
}

//where we will store the logic of our commands
const commandLibrary = {

  "echo": function(userInput) {
      done(userInput);
  },
  //the cat command
  "cat": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data) => {
         if (err) throw err;
         done(data);
     });
 },

  "head": function(path) {
    const file = path[0];
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        const docArr = data.toString().split('\n');
        let tempArr = [];
        const n = 5;
        for (var i = 0; i < n; i++) {
          docArr[i] = docArr[i].replace(',', (i + 1)) + '\n';
          tempArr.push(docArr[i]);
        }
        done(tempArr);
    });
  },

  "tail": function(path) {
    const file = path[0];
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        const docArr = data.toString().split('\n');
        let tempArr = [];
        const s = docArr.length - 6;
        const n = docArr.length - 1;
        for (var i = s; i < n; i++) {
        docArr[i] = docArr[i].replace(',', i + 1) + '\n';
        tempArr.push(docArr[i]);
      }
      done(tempArr);
  });
},

};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
