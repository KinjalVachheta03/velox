const express = require('express');
const router = express.Router();
const {registerUser , loginUser , logoutUser} = require("../controllers/authController");


router.get("/",function(req,res){
  res.send("hey it's working okay");
});

router.get("/login",function(req,res){
  res.render("login");
});

router.get("/register",function(req,res){
  res.render("register");
});


router.post("/logout" , logoutUser);
router.post("/register", registerUser )

router.post("/login" ,loginUser)

router.get("/logout",logoutUser);

module.exports = router;