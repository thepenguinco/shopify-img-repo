const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const passport = require("passport");

const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/image");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

// Make uploads public
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.send("Shopify Image Repository");
});

app.use(authRoutes);
app.use(imageRoutes);

// start server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;
