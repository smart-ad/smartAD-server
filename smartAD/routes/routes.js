/*
 Default module
*/
const express = require('express');
const router = express.Router();

router.use('/main', require('./index.js'));
router.use('/users', require('./users.js'));
router.use('/form_receiver', require('./form_receiver.js'))

module.exports = router;