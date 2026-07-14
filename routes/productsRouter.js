const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"),async function(req,res){

try{let {  name , price   ,category  , description  } = req.body;

  let product = await productModel.create({
    image : req.file.buffer,
    name,
    price,
    category,
    description
  });
  req.flash("success" , "Product Created Successfully");
  res.redirect("/owners/admin");
}catch(err){
  res.send(err.message);
}
});

module.exports = router;