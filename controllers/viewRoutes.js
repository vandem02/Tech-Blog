const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// dashboard.handlebars
router.get("/dashboard", withAuth, async (req, res) => {
  const posts = await Post.findAll({
    where: {
      id: req.session.user.id,
    },
    raw: true,
    order: [["created_at", "DESC"]],
    include: User
  });
  res.render("dashboard", {
    posts,
    user: req.session.user,
  });
});

// home.handlebars
router.get("/", async (req, res) => {
  let posts = await Post.findAll({
    order: [["created_at", "DESC"]],
    include: User
  });
  posts = posts.map(post => post.get({ plain: true }))
  console.log(posts)
  res.render("home", {
    posts,
    user: req.session.user,
  });
});

// edit-post.handlebars
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
    include: [
      {
        model: Comment,
        include: User,
      },
      {
        model: User,
      },
    ],
  });
  if (!post) {
    res.status(404).json({ message: "No post found with that id!" });
    return;
  }
  res.render("edit-post", {
    post,
    isAuthor: post.user_id == req.session.user.id,
    user: req.session.user,
  });
});

// view-post.handlebars
router.get("/post/:id", async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
    include: [
      {
        model: Comment,
        include: User,
      },
      {
        model: User,
      },
    ],
  });
  if (!post) {
    res.status(404).json({ message: "No post found with that id!" });
    return;
  }
  res.render("post", {
    post,
    isAuthor: post.user_id == req.session.user.id,
    user: req.session.user,
  });
});

// login.handlebars
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    user: req.session.user,
  });
});

// signup.handlebars
router.get("/signup", (req, res) => {
  res.render("signup", {
    user: req.session.user,
  });
});

module.exports = router;
