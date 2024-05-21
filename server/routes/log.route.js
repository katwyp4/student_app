var express = require('express');
var router = express.Router();
var logController = require('../controllers/log.controller');

router.post('/', logController.signin);

module.exports = router;
