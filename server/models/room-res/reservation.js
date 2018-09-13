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
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

module.exports = {
    Reservation
}
