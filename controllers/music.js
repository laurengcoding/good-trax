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
    res.render('music/index', music);
    // TODO: this might need to be a redirect
};

async function show(req, res) {
    const music = await Music.findById(req.params.id);
    res.render('music/show', { title: 'Album Details', music });
};

function newAlbum(req, res) {
    res.render('music/new', { title: 'Add Album', errorMsg: '' });
};

async function create(req, res) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        // const music = await Music.create(req.body);
        const music = new Music({
            ...req.body,
            image: result.secure_url,
            cloudinary_id: result.public_id
        });
        await music.save();
        res.redirect('/music/' + music._id );
    } catch {
        console.log(err);
        res.render('music/new', { errorMsg: err.message });
    }
}

