const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  is_seller: {
    type: Boolean,
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
  },
  sell_products_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  bought_products_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  password: {
    type: String,
    required: true,
  },
  fav_products_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = User = mongoose.model("User", UserSchema);
