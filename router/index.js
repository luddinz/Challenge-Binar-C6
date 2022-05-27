const express = require("express");
const { ugame, ugamebio, ugamehistory } = require("../models");
const dummyAdmin = [];

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/login/login", { layout: "layouts/login" });
});

router.get("/admin", async (req, res) => {
  const userdata = await ugame.findAll();
  const jumlahUser = userdata.length;
  const leaderboard = await ugamehistory.findAll({
    order: [["score", "desc"]],
  });
  res.render("pages/home/index", { jumlahUser, leaderboard });
});

router.get("/admin/create", (req, res) => {
  res.render("pages/admin/create");
});

router.get("/admin/user", (req, res) => {
  ugame
    .findAll({
      order: [["id", "ASC"]],
    })
    .then((ugames) => {
      res.render("pages/admin/index", {
        pageTitle: "Daftar User",
        ugames,
      });
    });
});

router.get("/admin/:id", async (req, res) => {
  const { id } = req.params;
  const detail = await ugame.findOne({
    where: {
      id: id,
    },
    include: "ugamehistory",
  });
  res.render("pages/admin/show", {
    pageTitle: `${ugame.username} Data`,
    detail,
  });
});

router.get("/api/user", async (req, res) => {
  const allUser = await UserGame.findAll({
    include: "UserGameBiodata",
  });
  res.status(200).json(allUser);
});

router.get("/admin/:id/edit", async (req, res) => {
  const usergame = await UserGame.findOne({
    where: { id: req.params.id },
    include: "UserGameBiodata",
  });
  res.render("pages/admin/edit", {
    pageTitle: "Edit User",
    usergame,
  });
});

router.put("/admin/edit/:id", async (req, res) => {
  const userGame = await UserGame.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  );

  await UserGameBiodata.update(
    {
      userGameId: userGame.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    },
    { where: { userGameId: req.params.id } }
  );
  res.redirect("/");
});

router.post("/admin/create", async (req, res) => {
  const userGame = await UserGame.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await UserGameBiodata.create({
    userGameId: userGame.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
  });
  res.redirect("/admin");
});

router.delete("/admin/:id", async (req, res) => {
  const { id } = req.params;
  await UserGameBiodata.destroy({
    where: {
      userGameId: id,
    },
  });

  await UserGame.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/admin");
});

// LOGIN
router.get("/login", (req, res) => {
  res.render("pages/login/login", { layout: "layouts/login" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  dummyAdmin.push({
    email,
    password,
  });
  console.log(dummyAdmin);
  if (email === "admin@admin.com" && password === "admin") {
    res.redirect("/admin/");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
