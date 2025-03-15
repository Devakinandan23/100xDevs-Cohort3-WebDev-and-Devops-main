const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomharkiratilovekiara";

const app = new express();

app.use(express.json());

let users = [];

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

function logger(req, res, next){
    console.log(req.method + "request called");
    next();
}

app.post("/signup",logger, function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })
    res.send({
        message: "done"
    })
    console.log(users);
})

app.post("/signin", logger, function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
  
    for(let i = 0; i < users.length; i++){
        if(users[i].username == username && users[i].password == password){
            foundUser = users[i];
        }
    }

    if(foundUser?.username){
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);
        res.send({
            username: foundUser.username,
            password: foundUser.password,
            message: `you have successfully loged in`,
            token: token
        })
    } else{
        res.status(301).send({
            message: "username not found"
        })
    }
})

function auth(req,res,next){
    const token = req.headers.token;
    const decodedDetails = jwt.verify(token,JWT_SECRET);

    if(decodedDetails.username){
        req.username = decodedDetails.username;
        next();
    } else{
        res.json({
            message: "username not found"
        })
    }
}

app.get("/me",logger, auth, function(req,res){
    // const token = req.headers.token;

    // const userDetails = jwt.verify(token,JWT_SECRET);
    // const username = userDetails.username;
    let foundUser = null;

    for(let i = 0; i < users.length; i++){
        if(req.username == users[i].username){
            // res.send({
            //     message: "verified signature, user is legit"
            // })
            foundUser = users[i];
        }
    }

    if(foundUser?.username){
        res.send({
            username: foundUser.username,
            password: foundUser.password,
            message: "token verified"
        })
    } else{
        res.send({
            message: "not verified token, please check and try again"
        })
    }

})



app.listen(3000);