const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", (req, res) => {
  const { text, post_id } = req.body;
  try {
    Comment.create({
      text,
      user_id: req.session.user.id,
      post_id
    });
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!result) {
      res.status(404).json({ message: "No comment exists with this ID." });
      return;
    }
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;