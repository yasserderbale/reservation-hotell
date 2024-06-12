const express = require("express");
const router = express.Router();
const connecte = require("../model/model");
const session = require("express-session");
const flache = require("connect-flash");
router.use(flache());
router.use(
  session({
    secret: "session",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(express.urlencoded({ extended: true }));
router.use(express.static("Admine"));
router.get("/Admine-reservation", (req, res) => {
  if (req.session.AdminId) {
    const requet = `select s.*, r.*,c.* from sign as s join reservations as r on s.id=r.user_id join chambres as c on c.id=r.chambre_id`;
    connecte.query(requet, (erore, result) => {
      if (!erore) {
        console.log(result);
        res.render("Admine-reserve", { result1: result });
      }
    });
  } else {
    res.redirect("/Admine-logine");
  }
});
router.get("/Admine-update:id", (req, res) => {
  const Chambreid = req.params.id;
  const reuqute = `select * from chambres where id='${Chambreid}'`;
  if (req.session.AdminId) {
    connecte.query(reuqute, (eroore, result) => {
      if (!eroore) {
        res.render("Admine-update", { result2: result });
      }
    });
  } else {
    res.redirect("/Admine-logine");
  }
});
router.get("/Admine-chambres", (req, res) => {
  const reuqute = `select * from chambres`;
  if (req.session.AdminId) {
    connecte.query(reuqute, (eroore, result) => {
      if (!eroore) {
        res.render("Admine-chambre", { result: result });
      }
    });
  } else {
    res.redirect("/Admine-logine");
  }
});
router.get("/Admine-logine", (req, res) => {
  res.render("Admine-logine", {
    erooore: req.flash("eroore"),
    admineerore: req.flash("Admineeroore"),
  });
});
router.get("/Admine", (req, res) => {
  req.flash("eroore", "Il Faut Connecter");
  if (req.session.AdminId) {
    res.render("Admine", { admine: req.flash("Admine") });
  } else {
    res.redirect("/Admine-logine");
  }
});
router.post("/Admine-logine", (req, res) => {
  Emaile = req.body.email;
  passworde = req.body.password;
  const requete = "select * from Admine";
  connecte.query(requete, (erore, result) => {
    if (!erore) {
      if (Emaile == result[0].Emaile && passworde == result[0].passsworde) {
        req.session.AdminId = result[0].id;
        res.redirect("/Admine");
      } else {
        req.flash("Admineeroore", "Emaile ou Passworde est incorecte");
        res.redirect("/Admine-logine");
      }
    } else {
      console.log(" errore de recupre ");
    }
  });
});
router.post("/Admine-chambres", (req, res) => {
  const nomchambre = req.body.chamber;
  const prix = req.body.prix;
  const image = req.body.image;
  const requete = `insert into chambres (name,prix,image_url) values ('${nomchambre}','${prix}','${image}')`;
  connecte.query(requete, (eroore, result) => {
    if (eroore) {
      console.log(eroore);
    } else {
      req.flash("Admine", "l`insertion est valide");
      res.redirect("/Admine");
    }
  });
});
router.post("/Admine-logout", (req, res) => {
  req.session.destroy();
  res.redirect("Admine-logine");
});
router.post("/Admine-annulerchambres", (req, res) => {
  const annuler = req.body.annuler;
  const reuqute = `delete from chambres where id='${annuler}'`;
  connecte.query(reuqute, (eroore, result) => {
    if (eroore) {
      console.log("eroore de recuperation des donnes", eroore);
    }
  });
  res.redirect("/Admine-chambres");
});
router.post("/Admine-update", (req, res) => {
  const chambreID = req.body.chambreId;
  const chamber = req.body.chamber;
  const prix = req.body.prix;
  var image;
  if (req.body.image) {
    image = req.body.image;
  } else {
    image = req.body.imgexiste;
  }

  const reuqute = `update chambres set name='${chamber}',prix='${prix}',image_url='${image}' where id='${chambreID}'`;
  connecte.query(reuqute, (eroore, result2) => {
    if (eroore) {
      console.log("pas modifier");
    } else {
      console.log(result2);
    }
  });
  res.redirect("/Admine-chambres");
});
module.exports = router;
