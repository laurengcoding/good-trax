const Music = require('../models/music');
const Collection = require('../models/collection');

module.exports = {
    index,
    addToCollection
};

async function addToCollection(req, res) {
    let collection = await Collection.findOne({user: req.user._id}).populate('albumAdded');
    if (!collection) {
        collection = await Collection.create({user: req.user._id});
    }
    try {
    const music = await Music.findById(req.params.id);
    collection.albumAdded.push(music);
    console.log(collection);
        await collection.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/profile');
};

async function index(req, res) {
    const collection = await Collection.find({user: req.user._id}).populate('albumAdded');
    res.render('collections/profile', { collection });
};