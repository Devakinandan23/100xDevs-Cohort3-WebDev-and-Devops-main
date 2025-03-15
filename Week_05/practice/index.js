const express = require('express');
const cors = require('cors');

const app = new express();

app.use(express.json());
app.use(cors());

app.post("/sum",function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    console.log(a,b);
    res.json({
        sum: a + b
    })
})




app.listen(3000);


app.get("/", function (req, res) {
    res.send('Server running')
    // send the index.html file as a response
    // res.sendFile(__dirname + "/public/index.html");
});


// app.get("/",function(req,res){
//     res.sendFile(__dirname + "/public/index.html");
// })