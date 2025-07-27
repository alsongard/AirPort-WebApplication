const mongoose = require("mongoose");


const FlightSchema = new mongoose.Schema(
    {
        flightName:{type:String, required:true},
        departure:{type:String, required:true},
        destination:{type:String, required:true},
        departureTime:{type:Date, required:true},
        arrivalTime:{type:Date, required:true},
        totalSeats:{type:Number, required:true},
        price:{type:Number, required:true}
    },
    {
        timestamps:true
    }
)

const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;