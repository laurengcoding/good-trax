const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    artist: { 
        type: String
    },
    album: {
        type: String,
        releaseDate: Date,
    },
    // TODO: reviews: [reviewsSchema]
    // TODO: add to list??


});



module.exports = mongoose.model('Music', musicSchema);



