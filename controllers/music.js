const Music = require('../models/music');
const cloudinary = require('../utilities/cloudinary');

module.exports = {
    index,
    show,
    new: newAlbum,
    create
};

async function index(req, res) {
    const music = await Music.find({});
    // sort the 'recently added' section by order of creation
    // limiting display to the 8 most recent
    const allMusic = await Music.find().sort({ createdAt: -1 }).limit(8);
    res.render('music/index', { music: allMusic });
};

async function show(req, res) {
    const music = await Music.findById(req.params.id);
    res.render('music/show', { title: 'Album Details', music });
};

function newAlbum(req, res) {
    res.render('music/new', { title: 'Add Album', errorMsg: '' });
};

async function create(req, res) {
    const artist = await Music.findOne({$or:[
        // search by artist or album
        {artist: req.body.artist},
        {album: req.body.artist}
]});
if (artist) {
    res.redirect('/music/' + artist._id);
    return;
};
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const music = new Music({
            ...req.body,
            image: result.secure_url,
            cloudinary_id: result.public_id
        });
        await music.save();
        res.redirect('/music/' + music._id );
    } catch (err) {
        console.log(err);
        res.render('music/new', { errorMsg: err.message });
    }
}


