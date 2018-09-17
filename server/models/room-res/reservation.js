var mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

var Reservation = mongoose.model('Reservation', {
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 10,
        trim: true
    },
    roomId: String,
    userId: String,
    startDate: {
        type: Number,
        required: true,
        min: 1000000000000,
        max: 9999999999999
    },
    endDate: {
        type: Number,
        required: true,
        min: 1000000000000,
        max: 9999999999999
    }
});

module.exports = {
    Reservation
}
