const mongoose = require("mongoose");


const BookingSchema = new mongoose.Schema(
    {
        userId: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        flightId: {type:mongoose.Schema.Types.ObjectId, ref:"Flight", required:true},
        bookingStatus: {type:String, enum:["confirmed", "cancelled", "pending"], default:"pending"},
        seatPreference: {type:String, enum:["Aisle", "Window", "Middle"], default:"Aisle"},
        mealPreference: {type:String, enum:["Vegetarian", "Non-Vegetarian", "Kosher", "Halal", "Vegan", "Gluten-Free", "Regular"], default:"Non-Vegetarian"},
        specialRequests: {type:String, default:""},
        seatClass: {type:String, enum:["Economy", "Business", "First", "Premium Economy"], default:"Economy"},
        emergencyContactName: {type:String },
        emergencyContactPhone: {type:String}
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
