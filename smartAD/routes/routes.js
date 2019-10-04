/*
 Default module
*/
const express = require('express');
const router = express.Router();

router.use('/main', require('./index.js'));
router.use('/users', require('./users.js'));

module.exports = router;