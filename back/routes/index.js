const express = require("express");
const router = express.Router();

const MAGIC_PUBLISHABLE_KEY = process.env.MAGIC_PUBLIC;

// GET home page
/* router.get("/", (req, res) => {
  res.status(200).send("Server is healthy");
}); */
router.get("/", (req, res) => {
  res.render("index", { title: "Magic Apple Store 🍎", MAGIC_PUBLISHABLE_KEY });
});
module.exports = router;
