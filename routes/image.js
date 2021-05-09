const express = require("express");
const passport = require("passport");
const { PrismaClient } = require('@prisma/client');
const app = express.Router();
const SERVER_URL = process.env.SERVER_URL;

const prisma = new PrismaClient();

require("../middleware/auth");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, new Date().getTime() + '-' + file.originalname),
});

var upload = multer({
  storage: storage,
});

// Create Image Endpoint
app.post("/images/create", passport.authenticate("jwt", { session: false}), upload.single("contentimage"), async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: req.user.email
      }
    })
    const { title, description } = req.body
    const image = await prisma.images.create({
      data: {
        user_id: user.id,
        title: title,
        description: description,
        contentimage: SERVER_URL + req.file.path,
      },
    });
    if (image) {
      res.json(image);
    }
    else {
      res.sendStatus(400);
    }
  }
  catch(err) {
    console.log(err);
    res.sendStatus(400);
  }

});

// Collect All Images Endpoint
app.get("/images", async (req, res) => {
  const images = await prisma.images.findMany();
  if (images) {
    res.json(images);
  }
  else {
    res.sendStatus(400);
  }
});

module.exports = app;
