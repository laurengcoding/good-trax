const express = require('express');
const router = express.Router();
const upload = require('../utilities/multer');
const musicController = require('../controllers/music');

router.get('/', musicController.index);

// GET /music/new
router.get('/new', musicController.new);

// GET /:id
router.get('/:id', musicController.show);

// POST /music
router.post('/', upload.single('image'), musicController.create);

module.exports = router;