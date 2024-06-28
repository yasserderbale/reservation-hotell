const express = require("express");
const router = express.Router();
const connecte = require("../model/model");
router.get("/", (req, res) => {
  const chambres = "select * from chambres";
  connecte.query(chambres, (eroore, result) => {
    if (eroore) {
      res.send("eroore de recupere les chambres");
    } else {
      res.render("visiteur", {
        connecter: req.flash("connecter"),
        result: result,
      });
    }
  });
});
router.post("/select-chambre", (req, res) => {
  const chambresId = req.body.chambresId; 
  req.session.chambresId = chambresId;
  res.redirect("logine")
});
module.exports = router;
