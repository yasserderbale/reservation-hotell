const express = require("express");
const router = express.Router();
const session = require("express-session");
const flash = require("connect-flash");
const connect = require("../model/model");
router.use(express.urlencoded({ extended: true }));
router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(flash());
router.get("/logine", (req, res) => {
  res.render("logine", {
    error: req.flash("eroore"),
    err: req.flash("err"),
    errore: req.flash("errore"),
    valid: req.flash("valide"),
    user: req.flash("user"),
  });
});
router.post("/logine", (req, res) => {
  const Emaile = req.body.Emaile;
  const passworde = req.body.passworde;
  if (Emaile) {
    connect.query(
      `select * from sign where Emaile='${Emaile}'`,
      (err, resulte) => {
        if (err) {
          console.log(err);
        }
        if (resulte.length == 0) {
          req.flash("eroore", "emaile est pase valide");
          res.redirect("/logine");
        } else {
          console.log("Emaile est valide");
          if (resulte[0].passworde == passworde) {
            console.log("passworde correcte");
            req.session.userId = resulte[0].id;
            console.log(req.session.userId);
            res.redirect("/reservations");
          } else {
            req.flash("err", "password n`est pas valide");
            res.redirect("/logine");
          }
        }
      }
    );
  } else {
    req.flash("errore", "il doite saisire tous les champes");
    res.redirect("/logine");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((er, re) => {
    if (er) {
      console.log("pas deconnecter");
    } else {
      console.log("Deconnecter est ressite");

      res.redirect("/logine");
    }
  });
});
module.exports = router;
