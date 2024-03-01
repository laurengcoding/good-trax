const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/', musicController.index);

module.exports = router;