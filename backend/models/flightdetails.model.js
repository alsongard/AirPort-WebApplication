const mongoose = require("mongoose");


const FlightSchema = new mongoose.Schema(
    {
        flightName:{type:String, required:true},
        departureCountry:{type:String, required:true},
        departureCity:{type:String, required:true},
        destinationCountry:{type:String, required:true},
        destinationCity:{type:String, required:true},
        departureDate: {type:Date, required:true},
        arrivalDate: {type:Date, required:true},
        totalSeats:{type:Number, required:true},
        availableSeats: {type:Number},
        seatNumbers: {
            firstSeats:{type:Number, required:true},
            businessSeats: {type:Number, required:true},
            premiumSeats:{type:Number, required:true},
            economySeats: {type:Number, required:true}
        },
        flightDuration:{type:String, required:true},
        flightAmenities:{type:[String], required:true},
        flightRating:  {type:Number, default:8},
        seatClass: {type:[String], required:true},
        flightClassPrice: {
            first:{type:Number, required:true},
            business: {type:Number, required:true},
            premium: {type:Number, required:true},
            economy:{type:Number, required:true}
        },
    },
    {
        timestamps:true
    }
)
FlightSchema.pre('save', function(next){
    this.availableSeats = this.totalSeats;
    next();
});


const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;

// seatClass: {type:String, enum:["Economy", "Business", "First", "Premium Economy"], default:"Economy"},
// mealPreference: {type:String, enum:["Vegetarian", "Non-Vegetarian", "Kosher", "Halal", "Vegan", "Gluten-Free", "Regular"], default:"Non-Vegetarian"},
 