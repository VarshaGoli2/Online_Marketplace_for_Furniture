const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

router.post("/payment", async (req, res) => {
  const {
    product_ids,
    seller_id,
    buyer_id,
    mrp,
    tax,
    shipping_cost,
    street,
    city,
    state,
    zipCode,
  } = req.body;

  try {
    const newOrder = new Order({
      product_ids,
      buyer_id,
      seller_id,
      cost: parseFloat(mrp) + parseFloat(tax) + parseFloat(shipping_cost),
      shipped_address: {
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
      },
    });
    await newOrder.save();

    // await Product.findByIdAndUpdate(product_id,{$set : {is_sold:true,purchase_date:Date.now()}});
    await Product.updateMany(
      { _id: { $in: product_ids } },
      { $set: { is_sold: true } },
      { multi: true }
    );
    await User.findOneAndUpdate(
      { username: buyer_id },
      { $push: { bought_products_id: product_ids } }
    );

    res.json({ message: "Order registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
