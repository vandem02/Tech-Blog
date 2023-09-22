const router = require("express").Router();
const { User, Game_List } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  Post.findAll()
    .then((dbPostData) => {
      //const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        dbPostData,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/new-list", (req, res) => {
  res.render("newList", {
    style: "newList",
  });
});

router.get("/user-profile", withAuth, async (req, res) => {
  let user = await User.findByPk(req.session.user.id, {
    // TODO include gameList (array of game lists)
    include: [{ model: Game_List }],
  });
  user = user.get({
    plain: true,
  });
  console.log(user);
  res.render("userProfile", { user, style: "profile" });
});

router.get("/sign-up", (req, res) => {
  res.render("signup", {
    style: "signup",
  });
});

router.get("/game-list/:id", async (req, res) => {
  const listId = req.params.id;
  let game = await Game_List.findByPk(listId);
  game = game.get({
    plain: true,
  });
  console.log(game);
  res.render("gameList", game);
});

module.exports = router;
