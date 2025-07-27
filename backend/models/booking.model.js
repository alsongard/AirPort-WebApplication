const mongoose = require("mongoose");


const BookingSchema = new mongoose.Schema(
    {
        userId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
        flightId: {type:mongoose.Schema.Types.ObjectId, ref:"Flight"}
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
