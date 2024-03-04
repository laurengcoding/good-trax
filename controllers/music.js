const Music = require('../models/music');

module.exports = {
    index,
    new: newAlbum,
};

async function index(req, res) {
    const music = await Music.find({});
    res.render('music/index', music);
    // TODO: this might need to be a redirect
};

function newAlbum(req, res) {
    res.render('music/new', { title: 'Add Album', errorMsg: '' });
};



