const express = require("express");
const router = express.Router();
const session = require("express-session");
const flash = require("connect-flash");
const connect = require("../model/model");
router.use(express.urlencoded({ extended: true }));
router.use(flash());
router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.get("/signup", (req, res) => {
  res.render("signup", { error: req.flash("er"), error2: req.flash("errore") });
});

router.post("/signup", (req, res) => {
  if (
    req.body.prenom &&
    req.body.Nom &&
    req.body.Emaile &&
    req.body.passworde
  ) {
    connect.query(
      `select count(*) as countemaile from sign where Emaile= '${req.body.Emaile}'`,
      (errore, result) => {
        if (errore) {
          console.log(`eroore deinsertion'${errore}'`);
        } else {
          if (result[0].countemaile > 0) {
            req.flash("errore", "Emaile deja exister");
            res.redirect("signup");
          } else {
            connect.query(
              `insert into sign (prenom,Nom,Emaile,passworde) values ('${req.body.prenom}','${req.body.Nom}','${req.body.Emaile}','${req.body.passworde}')`,
              (errore, result) => {
                if (errore) {
                  console.log("insertion not valide");
                } else {
                  req.flash("valide", "votre compte a ete creear");
                  res.redirect("/logine");
                }
              }
            );
          }
        }
      }
    );
  } else {
    req.flash("er", "il faute saisire tous les champes");
    res.redirect("/signup");
  }
});
module.exports = router;
