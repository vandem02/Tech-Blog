const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// home.handlebars
router.get("/", async (req, res) => {
  let posts = await Post.findAll({
    include: [User, Comment],
    order: [["created_at", "DESC"]],
  });
  posts = posts.map((post) => post.get({ plain: true }));
  res.render("home", {
    posts,
    user: req.session.user,
  });
});

// dashboard.handlebars
router.get("/dashboard", withAuth, async (req, res) => {
  let posts = await Post.findAll({
    where: {
      user_id: req.session.user.id,
    },
    include: [User, Comment],
    order: [["created_at", "DESC"]],
  });
  posts = posts.map((post) => post.get({ plain: true }));
  res.render("dashboard", {
    posts,
    user: req.session.user,
  });
});

// edit-post.handlebars
router.get("/edit/:id", async (req, res) => {
  let post = await Post.findByPk(req.params.id);
  post = post.get({ plain: true });
  if (!post) {
    res.status(404).json({ message: "No post found with that id!" });
    return;
  }
  res.render("edit-post", {
    post,
    user: req.session.user,
  });
});

// view-post.handlebars
router.get("/post/:id", async (req, res) => {
  let post = await Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: User,
      }
    ],
    order: [[Comment, "created_at", "DESC"]],
  });
  post = post.get({ plain: true });
  if (!post) {
    res.status(404).json({ message: "No post found with that id!" });
    return;
  }
  res.render("view-post", {
    post,
    isAuthor: req.session.user ? post.user_id == req.session.user.id : false,
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

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.redirect("/")
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
