const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const Preferences = require("./models/preferences.js");

const weatherRoute = require("./routes/weatherRoute.js");

const port = 4000;
const dbUrl = "mongodb://127.0.0.1:27017/weatherApp";
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);
app.use(cookieParser());

app.use(
  session({
    secret: "weatherInfo",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000, // 10 minutes
    },
  })
);

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(async (req, res, next) => {
  console.log(req.sessionID);
  let sessionPresent = await Preferences.find({ sessionID: req.sessionID });
  console.log(sessionPresent);
  if (sessionPresent.length == 0) {
    let sessionDetails = new Preferences({
      sessionID: req.sessionID,
      cities: ["Hyderabad", "Chennai", "Delhi", "Mumbai"],
    });
    await sessionDetails.save();
    console.log(sessionDetails, "added Successfully");
  }
  let userDetails = await Preferences.findOne({ sessionID: req.sessionID });
  res.locals.details = userDetails;
  next();
});

app.use("/", weatherRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
