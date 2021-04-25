const express = require('express');
const welcomeApi = require('./welcome');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../config/api-doc.json');

const router = express.Router();

router.use("/welcome", welcomeApi)
router.use('*', (req, res) => {
    res.redirect('/api-docs');
});


module.exports = router;
