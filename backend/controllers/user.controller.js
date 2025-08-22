const User = require("../models/user.model");
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
        if (!foundUser) // is null when findOne() has zero result
        {
            return res.status(400).json({success:false, msg:"No user Found"})
        }
        const result = await bcrypt.compare(UserPassword, foundUser.password)
        console.log(`Result : ${result}`);
        
        // console.log(`Typeof : ${typeof(foundUser._id)}`);
        // console.log(foundUser._id);
        if (result)
        {
            const userObject = {id: foundUser._id};
            const token = jwt.sign(userObject, process.env.JWT_SCRT);
            return res.status(200).json({success:true, data:{user_email:foundUser.email, user_id:foundUser.id, token: token}});
        }
        return res.status(500).json({success:false, msg:"Invalid Credentials"});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg: `Error: ${err}`});
    }
}

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

module.exports = {Register, Login, GetAllUsers, DeleteUser, CreateAdmin, LogAdmin};
