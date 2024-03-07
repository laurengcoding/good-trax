const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
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
    userAvatar: String,
    faveTrack: {
        type: String,
        required: true
    },
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
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Music', musicSchema);



