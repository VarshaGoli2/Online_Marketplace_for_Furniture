const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  image_link: {
    type: String,
  },
  seller_id: {
    type: String,
  },
  price: {
    mrp: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    shipping_cost: {
      type: Number,
    },
  },
  product_address: {
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
  registration_date: {
    type: Date,
    default: Date.now,
  },
  purchase_date: {
    type: Date,
  },
  is_sold: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  shortDesc: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = Product = mongoose.model("Product", ProductSchema);
