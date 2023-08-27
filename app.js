const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Postum = require("./models/Postum");

const postController = require("./controller/postController");
const pageController = require("./controller/pageController");


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
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
); //PUT VE DELETE Requestlerini POST Request gibi simüle etmek için kullanılır.

//ROUTES
app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPage);
app.get("/", postController.getAllPosts);
app.get("/postupdate/:id", postController.editPostGet);
app.get("/post/:id", postController.getPost);
app.post("/posts", postController.createPost);
app.put("/post/:id", postController.updatePostPut);
app.delete("/postdelete/:id", postController.deletePost);




app.listen(3000, () => {
  console.log("Sunucu 3000 portunda başlatıldı..");
});
