const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    artist: { 
        type: String
    },
    album: {
        type: String
    },
    releaseDate: {
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        year: {
            type: Number
        }
    },
    image: {
        type: String
    },
    cloudinary_id: {
        type: String
    }
    // TODO: reviews: [reviewsSchema]
    // TODO: add to list??


});



module.exports = mongoose.model('Music', musicSchema);



