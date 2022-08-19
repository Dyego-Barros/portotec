
const express = require('express');
const router = express.Router();

const defaultController = require('../controller/defaultController');

router.get('/', defaultController.default);




module.exports = router;