const mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    photos: {type:String},
    inPhotos: {type:[String]},
    basePrice: {type: Number},
    amenitiesList: {type: String},
    amenitiesCharges: {type: Number},
    noOfGuests: {type: Number},
    roomCount: {type: Number},
},
{
    versionKey: false
});

const hotelModel = mongoose.model('Hotel', hotelSchema);
module.exports = hotelModel;