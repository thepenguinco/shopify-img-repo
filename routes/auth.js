const express = require("express");
const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");
const app = express.Router();
const _ = require("lodash");
const passport = require("passport");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

require("../middleware/auth");

// Login user
app.post("/auth/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err) throw err;
    if (!user) res.sendStatus(400);
    else {
      req.login(user, async (err) => {
        if (err) throw err;
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.SECRET);
        return res.json({ status: "Successful", token });
      });
    }
  })(req, res, next);
});

// Create a new user
app.post(
  "/auth/register", 
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.sendStatus(400);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.users.create({
        data: {
          email: email,
          password: hashedPassword
        },
      });
      
      if (user) {
        return res.json(_.omit(user, "password"));
      }
    }
    catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
});

app.get("/auth/status", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user) res.send(_.omit(req.user, "password"));
  else res.sendStatus(401);
});

module.exports = app;
