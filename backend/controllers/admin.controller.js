const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Flight = require("../models/flightdetails.model")
const saltRounds = 10;



const GetAllUsers = async (req, res)=>{
    const user_data = await User.find().select("-password")
    if (user_data)
    {
        res.status(200).json({success:true, data:user_data});
    }
}
const DeleteUser = async(req, res)=>{
    const {user_id} = req.params;
    try
    {
        const user_id = await User.findOne({_id:user_id});
        if (user_id)
        {
            const result = await User.findOneAndDelete();
            if (result)
            {
                return res.status(200).json({success:true, msg:'Successfully deleted User'});
            }
        }

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
    }
}
const CreateAdmin = async (req, res)=>{
    const {adminEmail, role, password} = req.body;
    if (!adminEmail || !role || !password)
    {
        return res.status(400).json({success:false, msg:"Invalid Input"});
    }
    try
    {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create a new admin user
        const admin = await User.create({ email:adminEmail, role:role, password: hashedPassword });
        return res.status(201).json({ success: true, msg: "Admin created successfully" });
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
    }
}
const SingleFlightData = async (req, res)=>{
    try
    {
        const {id} =  req.params;
        console.log(`this is id: ${id}`);
        if (!id)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        const flightData = await Flight.findById({_id: id})
        if (flightData)
        {
            console.log('flightData');
            console.log(flightData);
            return res.status(200).json({success:true, data:flightData});
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:'Internal Server Error'});
    }
}
const LogAdmin = async (req, res) => {
    const { adminUser, password } = req.body;
    const role = "Admin";
    console.log(`Admin User: ${adminUser}, Password: ${password}`);
    if (!adminUser || !password)
    {
        return res.status(400).json({ success: false, msg: 'Invalid Input' });
    }
    try {
        // Log the admin action (you can expand this to include more details)
        const foundUser = await User.findOne({ email: adminUser, role: role });
        if (!foundUser) {
            return res.status(404).json({ success: false, msg: 'Admin user not found' });
        }
        const result = await bcrypt.compare(password, foundUser.password)
        if (!result) {
            return res.status(401).json({ success: false, msg: 'Invalid credentials' });
        }
        // Respond to the client
        const userObject = {id: foundUser._id};
        const token = jwt.sign(userObject, process.env.JWT_SCRT)
        return res.status(200).json({ success: true, msg: 'Admin action logged successfully', token: token });
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({ success: false, msg: `Error: ${err}` });
    }
}
const DeleteFlight = async (req, res)=>{
    try
    {
        const {id} = req.params;
        const deletedFlight = await Flight.findByIdAndDelete(id);
        // when a flight details is deleted i think it's neccessary to remove them from bookings: after
        // research settng a field in booking would be appropriate : flightStatus: cancelled
        if (!deletedFlight)
        {
            return res.status(404).json({success:false, msg:`No flight found with id: ${id}`});
        }
        return res.status(200).json({success:true, msg:"Flight deleted successfully"});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
    }
}

module.exports = {GetAllUsers,DeleteUser, LogAdmin, CreateAdmin, DeleteFlight, SingleFlightData};

