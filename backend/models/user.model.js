const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        email: {type:String, require:true, trim:true},
        password: {type:String, require:true, trim:true},
        role: {type:String, default: "User" , require:true, enum:['User', 'Admin']}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema);

module.exports = User;