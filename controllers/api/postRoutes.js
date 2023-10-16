const router = require("express").Router();
const { Post } = require("../../models");

router.post("/", async (req, res) => {
  const {title, text} = req.body
  try {
    await Post.create({
      title,
      text,
      user_id: req.session.user.id
    });
    res.status(201).end()
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    Post.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).end()
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!result) {
      res.status(404).json({ message: "No post exists with this ID." });
      return;
    }
    res.status(200).end()
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;