const express = require('express');
const router = express.Router();
// const app = require();

router.get("/",function(req,res){
  res.send("hey it's working");
})

module.exports = router;