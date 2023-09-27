const router = require("express").Router();
const { Post } = require("../../models");

router.post("/", (req, res) => {
  try {
    Post.create(req.body);
    res.status(201).end()
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;