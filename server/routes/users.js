const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const Product = require("../models/Product");
const { default: mongoose } = require("mongoose");

// @route GET api/users
// @desc Test route
// @access Public
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


// Serialize user to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const session = require('express-session');

const app = express();

// ...

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

router.post("/signup", async (req, res) => {
  // const {
  //   username,
  //   email,
  //   fname,
  //   lname,
  //   phone,
  //   password,
  //   street,
  //   city,
  //   state,
  //   zipCode,
  //   is_seller,
  // } = req.body;

  const {
    username,
    email,
    fname,
    lname,
    password,
  } = req.body;


  if (!/^[A-Za-z\s]+$/.test(username)) {
    return res.status(400).json({ message: "Invalid username format." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Password rules
  const passwordMinLength = 8;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (password.length < passwordMinLength) {
    return res.status(400).json({
      message: `Password must be at least ${passwordMinLength} characters long.`,
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    });
  }

  // if (!/^\d+$/.test(phone)) {
  //   return res
  //     .status(400)
  //     .json({ message: "Invalid phone format. Use numbers only." });
  // }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    // const newUser = new User({
    //   username,
    //   password: hashedPassword,
    //   email,
    //   phone,
    //   fname,
    //   lname,
    //   is_seller,
    //   address: {
    //     street: street,
    //     city: city,
    //     state: state,
    //     zipCode: zipCode,
    //   },
    // });

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      fname,
      lname,
    });
    await newUser.save();

    res.json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Pass the error to the error handler middleware
    }

    if (!user) {
      // Authentication failed
      return res.status(401).json({ message: 'Login failed: Invalid username or password.' });
    }

    // Authentication successful
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Login successful' });
    });
  })(req, res, next);
});


router.get("/userInfo/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const currentUser = await User.findOne({ $or: [{ username }] });
    if (currentUser) {
      return res.status(200).json({
        username: currentUser.username,
        fname: currentUser.fname,
        lname: currentUser.lname,
        is_seller: currentUser.is_seller,
        phone: currentUser.phone,
        street: currentUser.address.street,
        city: currentUser.address.city,
        state: currentUser.address.state,
        zipCode: currentUser.address.zipCode,
        sell_products_id:currentUser.sell_products_id,
        bought_products_id:currentUser.bought_products_id,
        fav_products_id:currentUser.fav_products_id
      });
    } else {
      res.status(400).json({ message: "User Doesn't Exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/edit/:username", async (req, res) => {
  console.log("IN edit")
  console.log(req)
  const userId = req.params.username;
  const {username, fname, lname, phone, street, city, state, zipCode } = req.body;
  const result = await User.findOneAndUpdate(
    { username:userId },
    {
      username,
      fname,
      lname,
      phone,
      address: {
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
      },
    }
  );
  if (!result) res.status(404).send("Error while updating");
  else res.status(200).send("User info updated successfully");
});

router.get("/sellingList/:username", async (req, res) => {
  const username = req.params.username;
  const seller = await User.findOne({ username });
  const seller_ids = seller.sell_products_id;
  const productList = await Promise.all(
    seller_ids.map(async (id) => {
      const tempProduct = await Product.findOne(
        { _id: id },
        { price: 1, image_link: 1, category: 1, title: 1, is_sold: 1 }
      );
      return tempProduct;
    })
  );

  if (productList) res.status(200).json(productList);
  else res.status(400).send("No Products Exists");
});

router.get("/buyingList/:username", async (req, res) => {
  const username = req.params.username;
  const buyer = await User.findOne({ username });
  const buyer_ids = buyer.bought_products_id;
  const productList = await Promise.all(
    buyer_ids.map(async (id) => {
      const tempProduct = await Product.findOne(
        { _id: id },
        { price: 1, image_link: 1, category: 1, title: 1, is_sold: 1 }
      );
      return tempProduct;
    })
  );

  if (productList) res.status(200).json(productList);
  else res.status(400).send("No Products Exists");
});

router.get('/fav_list/:username', async (req, res) => {
  const username = req.params.username;
  const currentUser = await User.findOne({ username });

  const fav_ids = currentUser.fav_products_id;
  const productList = await Promise.all(
    fav_ids.map(async (id) => {
      const tempProduct = await Product.findOne(
        { _id: id },
        { price: 1, image_link: 1, category: 1, title: 1, is_sold: 1 }
      );
      return tempProduct;
    })
  );

  if (productList) res.status(200).json(productList);
  else res.status(400).send("No Products Exists");
});


module.exports = router;
