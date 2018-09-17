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
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    }
});

module.exports = {
    Reservation
}
