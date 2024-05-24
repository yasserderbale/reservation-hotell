const express = require("express");
const session = require("express-session");
const router = express.Router();
const flash = require("connect-flash");
router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(express.static("chambres"));
router.use(express.urlencoded({ extended: true }));
router.use(flash());
const connect = require("../model/model");
router.get("/reservations", (req, res) => {
  const user = req.session.userId;
  if (!req.session.userId) {
    req.flash("user", "il faute connecter");
    res.redirect("/logine");
  }
  res.render("reservations", {
    user: user,
    ee: req.flash("e"),
    valide: req.flash("valide"),
  });
});
router.post("/reservations", (req, res) => {
  const user = req.session.userId;
  const chambresId = req.session.chambresId;
  (arivale = req.body.date_arrivee),
    (departe = req.body.date_depart),
    (personne = req.body.Nbr_of_Presonne);
  if (chambresId) {
    connect.query(
      `insert into reservations (date_arrivee,date_depart,Nbr_of_Presonne,user_id,chambre_id) values ('${arivale}','${departe}','${personne}','${user}','${chambresId}')`,
      (eroore, result) => {
        if (eroore) {
          console.log(`eroore de insertion '${eroore}'`);
          res.send("eroore de insertion");
          res.redirect("/reservations");
        } else {
          req.flash("valide", "votre reservation a etes enregistrer ");
          connect.query(
            `update chambres set status='reserved' where id='${chambresId}'`,
            (er, re) => {
              if (er) {
                res.send("eroore de changre le status de chambre");
              }
            }
          );
          res.redirect("/reservations");
        }
      }
    );
  } else {
    req.flash("e", "choisire un chambre");
    res.redirect("/reservations");
  }
});
module.exports = router;
