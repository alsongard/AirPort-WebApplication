const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
    {
        userId: {ref:"User", type:mongoose.Schema.Types.ObjectId},
        firstName: {type:String, required:true, trim:true},
        middleName: {type:String, required:true, trim:true},
        lastName: {type:String, required:true, trim:true},
        age: {type:Number, required:true, trim:true},
        nationality: {type:Object, required:true, trim:true},
        passportNumber: {type:String, required:true, trim:true},
        phone: {type:String, required:true},
        dateBirth: {type:Date, required:true},
        emergencyContact:{type:String, required:true},
        emergencyContactName: {type:String, required:true}
    },
    {
        timestamps:true
    }
)

const UserDetail = mongoose.model("UserDetail", UserDetailSchema);
module.exports = UserDetail;