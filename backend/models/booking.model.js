const mongoose = require("mongoose");


const BookingSchema = new mongoose.Schema(
    {
        userId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
        flightId: {type:mongoose.Schema.Types.ObjectId, ref:"Flight"},
        seatClass: {type:String, enum:['Economy', 'Premium Economy', 'Business', 'First'], default:"Business"},
        bookingStatus: {type:String, enum:["confirmed", "cancelled", "pending"], default:"pending"},
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
