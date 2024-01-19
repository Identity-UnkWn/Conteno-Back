const express = require("express")
const checker = require("./contolling");


const router = express.Router()

router.post("/check",checker);

module.exports = router