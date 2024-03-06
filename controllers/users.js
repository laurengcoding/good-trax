const Music = require('../models/music');
const User = require('../models/user');

module.exports = {
    index
};

async function index(req, res) {
    const user = await User.find({});
    res.render('users/profile', { user });
};