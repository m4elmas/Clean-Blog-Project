const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

const Postum = require("./models/Postum");

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//CONNECT DB
mongoose.connect("mongodb://localhost/cleanblog-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MİDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //urldeki datayı okumayı sağlıyor.
app.use(express.json()); //okunan veriyi json formatına dönüştürür.

//ROUTES
app.get("/", async (req, res) => {
  const posts = await Postum.Post.find({});
  res.render("index", {
    posts
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});
app.post("/posts", async (req, res) => {
  await Postum.Post.create(req.body);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Sunucu 3000 portunda başlatıldı..");
});
