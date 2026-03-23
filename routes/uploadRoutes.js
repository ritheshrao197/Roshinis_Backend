
const express = require("express");
const router = express.Router();

router.post("/",(req,res)=>{
 res.json({message:"Image upload endpoint placeholder"});
});

module.exports = router;
