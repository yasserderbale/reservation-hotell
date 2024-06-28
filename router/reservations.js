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
  console.log(req.session.ReceptionId);
  if (!req.session.userId) {
    req.flash("user", "il faute connecter");
    res.redirect("/logine");
  }
  res.render("reservations", {
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
          res.redirect("/reservations");
        }
      }
    );
  } else {
    req.flash("e", "choisire un chambre");
    res.redirect("/reservations");
  }
});

router.get("/reserved-dates", (req, res) => {
  const chambresId = req.session.chambresId;
  if (chambresId) {
    const query = `SELECT date_arrivee, date_depart FROM reservations WHERE chambre_id = ?`;
    connect.query(query, [chambresId], (error, results) => {
      if (error) {
        return res
          .status(500)
          .send("Erreur lors de la récupération des dates réservées.");
      }
      const reservedDates = [];
      results.forEach((row) => {
        const currentDate = new Date(row.date_arrivee);
        const endDate = new Date(row.date_depart);
        while (currentDate <= endDate) {
          reservedDates.push(currentDate.toISOString().split("T")[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      res.json(reservedDates);
    });
  } else {
    res.send("erore de recuperation de id chambres");
  }
});

module.exports = router;
