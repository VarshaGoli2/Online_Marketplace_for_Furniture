const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage,  limits: {
  fieldSize: 10 * 1024 * 1024, // 10 MB (adjust as needed)
}, });

router.post("/add", upload.single('image123'), async (req, res) => {
  const {
    title,
    category,
    seller_id,
    mrp,
    tax,
    shipping_cost,
    street,
    city,
    state,
    zipCode,
    quantity,
    username,
    description,
    shortDesc
  } = req.body;

  try {
    const newProduct = new Product({
      title,
      category,
      image_link:`data:image/png;base64,${req.file.buffer.toString('base64')}`,
      seller_id,
      price: {
        mrp: mrp,
        tax: tax,
        shipping_cost: shipping_cost,
      },
      product_address: {
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
      },
      quantity,
      description,
      shortDesc
    });
    await newProduct.save();

    await User.findOneAndUpdate(
      { username },
      { $push: { sell_products_id: newProduct._id } }
    );

    res.json({ message: "Product registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/list", async (req, res) => {
  try {
    const {
      category,
      min_price,
      max_price,
      start_date,
      end_date,
      state,
      title,
    } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (min_price && max_price) {
      filter["price.mrp"] = {
        $gte: parseInt(min_price),
        $lte: parseInt(max_price),
      };
    }

    if (start_date && end_date) {
      filter.registration_date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      };
    }

    if (state) {
      filter["product_address.state"] = state;
    }

    if (title) {
      const regex = new RegExp(title, "i");
      filter.title = { $regex: regex };
    }

    // Query the database to find products based on the applied filters
    const products = await Product.find(filter, {
      price: 1,
      image_link: 1,
      category: 1,
      title: 1,
      is_sold:1
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id/:username", async (req, res) => {
  const product_id = req.params.id;
  const result = await Product.findByIdAndDelete({ _id: product_id });
  const username = req.params.username;
    const currentUser = await User.findOne({ username });
    const sell_products_id = currentUser.sell_products_id;
    const product_obj_id = new mongoose.Types.ObjectId(product_id);
    const index = sell_products_id.indexOf(product_obj_id);

      currentUser.sell_products_id.splice(index, 1);
 
    await currentUser.save();
  if (!result) res.status(404).send("Error");
  else res.status(200).send("Product deleted successfully");
});

router.put("/edit/:id", upload.single('image123'),async (req, res) => {
  const product_id = req.params.id;
  const {
    title,
    category,
    image_link,
    seller_id,
    mrp,
    tax,
    shipping_cost,
    street,
    city,
    state,
    zipCode,
    quantity,
    description,
    shortDesc
  } = req.body;
  const result = await Product.findByIdAndUpdate(
    { _id: product_id },
    {
      title,
      category,
      image_link:req.file ? `data:image/png;base64,${req.file.buffer.toString('base64')}` : image_link,
      seller_id,
      price: {
        mrp: mrp,
        tax: tax,
        shipping_cost: shipping_cost,
      },
      product_address: {
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
      },
      quantity,
      description,
      shortDesc
    }
  );
  if (!result) res.status(400).send("Error");
  else res.status(200).send("Product updated successfully");
});

router.get("/details/:product_id", async (req, res) => {
  try {
    const product_id = req.params.product_id;

    // Validate input parameter
    if (!product_id) {
      return res
        .status(400)
        .json({ error: "Product_id parameter is required." });
    }

    // Query the database to find the product with the specified product_id
    const product = await Product.findOne({ _id: product_id });

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Response with product details
    const productDetails = {
      _id:product._id,
      price: product.price,
      image_link: product.image_link,
      category: product.category,
      title: product.title,
      product_address: product.product_address,
      registration_date: product.registration_date,
      quantity: product.quantity,
      description:product.description,
      shortDesc:product.shortDesc,
      is_sold: product.is_sold
    };
    res.json(productDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update_favorite/:product_id/:username", async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const product_obj_id = new mongoose.Types.ObjectId(product_id);
    const username = req.params.username;
    const currentUser = await User.findOne({ username });
    const fav_ids = currentUser.fav_products_id;

    const index = fav_ids.indexOf(product_obj_id);
    if (index === -1) {
      currentUser.fav_products_id.push(product_obj_id);
    } else {
      currentUser.fav_products_id.splice(index, 1);
    }
    await currentUser.save();
    res.status(200).send("Updated product to favorite");
  } catch {
    res.status(500).send("server error");
  }
});



module.exports = router;
