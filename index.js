const express = require("express");
const app = express();
const porte = 12;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("images"));
const signup = require("./router/signup");
const logine = require("./router/logine");
const visiteur = require("./router/visiteur");
const reservations = require("./router/reservations");
const utilisateur = require("./router/resultates");
const Admine = require("./router/Admine");
app.use("/", Admine);
app.use("/", utilisateur);
app.use("/", logine);
app.use("/", signup);
app.use("/", visiteur);
app.use("/", reservations);
app.listen(porte, (req, res) => {
  console.log(`le serveure va activer http//localhost:${porte}`);
});
 