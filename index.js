let fs = require("fs");
let express = require("express");
let path = require("path");

let dirPath = path.join(__dirname, "timestamp");

let app = express();

let port = 9000

app.listen(port, ()=>{
    console.log("connected");
})
console.log(__dirname)

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