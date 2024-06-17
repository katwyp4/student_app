var express = require('express');
const calendarController = require("../controllers/calendar.controller");
var router = express.Router();

router.get('/', calendarController.fetch);
router.post('/', calendarController.add);
router.delete('/:key', calendarController.destroy);
module.exports = router;