const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const format_date = require("../utils/date")

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
  const posts = await Post.findAll({
    raw: true,
    order: [["created_at", "DESC"]],
    include: User
  });
  res.render("home", {
    posts,
    user: req.session.user,
  });
});

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
    user: req.session.user,
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    user: req.session.user,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    user: req.session.user,
  });
});

module.exports = router;