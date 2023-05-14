const mongoose = require('mongoose');

let bookingSchema = new mongoose.Schema({
    hotelId: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true},
    hotelEmail: {type: String},
    hotelName: {type: String},
    status: {type: String},
    finalCost: {type: Number, required: true},
    customerName: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    noOfGuests: {type: Number},
    created: {type: Date, default: Date.now}
},
{
    versionKey: false,
    
},);

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;