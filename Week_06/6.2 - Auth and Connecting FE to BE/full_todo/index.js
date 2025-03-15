const express = require('express');
const app = new express();

app.use(express.json());

let tasks = [];

app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/add", function(req,res){
    let task = req.body.task;
    tasks.push({
        task: task
    })
    res.send({
        task: task
    })
})

app.post("/")

app.listen(3000);