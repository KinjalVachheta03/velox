const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
 image : Buffer,
 name : String,
 price : Number,
 category: String,
 description : String
});

module.exports = mongoose.model("product", productSchema);

