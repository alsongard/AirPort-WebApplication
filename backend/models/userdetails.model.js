const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
    {
        firstName: {type:String, required:true, trim:true},
        middleName: {type:String, required:true, trim:true},
        lastName: {type:String, required:true, trim:true},
        age: {type:Number, required:true, trim:true},
        passportNumber: {type:String, required:true, trim:true},
        userId: {ref:"User", type:mongoose.Schema.Types.ObjectId}
    },
    {
        timestamps:true
    }
)

const UserDetail = mongoose.model("UserDetail", UserDetailSchema);

module.exports = UserDetail;