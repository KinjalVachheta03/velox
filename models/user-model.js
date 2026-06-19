const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname : {
    type : String,
    minLength : 3,
    trim:true ,
  },
  lastname: String,
  email:String,
  phone_number:Number,
  password:String,
  
  Cart: {
    type: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    type: Array,
    default : [],
  },
  picture: String

});

module.exports = mongoose.model("user", userSchema);