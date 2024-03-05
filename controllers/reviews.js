const Music = require('../models/music');

module.exports = {
    create
};

async function create(req, res) {
    const music = await Music.findById(req.params.id);

    // TODO: add user functionality

    music.reviews.push(req.body);
    try {
        await music.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/music/' + music._id);
};