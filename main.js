let inputArray = process.argv.slice(2);

let fs = require("fs");
let path = require("path");

let command = inputArray[0];
let dirPath = inputArray[1];
switch (command) {
    case "tree":
        treeFn(dirPath);
        break;
    case "organize":
        organizeFn(dirPath);
        break;
    case "help":
        helpFn();   
        break;
    default:
        console.log("Please input the correct command");
        break;
}

function treeFn(dirPath){
    console.log("Tree implemented for", dirPath);   
}
function organizeFn(dirPath){
    console.log("Organize implemented for", dirPath); 
    /*
    1. input -> dir path given
    2. create -> org_files dir
    3. identify categories of all the files present in that input array
    4. copy/cut files to that org_dir inside any categorised folder
    */
    let dest;
    if(dirPath == undefined){
        console.log("Enter Path");
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            dest = path.join(dirPath, "org_files");
            if (fs.existsSync(dest) == false) {
                fs.mkdirSync(dest);
            }
        }else{
            console.log("Enter the correct path");
            return;
        }
    }
    organizeHelper(dirPath, dest);
    
}

function organizeHelper(src,dest){
     let childNames = fs.readdirSync(src);
     //console.log(childNames);
     for (let i = 0 ; i < childNames.length; i++ ) {
         let childAddress = path.join(src, childNames[i]);
         let isFile = fs.lstatSync(childAddress).isFile();
         if(isFile){
             //console.log(childAddress);
            let ext = getCategory(childAddress);
         }
     }
      
}
function getCategory(name){
    return path.extname(name);
    //console.log(ext);
}

function helpFn(){
    console.log(`
    List of all the commands:
    -> node main.js tree "dirPath"
    -> node main.js organize "dirPath"
    -> node main.js help
    `);
}