const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome this is test for this api");
});

module.exports = router;
