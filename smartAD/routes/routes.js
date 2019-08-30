/*
 Default module
*/
const express = require('express');
const router = express.Router();

router.use('/main', require('./index.js'));
router.use('/users', require('./users.js'));
router.use('/weather', require('./weather.js'));

module.exports = router;