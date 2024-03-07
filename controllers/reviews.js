const Music = require('../models/music');

module.exports = {
    create,
    delete: deleteReview
};

function deleteReview(req, res, next) {
    Music.findOne({
        'reviews._id': req.params.id,
        'reviews.user': req.user._id
    }).then(function(music) {
        if (!music) return res.redirect('/music');
        music.reviews.remove(req.params.id);
        music.save().then(function() {
            res.redirect('/music/' + music._id);
        }).catch(function(err) {
            return next(err);
        });
    });
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