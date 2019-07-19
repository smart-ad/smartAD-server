/*
 Default module
*/
const express = require('express');
const router = express.Router();

<<<<<<< HEAD
router.use('/index', require('./index.js'));
=======
router.use('/', require('./index.js'));
>>>>>>> d6c6adca534bb0f60fae3246015ecad3231be253

module.exports = router;