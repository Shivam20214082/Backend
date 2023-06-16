const mongoose = require("mongoose");
const validator = require("validator");

const userSchema2 = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  payment_phone_number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentVerified: {
    type: Boolean,
    default: false,
  },
});

//creating a collection

const User2 = mongoose.model("Order", userSchema2);
module.exports = User2;
