const UserDetail = require("../models/userdetails.model");
const User = require("../models/user.model");
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

module.exports = {GetUserDetails, RegisterUserDetails}