const Music = require('../models/music');
const Collection = require('../models/collection');

module.exports = {
    index,
    addToCollection,
    delete: deleteAlbum
};

async function deleteAlbum(req, res, next) {
    let collection = await Collection.findOne({user: req.user._id}).populate('albumAdded');
    try {
    const music = await Music.findById(req.params.id);
    // delete the details of this item as an object in the albumsAdded array
    collection.albumAdded.pull(music);
    await collection.save();
    } catch(err) {
        console.log(err);
    };
    res.redirect('/profile');
}

async function addToCollection(req, res) {
    // find a collection specific to the current user, accessing the 'albumAdded' property
    let collection = await Collection.findOne({user: req.user._id}).populate('albumAdded');
    // if there is no collection for the user, create one
    if (!collection) {
        collection = await Collection.create({user: req.user._id});
    }
    try {
    // find the id of the release once button is clicked
    const music = await Music.findById(req.params.id);
    // add the details of this item as an object in the albumsAdded array
    collection.albumAdded.push(music);
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