const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number, //TODO: change this to an emoji disk rating system?
        min: 1,
        max: 5,
        default: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String
});

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
    reviews: [reviewSchema],
    image: {
        type: String
    },
    cloudinary_id: {
        type: String
    }

    // TODO: add to list??
});

module.exports = mongoose.model('Music', musicSchema);



