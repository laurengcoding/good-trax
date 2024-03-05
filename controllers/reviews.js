const Music = require('../models/music');

module.exports = {
    create
};

async function create(req, res) {
    const music = await Music.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    music.reviews.push(req.body);
    try {
        await music.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/music/' + music._id);
};