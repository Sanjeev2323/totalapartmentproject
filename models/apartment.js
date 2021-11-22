const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
    
    apId: {
        type: Number,
        required: true
    },
    floorno: Number,
    bedRoomSize: String,
    ownerName:String,
    occupied: {
        type: Boolean,
        default: false
    },
    billPaid:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('apartment', apartmentSchema);