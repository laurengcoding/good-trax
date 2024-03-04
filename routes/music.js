const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/', musicController.index);

// GET music/new
router.get('/new', musicController.new);

module.exports = router;