//post  i get
var express = require('express');
const scheduleController = require("../controllers/schedule.controller");
var router = express.Router();

router.get('/', scheduleController.fetch);
router.post('/', scheduleController.add);
router.delete('/:key', scheduleController.destroy);
module.exports = router;