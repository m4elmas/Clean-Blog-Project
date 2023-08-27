const Postum = require("../models/Postum");


exports.getAllPosts = async (req, res) => {
  const posts = await Postum.Post.find({}).sort("-DateCreated");
  res.render("index", {
    posts,
  });
};

exports.editPostGet = async (req, res) => {
  const postid = await Postum.Post.findOne({ _id: req.params.id });
  res.render("edit_post", {
    postid,
  });
};

exports.getPost = async (req, res) => {
  const postid = await Postum.Post.findById(req.params.id);
  res.render("post", { postid });
};


exports.createPost = async (req, res) => {
    await Postum.Post.create(req.body);
    res.redirect("/");
  }

  exports.updatePostPut = async (req, res) => {
    const posts = await Postum.Post.findOne({ _id: req.params.id });
    posts.title = req.body.title;
    posts.description = req.body.description;
    posts.save();
    res.redirect(`/post/${req.params.id}`);
  }

  exports.deletePost = async (req, res) => {
    await Postum.Post.findByIdAndDelete({ _id: req.params.id });
    res.redirect("/");
  }