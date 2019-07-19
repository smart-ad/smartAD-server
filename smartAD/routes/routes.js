/*
 Default module
*/
const express = require('express');
const router = express.Router();

router.use('/', require('./index.js'));

module.exports = router;