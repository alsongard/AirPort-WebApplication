const User = require("../models/user.model");
const UserDetail = require("../models/userdetails.model");
const UserPreference = require("../models/userPreferences.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;


const Register = async (req, res)=>{
    const {UserEmail, UserPassword} = req.body;
    console.log(UserEmail, UserPassword)
    try
    {
        if (!UserEmail || !UserPassword)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        // check if user exist
        const emailAlreadyExist = await User.findOne({email:UserEmail});
        console.log(`emailAlreadyExist: ${emailAlreadyExist}`);
        if (emailAlreadyExist)
        {
            console.log("Email already Exist");
            return res.status(409).json({success:false, msg:'Email already exist'})
        }
        const passwdHash = await bcrypt.hash(UserPassword, saltRounds);
        const user_created = await User.create({email:UserEmail, password:passwdHash});
        console.log(user_created);
        return res.status(200).json({success:true, msg:"Registered Successfully"});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});

    }
}

const Login = async (req,res)=>{
    const {UserEmail, UserPassword} = req.body;
    try
    {
        if (!UserEmail || !UserPassword)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"})
        }
        // check if user exists first
        const foundUser = await User.findOne({email: UserEmail});
        // console.log("foundUser"); 
        // console.log(foundUser); 
        const userObject = {id: foundUser._id};

        // console.log(`Typeof : ${typeof(foundUser._id)}`);
        // console.log(foundUser._id);
        const token = jwt.sign(userObject, process.env.JWT_SCRT);
        if (!foundUser) // is null when findOne() has zero result
        {
            return res.status(400).json({success:false, msg:"No user Found"})
        }
        const result = await bcrypt.compare(UserPassword, foundUser.password)
        console.log(`Result : ${result}`);
        if (!result)
        {
            return res.status(500).json({success:false, msg:"Invalid Credentials"});
        }
        return res.status(200).json({success:true, data:{user_email:foundUser.email, user_id:foundUser.id, token: token}});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg: `Error: ${err}`});
    }
}

const RegisterUserDetails = async (req, res)=>{
    const {firstName, middleName, lastName, age, passportNumber, userId, phone, dateBirth, emergencyContactName, emergencyContact,  nationality } = req.body;
    try
    {
        if (!firstName || !middleName || !lastName || !age || !passportNumber || !userId || !phone || !dateBirth || !emergencyContactName || !emergencyContact || !nationality)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"})
        }
        // console.log(`firstName: ${firstName} \n middleName: ${middleName} \n lastName: ${lastName} \n age: ${age} \n passportNumber: ${passportNumber} \n userId: ${userId} \n phone: ${phone} \n dateBirth: ${dateBirth} \n emergencyContact: ${emergencyContact} \n nationality: ${nationality}`); // testing: working

        // check if user exists
        const foundUser = await UserDetail.findOne({userId:userId});// returns null if  no user found
        if (foundUser)
        {
            return res.status(409).json({success:false, msg:"User details already exist for this user"})
        }
        const userDetails = await UserDetail.create({firstName:firstName, middleName:middleName, lastName:lastName, age:age, passportNumber:passportNumber, userId:userId, phone:phone, dateBirth:dateBirth, emergencyContact:emergencyContact, emergencyContactName:emergencyContactName ,  nationality:nationality });
        // console.log(userDetails);
        if (userDetails)
        {
            console.log(`User Details Created Successfully`);
            return res.status(200).json({success:true, msg:"registered successfully", data:{first_name: userDetails.firstName, middle_name:userDetails.middleName, last_name:userDetails.lastName,user_id:userDetails.userId}})
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});
    }
}


const GetUserDetails = async (req,res)=>{
    const {id} = req.params;
    try
    {
        if (!id)
        {
            return res.status(400).json({success:false, msg:"No id given "});
        }
        const foundUser = await User.findOne({_id:id});
        if (!foundUser)
        {
            console.log(`No user found with the given ${id}`);
            return res.status(404).json({success:false, msg:`No user found with id: ${id}`})
        }
        const foundUserDetail = await UserDetail.findOne({userId:id});
        // console.log(`foundUserDetail`)  // testing:working
        // console.log(foundUserDetail); // testing:working
        if (!foundUserDetail)
        {
            console.log(`No user details found for the given id: ${id}`);
            return res.status(404).json({success:false, msg:`No user details found for the given Id: ${id}`});
        }
        return res.status(200).json({success:true, msg:"user details retrieved", data:{first_name: foundUserDetail.firstName, middle_name:foundUserDetail.middleName, last_name:foundUserDetail.lastName,user_id:foundUserDetail.userId, phone:foundUserDetail.phone, passport:foundUserDetail.passportNumber, emergencyContact:foundUserDetail.emergencyContact, dateOfBirth:foundUserDetail.dateBirth}})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});
    
    }
}

const RegisterUserPreferences =  async (req, res)=>{
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
module.exports = {Register, Login, GetUserDetails, RegisterUserDetails, RegisterUserPreferences, GetUserPreferences};
