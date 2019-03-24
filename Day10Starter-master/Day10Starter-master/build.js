const path = require("path")
const fs = require("fs")
const {promisify} = require("util");
const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

//Starting from https://stackoverflow.com/questions/43728530/nodejs-concatenate-all-files-in-a-directory
//And including http://2ality.com/2017/05/util-promisify.html

var directories = ["./geo", "./physics", "./components", "./engine"];
var destination = "gameEngine.js";
let everything = "";

let allFiles = [];

for(let i = 0; i < directories.length; i++){
  let files = fs.readdirSync(directories[i]);
  for(let j = 0; j < files.length; j++){
    allFiles.push(directories[i] + "/" + files[j]);
  }
}

console.log(allFiles);




everything = allFiles
              .map(file=>{return {name:file, content: fs.readFileSync( file)}})
              .reduce((a,b)=>(a+"\n//" + b.name + "\n" + b.content), everything);


console.log(everything);

fs.writeFileSync(destination, everything);
  