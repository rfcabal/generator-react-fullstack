const express = require('express');
const indexRouter = require('./views/home');
const apiRouter = require('./api');
const notFoundRouter = require('./specials');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/api-doc.json');

const router = express.Router();

router.use('/', indexRouter);
router.use('/api', apiRouter)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use('/', notFoundRouter);


module.exports = router;
