let fs = require("fs");
let express = require("express");
let path = require("path");
const mime = require('mime');

let dirPath = path.join(__dirname, "timestamp");

let app = express();

let port = 9001

app.listen(port, ()=>{
    console.log("connected");
})
console.log(dirPath)

app.get("/time", (req, res)=>{
    let time = new Date();
    let timestamp = time.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})+" IST";
    fs.writeFileSync(`${dirPath}/current time-stamp.txt`,timestamp, (err)=>{
        if(err){
            res.send({message:"Error writing file"});
        }
    })
    res.sendFile(path.join(dirPath, "current time-stamp.txt"))
})




app.get("/text-files", (req, res)=>{
    let dir = path.join(__dirname, "dir");
    
    fs.readdir(dir, (err, files)=>{
        if(err){
            res.send("error reading directory");
            
        }
        const textFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');
        res.json({textFiles});

    })
    
})