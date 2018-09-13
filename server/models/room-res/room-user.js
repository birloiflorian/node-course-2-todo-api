var mongoose = require('mongoose');

var UserRoom = mongoose.model('UserRoom', {
    username: {
        required: true,
        type: String,
        minlength: 6,
        maxlength: 15,
        trim: true
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
        maxlength: 15,
        trim: true
    },
    email: {
        required: true,
        type: String,
        minlength: 7,
        maxlength: 25,
        trim: true
    },
    type: {
        type: String,
        required: true,
        minlength: 5
    }
});

module.exports = {
    UserRoom
}
