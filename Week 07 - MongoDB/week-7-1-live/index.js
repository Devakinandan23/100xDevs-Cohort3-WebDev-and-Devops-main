const express = require('express');
const {UserModel, TodoModel} = require('./db');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const JWT_SECRET = "harkirat123";

mongoose.connect("mongodb+srv://devakinandan:7ngP9yParRFbFKKn@cluster0.wfoft.mongodb.net/todo-devaki-2222");

const app = new express();

app.use(express.json());

app.post("/signup", async function(req,res){

    const name = req.body.name;
    const password = req.body.password;
    const username = req.body.username;

    await UserModel.create({
        name: name,
        password: password,
        username: username
    })

    res.json({
        message: "you are signed up"
    })
});

app.post("/signin",async function(req,res){
    const password = req.body.password;
    const username = req.body.username;

    const user = await UserModel.findOne({
        username: username,
        password: password
    })

    if(user){
        //always forget this/get this wrong 
        const token = jwt.sign({
            id: user._id
        },JWT_SECRET);
        res.json({
            token: token
        })
    } else{
        res.status(403).json({
            message: "userdetails not found"
        })
    }
});

app.post("/todo",function(req,res){
    
});

app.get("/todos",function(req,res){

});

app.listen(3000);