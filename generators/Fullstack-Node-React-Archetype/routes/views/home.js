const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("route");
});

module.exports = router;
