const express = require("express");
const connectDB = require("./config/db");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const session = require("express-session");
const cors = require("cors");

const app = express();

//Connect database
connectDB();

passport.use(
  new LocalStrategy(async (username, password, fullfil) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return fullfil(null, false, { message: "Incorrect username." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return fullfil(null, false, { message: "Incorrect password." });
      }

      return fullfil(null, user);
    } catch (error) {
      return fullfil(error);
    }
  })
);

passport.serializeUser((user, fullfil) => {
  fullfil(null, user.id);
});

passport.deserializeUser(async (id, fullfil) => {
  try {
    const user = await User.findById(id);
    fullfil(null, user);
  } catch (error) {
    fullfil(error);
  }
});

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual origin of your React app
  credentials: true, // Enable credentials (cookies)
}));


//Init middleware, this allows us to get data from req.body
app.use(express.json({ extended: false }));

app.use(
  session({ secret: "LaalGulaab", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

//Define routes
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));

app.post('/logout', (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Logout failed', error: err.message });
      }
      res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error('Unexpected error during logout:', error);
    res.status(500).json({ message: 'Logout failed unexpectedly', error: error.message });
  }
});


const port = 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
