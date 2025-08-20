const UserPreference = require("../models/userPreferences.model");
const User = require("../models/user.model");

const SetUserPreference =  async (req, res)=>{
    const {userId, seatPreference, mealPreference, classPreference, notifications, newsletter} = req.body;
    console.log(`userId: ${userId} \n seatPreference: ${seatPreference} \n mealPreference: ${mealPreference} \n classPreference: ${classPreference} \n notifications: ${notifications} \n newsletter: ${newsletter}`);

    if (!userId || !seatPreference || !mealPreference || !classPreference || !notifications || !newsletter) {
        return res.status(400).json({success:false, msg:"Invalid INput"});
    }
    try
    {
        // check if user exists
        const foundUser = await User.findOne({_id:userId});
        if (!foundUser)
        {
            return res.status(404).json({success:false, msg:`No user found with id: ${userId}`})
        }
        // check if userId already has preference
        const userCheckPreference = await UserPreference.findOne({userId:userId});
        if (userCheckPreference)
        {
            return res.status(409).json({success:false, msg:'User preference already set'})
        }
        const new_user_preference = await UserPreference.create({
            userId: userId,
            seatPreference: seatPreference,
            mealPreference: mealPreference,
            classPreference: classPreference,
            notifications: notifications,
            newsletter: newsletter
        });
        // console.log(`new_user_preference`); // testing: working
        console.log('new user preference created');
        // console.log(new_user_preference);
        if (!new_user_preference) {
            return res.status(500).json({success:false, msg:"Server Error"});
        }
        return res.status(200).json({success:true, msg:"User preferences saved", data:new_user_preference});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"});
    }
}

const GetUserPreferences = async (req,res)=>{
    const {userId} = req.params;
    if (!userId)
    {
        return res.status(400).json({success:false, msg:"Invalid Input"});
    }
    try
    {
        const foundUserPreference = await UserPreference.findOne({userId:userId});
        // console.log(`FoundUserPreference`) //testing:working
        // console.log(foundUserPreference); //testing:working

        if (!foundUserPreference)
        {
            return res.status(404).json({success:false, msg:`No user preferences found for user with id: ${userId}`});
        }
        return res.status(200).json({success:true, msg: "User preference retrieved", data:{seatPreference: foundUserPreference.seatPreference, mealPreference: foundUserPreference.mealPreference, classPreference: foundUserPreference.classPreference, notifications: foundUserPreference.notifications, newsletter: foundUserPreference.newsletter}});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"});
    }

}

module.exports = {GetUserPreferences, SetUserPreference}