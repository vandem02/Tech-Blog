const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(401).end();
      return;
    }

    const validatePassword = await user.checkPassword(password);

    if (!validatePassword) {
      res.status(401).end();
      return;
    }

    req.session.save(() => {
      req.session.user = user;
      res.redirect("/")
    });
  } catch (err) {
    res.status(500).json(err);
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

router.post("/signup", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      res.status(400).statusMessage = "Sorry, this username is taken."
      res.send()
      return;
    }

    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user = newUser;
      res.redirect("/")
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
