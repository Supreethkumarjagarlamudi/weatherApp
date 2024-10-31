const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Preferences = require("../models/preferences.js");

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", async (req, res) => {
  res.render("home.ejs");
});

router.post("/updateCities", async (req, res) => {
  let updatedCities = req.body.cityArray;
  updatedCities = JSON.parse(updatedCities);

  let update = await Preferences.findOneAndUpdate(
    { sessionID: req.sessionID },
    { cities: updatedCities }
  );
  console.log(update, "updated Successfully");
  res.redirect("/home");
});

router.post("/updateTemp", async (req, res) => {
  let newTemp = req.body.temp;

  let update = await Preferences.findOneAndUpdate(
    { sessionID: req.sessionID },
    { alertAt: newTemp }
  );
  console.log(update, "updated Successfully");
  res.redirect("/home");
})
module.exports = router;
