const mongoose = require("mongoose");


const PayMentSchema = new mongoose.Schema(
    {
        bookingID: {type:mongoose.Schema.Types.ObjectId, ref:"Booking"},
        amountPaid: {type:Number, required:true},
        paymentMethod: {type:String, required:true},
        paymentStatus:{type:String, required:true}
    },
    {
        timestamps: true
    }
)

const PayMent = mongoose.model("PayMent", PayMentSchema);
module.exports = PayMent;