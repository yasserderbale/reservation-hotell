const express = require("express");
const session = require("express-session");
const router = express.Router();
const connecte = require("../model/model");
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
router.get("/avis", (req, res) => {
  const requte =
    "SELECT s.*, a.* FROM sign AS s JOIN avis AS a ON s.id = a.IDVisiteur";
  connect.query(requte, (er, resulta) => {
    if (!er) {
      res.render("avis", { resulta: resulta });
    }
  });
});
router.get("/Service", (req, res) => {
  if (!req.session.userId) {
    req.flash("connecter", "il faut connecter");
    res.redirect("/");
  } else {
    res.render("Service", {
      comment: req.flash("comment"),
      
    });
  }
});
router.post("/Service", (req, res) => {
  const avis = req.body.avis;
  const user = req.session.userId;
  const requet = `INSERT INTO avis (IDVisiteur,commentaire)VALUES ('${user}','${avis}')`;
  connect.query(requet, (erore, result) => {
    if (!erore) {
      req.flash("comment", "votre commentaire enregistrer");
      res.redirect("/Service");
    }
  });
});
router.get("/reservations", (req, res) => {
  const user = req.session.userId;
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
router.get("/receptioniste-logine", (req, res) => {
  res.render("receptioniste-logine", { fals: req.flash("false") });
});
router.post("/receptioniste-logine", (req, res) => {
  const emaile = req.body.email;
  const passworde = req.body.password;
  const requet = `select id,Email,passsworde from receptionniste where Email='${emaile}'and passsworde='${passworde}'`;
  connecte.query(requet, (eroore, result) => {
    if (!eroore) {
      if (result.length != 0) {
        req.session.ReceptionId = result[0].passsworde;
        res.redirect("/");
      } else {
        req.flash("false", "Email ou passworde est pas valide");
        res.redirect("/receptioniste-logine");
      }
    }
  });
});
module.exports = router;
