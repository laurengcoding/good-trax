const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
// TODO: create 'ensureLoggedIn' functionality

// POST /music/:id/reviews
router.post('/music/:id/reviews', reviewsController.create);

// DELETE /reviews/:id
router.delete('/reviews/:id', reviewsController.delete);

module.exports = router;