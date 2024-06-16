//post  i get
var express = require('express');
const chatController = require("../controllers/schedule.controller");
var router = express.Router();

router.get('/', chatController.fetch);
router.post('/', chatController.add);
router.delete('/:key', chatController.destroy);
module.exports = router;