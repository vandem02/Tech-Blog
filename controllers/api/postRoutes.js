const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
  let posts = await Post.findAll({
    order: [["created_at", "DESC"]],
    include: [{
      model: User
    },
    {
      model: Comment,
    }]
  });
  posts = posts.map(post => post.get({ plain: true }))
  console.log(posts)
  res.json(posts)
});

router.post("/", (req, res) => {
  const {title, text} = req.body
  try {
    Post.create({
      title,
      text,
      user_id: req.session.user.id
    });
    res.status(201).end()
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;