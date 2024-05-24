var express = require('express');
var router = express.Router();
var chatController = require('../controllers/chat.controller');

router.get('/', chatController.fetch);
router.post('/', chatController.add);

module.exports = router;