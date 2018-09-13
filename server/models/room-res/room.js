var mongoose = require('mongoose');

var Room = mongoose.model('Room', {
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 10,
        trim: true
    },
    floor: {
        required: true,
        type: Number,
        min: 0,
        max: 4
    },
    building: {
        required: true,
        type: String,
        minlength: 4,
        maxlength: 14,
        trim: true
    }
});

module.exports = {
    Room
}
