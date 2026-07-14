const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname : {
    type : String,
    minLength : 3,
    trim:true ,
  },
  email:String,
  password:String,
  contact :Number,
  
  Cart: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref : "product",
  },
],
  orders: {
    type: Array,
    default : [],
  },
  picture: Buffer

});

module.exports = mongoose.model("user", userSchema);