/*
 Default module
*/
const express = require('express');
const router = express.Router();

router.use('/index', require('./index.js'));
router.use('/sensor', require('./sensor.js'));

module.exports = router;