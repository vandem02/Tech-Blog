const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(401).json({ message: "Incorrect email or password." });
      return;
    }

    const validatePassword = await user.checkPassword(password);

    if (!validatePassword) {
      res.status(401).json({ message: "Incorrect email or password." });
      return;
    }

    req.session.save(() => {
      req.session.user = user;
      res.status(200).end();
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user = newUser;
      res.status(201).end()
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;