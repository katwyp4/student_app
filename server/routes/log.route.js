var express = require('express');
var router = express.Router();
var log = require('../controllers/log.controller');

router.post('/', log.signin);

module.exports = router;
