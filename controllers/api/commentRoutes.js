const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", (req, res) => {
  const { text, post_id } = req.body;
  try {
    Comment.create({
      text,
      post_id,
      user_id: 2,
    });
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;