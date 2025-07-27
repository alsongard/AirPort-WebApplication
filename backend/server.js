const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const UserDetail = require("./models/userdetails.model");
const Flight = require("./models/flightdetails.model");
const Booking = require("./models/booking.model");
const PayMent = require("./models/paymentdetails.model");
const saltRounds = 10;




app.get("/", (req,res)=>{
    res.status(200).send("<h1>Welcome</h1>");
})





// create user
app.post("/register",async (req,res)=>{
    const {UserEmail, UserPassword} = req.body;

    try
    {
        if (!UserEmail || !UserPassword)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        const passwdHash = await bcrypt.hash(UserPassword, saltRounds);
        const user_created = await User.create({email:UserEmail, password:passwdHash});
        console.log(user_created);
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});

    }
})

// perform login
app.post("/login", async (req,res)=>{
    const {UserEmail, UserPassword} = req.body;
    try
    {
        if (!UserEmail || !UserPassword)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"})
        }
        // check if user exists first
        const foundUser = await User.find({email: UserEmail});
        console.log(foundUser);
        if (foundUser.length === 0)
        {
            return res.status(400).json({success:false, msg:"No user Found"})
        }
        const result = await bcrypt.compare(UserPassword, foundUser.password)
        if (!result)
        {
            return res.status(500).json({success:false, msg:"Invalid Credentials"});
        }
        return res.status(200).json({success:true, data:{user_email:foundUser.email, user_id:foundUser.id}});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg: `Error: ${err}`});
    }
})

// registeruserDetails: form 
app.post("/regUserDetail", async (req, res)=>{
    const {firstName, middleName, lastName} = req.body;
    try
    {
        if (!firstName || !middleName || !lastName)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"})
        }
    
        const userDetails = await new UserDetail.create({firstName: firstName, middleName: middleName, lastName: lastName })
        console.log(userDetails);
        if (userDetails)
        {
            return res.status(200).json({success:true, msg:"registered successfully", data:{first_name: userDetails.firstName, middle_name:userDetails.middleName, last_name:userDetails.lastName,user_id:userDetails.userId}})
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});
    }
})

// view user details
app.get("/getUserDetail/:id", async (req,res)=>{
    const {id} = req.params;
    try
    {
        if (!id)
        {
            return res.status(400).json({success:false, msg:"No id given "});
        }
        const foundUserDetail = await UserDetail.findOne({userId:id});
        if (!foundUserDetail)
        {
            return res.status(500).json({success:false, msg:`No user with the given Id: ${id}`});
        }
        return res.status(200).json({success:true, msg:"user details retrieved", data:{first_name: foundUserDetail.firstName, middle_name:foundUserDetail.middleName, last_name:foundUserDetail.lastName,user_id:foundUserDetail.userId}})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});
    
    }
    
})


app.get("/flightDetails", async (req, res)=>{
    try
    {
        const flight_details = await Flight.find();
        if (flight_details.length === 0)
        {
            return res.status(500).json({success:false, msg:"Internal Server Error: Refresh Again"})
        }
        return res.status(200).json({success:true, data:flight_details})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});
    
    }

})


app.post("/booking", async (req,res)=>{
    const {userId, flightId} = req.body;
    try
    {
        if (!userId || !flightId)
        {
            return res.status(400).json({success:false, msg:"Invalid INput"});
        }

        const booking_created = await Booking.create({userId:userId, flightId:flightId });

        if (!booking_created)
        {
            return res.status(500).json({success:false, msg:"Server Error"})
        }
        return res.status(200).json({success:true, msg:"Flight created", data:flight_created});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"})
    }
})


app.get("/booking", async (req,res)=>{
    const {userId} = req.body;
    if (!userId)
    {
        return res.status(400).json({success:false, msg:"Invalid Paramenter"});
    }

    // check if such user exist
    const foundUser = await User.findOne({_id:userId});
    if (!foundUser)
    {
        return res.status(404).json({success:false, msg:`No user found with id: ${userId}`})
    }
    const foundBooking = await Booking.find({userId:userId});
    if (foundBooking)
    {
        return res.status(200).json({success:true, data:foundBooking}); 
    }
})

app.post("/payment", async (req,res)=>{
    const {bookingID, amountPaid, paymentMethod, paymentStatus} = req.body;
    try
    {
        if (!bookingID || !amountPaid || !paymentMethod || !paymentStatus)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"})
        }
        const payment = await PayMent.create({bookingID:bookingID, amountPaid:amountPaid, paymentMethod:paymentMethod, paymentStatus:paymentStatus});
        if (!payment)
        {
            return res.status(500).json({success:false, msg:"Server Error"});
        }
        return res.status(200).json({success:true, data:payment})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Server error"});
    }

})

app.get("/payment", async (req,res)=>{
    const {bookingID} = req.body;
    try
    {
        if (!bookingID)
        {
            return res.status(400).json({success:false, msg:"invalid input"});
        }
        const foundPayment = await bookingID.findOne({bookingID:bookingID});
        if (!foundPayment)
        {
            return res.status(404).json({success:false, msg:"No payment with bookingID"});
        }
        return res.status(200).json({success:true, data:foundPayment});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Server error"});
    }

})
//ADMIN FUNCIONALITIES
// create flightDetails
app.post("/flightDetails", async (req,res)=>{
    const {flightName, departure ,destination, departureTime, arrivalTime, totalSeats, price} = req.body;
    try
    {
        if (!flightName || !departure  || !destination || !departureTime || !arrivalTime || !totalSeats || !price)
        {
            return res.status(400).json({success:false, msg:"Invalid input"});
        }
        const flight_created = Flight.create({flightName:flightName, departure:departure ,destination:destination, departureTime:departureTime, arrivalTime:arrivalTime, totalSeats:totalSeats, price:price})
        if (!flight_created)
        {
            return res.status(500).json({success:false, msg:"Error creating flight details"});
        }
        return res.status(200).json({success:true, msg:"Flight details created successfully", data:{flightName:flight_created.flightName, departure:flight_created.departure, destination:flight_created.destination, departureTime:flight_created.departureTime, arrivalTime:flight_created.arrivalTime, totalSeats:flight_created.totalSeats, price:flight_created.price}});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"})
    }
})



const port = process.env.PORT_NUMBER;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})