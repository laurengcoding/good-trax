const Music = require('../models/music');

module.exports = {
    index
};

async function index(req, res) {
    const music = await Music.find({});
    res.render('music/index', music);
};




