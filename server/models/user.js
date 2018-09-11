/**
 *  challange *
 *
 * User model
 * set email property
 *          required
 *          trim
 *          string
 *          minlength 1
 */

var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        requireed: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {
    User
}
