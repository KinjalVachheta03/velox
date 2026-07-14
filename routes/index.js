const express = require('express');
// const app = express();
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require('../models/product-model');
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');


router.get("/", function (req,res){
  let error = req.flash("error");
  res.render("index" , { error });
});

router.get("/shop",async  function(req, res){
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop" , {products , success} );
});


router.get("/addtocart/:productid", isLoggedin ,async  function(req, res){
  let user = await userModel.findOne({email : req.user.email});
  user.Cart.push(req.params.productid);
  await user.save();
  req.flash("success" , "Added to cart");
  res.redirect("/shop");
});

// router.get("/logout", isloggedin , function(req, res){
//   res.render("shop");
// });

// // routes/index.js
// router.get('/products', isLoggedin, (req, res) => {
//     res.render('shop', { title: 'Shop' }); 
// });

module.exports = router;
