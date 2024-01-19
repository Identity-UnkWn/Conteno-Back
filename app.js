const express = require("express")
const router = require("./router");
const cors = require("cors")


const app = express();

// app.use(bodyparser.json())

app.use(express.json());

app.use(cors({
    origin:"http://127.0.0.1:5500",
    credentials:true
}))

app.use("/",router);

app.use("/ping",(req,res)=>{
    res.send("pong ping pong");
    console.log(req.body);
})

module.exports = app;