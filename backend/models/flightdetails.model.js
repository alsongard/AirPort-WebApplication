const mongoose = require("mongoose");


const FlightSchema = new mongoose.Schema(
    {
        flightName:{type:String, required:true},
        departureCountry:{type:String, required:true},
        departureCity:{type:String, required:true},
        destinationCountry:{type:String, required:true},
        destinationCity:{type:String, required:true},
        totalSeats:{type:Number, required:true},
        flightDuration:{type:String, required:true},
        flightAmenities:{type:[String], required:true},
        flightRating:  {type:Number, default:0},
        seatClass: {type:[String], required:true},
        flightClass: {
            business: {type:Number, required:true},
            economy:{type:Number, required:true},
            first:{type:Number, required:true},
            premium: {type:Number, required:true}
        }
    },
    {
        timestamps:true
    }
)

const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;

// seatClass: {type:String, enum:["Economy", "Business", "First", "Premium Economy"], default:"Economy"},
// mealPreference: {type:String, enum:["Vegetarian", "Non-Vegetarian", "Kosher", "Halal", "Vegan", "Gluten-Free", "Regular"], default:"Non-Vegetarian"},
 