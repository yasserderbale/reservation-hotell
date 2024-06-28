const express = require("express");
const router = express.Router();
const connecte = require("../model/model");
const session = require("express-session");
const flash = require("connect-flash");
router.use(express.urlencoded({ extended: true }));
router.use(flash());
router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.get("/utilisateur", (req, res) => {
  const user = req.session.userId;
  if (!req.session.userId) {
    req.flash("user", "il faute connecter");
    res.redirect("/logine");
  } else {
    const requte = `select r.*,s.prenom,s.Nom,s.Emaile,s.statu,c.name from sign as s join reservations as r on s.id=r.user_id join chambres as c on r.chambre_id=c.id where r.user_id='${user}'`;
    connecte.query(requte, (er, result) => {
      if (er) {
        console.log("erore de recuperation de information de BDD");
      } else {
        console.log(result);
        res.render("reservationunique", {
          array: result,
          annuler_reserv: req.flash("annuler_reserv"),
        });
      }
    });
  }
});
router.post("/annuler-reservations", (req, res) => {
  const id = req.body.id;
  const annuler = `delete from reservations where id='${id}'`;
  connecte.query(annuler, (er, resul) => {
    if (!er) {
      req.flash("annuler_reserv", "reservations anuler est succed");
      res.redirect("/utilisateur");
    }
  });
});
module.exports = router;
