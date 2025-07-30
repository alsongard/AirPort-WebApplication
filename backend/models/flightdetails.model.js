const mongoose = require("mongoose");


const FlightSchema = new mongoose.Schema(
    {
        flightName:{type:String, required:true},
        departureCountry:{type:String, required:true},
        departureCity:{type:String, required:true},
        destinationCountry:{type:String, required:true},
        destinationCity:{type:String, required:true},
        departureTime:{type:Date, required:true},
        arrivalTime:{type:Date, required:true},
        totalSeats:{type:Number, required:true},
        price:{type:Number, required:true},
        flightDuration:{type:String, required:true},
        flightAmenities:{type:[String], required:true},
        flightRating:  {type:Number, default:0},
        flightClass: {type:[String], required:true}
    },
    {
        timestamps:true
    }
)

const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;