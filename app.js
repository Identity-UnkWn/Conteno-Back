const express = require("express")
const router = require("./router");
const cors = require("cors")


const app = express();

// app.use(bodyparser.json())

app.use(express.json());

//app.use(cors({
   // origin:"*",
   // credentials:true
//}))

app.use((req, res, next) => {
    console.log('Received request from origin:', req.headers.origin);
    next();
});

app.use(cors({
    origin: 'https://conteno-front.pages.dev',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://conteno-front.pages.dev');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/",router);

app.use("/ping",(req,res)=>{
    res.send("pong ping pong");
    console.log(req.body);
})

module.exports = app;
