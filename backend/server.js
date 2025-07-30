const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// models
const User = require("./models/user.model");
const UserDetail = require("./models/userdetails.model");
const Flight = require("./models/flightdetails.model");
const Booking = require("./models/booking.model");
const PayMent = require("./models/paymentdetails.model");
const UserPreference = require("./models/userPreferences.model");
const UserTravellingStats = require("./models/travelStats.model");

// configurations
const saltRounds = 10;




app.use(express.json());
app.use(express.urlencoded({extended:false}));


const corsOption = {
    origin: function (origin, callback){
        if (process.env.NODE_ENV !== "production") // checks the environment at which t's running
        {
            // console.log(`[DEV] Allowing origin: ${origin}`)
            return callback(null, true);
        }
        if (!origin)
        {
            return callback(null,true); // remember second argument: returns true(permit domain) or false(permit domain) 
        }
        const allowedDomains = [
            "https://air-port-web-application.vercel.app/",
            "http://localhost:5173"
        ]
        if (allowedDomains.includes(origin))// not equal the indexOf() method returns -1 if no value ns found in the array
        {
            return callback(null, true); // firstArgument: if we are expecting an error set this value as shown in else statemetn
            // second argument: boolean value which indeicates if the origin is allowed(true) : on not allowed(false)
        }
        else
        {
            callback(new Error(`Origin: ${origin} not allowed by cors`));
        }
    },
    methods:["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOption));


// home route
app.get("/", (req,res)=>{
    res.status(200).send("<h1>Welcome</h1>");
})

// create user
app.post("/register",async (req,res)=>{
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
})

// registeruserDetails: form 
app.post("/regUserDetail", async (req, res)=>{
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
    
})

app.post('/userpreferences', async (req, res)=>{
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
})
app.get("/userpreferences/:userId", async (req,res)=>{
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

})

app.post("/travellingStat/:id", async (req, res)=>{
    const {id} = req.params;
    const {trips, distance, lastTripDate, countriesNum} = req.body;
    // console.log(req.body);
    //console.log(`id: ${id} \n trips: ${trips} \n distance: ${distance} \n lastTripDate: ${lastTripDate} \n countriesNum: ${countriesNum}`); // testing:working
    if (!id)
    {
        return res.status(401).json({success:false, msg:"No id givne"});
    }
    if (!trips || !distance || !lastTripDate || !countriesNum)
    {
        return res.status(404).json({success:false, msg:"Invalid Input"})
    }
    try
    {
        const new_travel_stat = await UserTravellingStats.create({userId:id, totalTrips:trips, totalDistance:distance, lastTripDate:lastTripDate, countriesVisited:countriesNum});
        // console.log(new_travel_stat); // testing:working
        if (new_travel_stat)
        {
            return res.status(200).json({success:true, msg:"User created successfully", data:{totalTrips:new_travel_stat.totalTrips, totalDistance:new_travel_stat.totalDistance, lastTripDate:new_travel_stat.lastTripDate, countriesVisited:new_travel_stat.countriesVisited}});
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"});
    }
})

app.get("/travellingStats/:id", async (req, res)=>{
    const {id} = req.params;
    if (!id)
    {
        return res.status(401).json({success:false, msg:"No id given"});
    }
    try
    {
        const travel_stat = await UserTravellingStats.findOne({userId:id})
        console.log(`travel_stat`); // testing: working
        console.log(travel_stat); // testing: working
        if (!travel_stat)
        {
            return res.status(404).json({success:false, msg:`No data for the given id: ${id}`});
        }
        return res.status(200).json({success:true, msg:"User travel Stat found", data:{totalTrips:travel_stat.totalTrips, totalDistance:travel_stat.totalDistance, lastTripDate:travel_stat.lastTripDate, countriesVisited:travel_stat.countriesVisited}});

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"});
    }
})


app.get("/flightDetails", async (req, res)=>{
    try
    {
        const flight_details = await Flight.find();
        if (flight_details.length === 0)
        {
            return res.status(500).json({success:false, msg:"No Flights At the Moment Try Again Later"})
        }
        return res.status(200).json({success:true, data:flight_details})
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});
    
    }

})

// search flight 
app.post("/flightSearch", async (req, res)=>{
    const { departureCity,  destinationCity,  departureDate, returnDate } = req.body;
    console.log(`departureCity: ${departureCity} \n destinationCity: ${destinationCity} \n departureDate: ${departureDate} \n returnDate: ${returnDate}`); // testing: working
    try
    {
        if (!departureCity || !destinationCity || !departureDate || !returnDate)
        {
            console.log(`invalid input`);
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        //departureTime:departureTime, departureDate:departureDate, returnDate:returnDates
        const flight_details = await Flight.find({departureCity:departureCity, destinationCity:destinationCity})
        console.log(`flight_details`); // testing: working
        console.log(flight_details); // testing: working
        if (flight_details.length === 0)
        {
            return res.status(200).json({success:false, msg:"No flight found with the given details"})
        }
        return res.status(200).json({success:true, data:flight_details});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:`Internal Server Error`});
    }
})


app.post("/booking", async (req,res)=>{
    const {userId, flightId, bookingStatus, seatPreference, mealPreference, emergencyContactName, emergencyContactPhone, specialRequest} = req.body;
    console.log(`userId: ${userId} \n flightId: ${flightId} \n bookingStatus: ${bookingStatus} \n seatPreference: ${seatPreference} \n mealPreference: ${mealPreference} \n emergencyContactName: ${emergencyContactName} \n emergencyContactPhone: ${emergencyContactPhone} \n specialRequest: ${specialRequest}`); // testing: working
    try
    {
        if (!userId || !flightId || !bookingStatus || !seatPreference || !mealPreference || !specialRequest)
        {
            return res.status(400).json({success:false, msg:"Invalid INput"});
        }
        let booking_created;
        if (!emergencyContactName || !emergencyContactPhone)
        {
            booking_created = await Booking.create({userId:userId, flightId:flightId, bookingStatus:bookingStatus, seatPreference:seatPreference, mealPreference:mealPreference, specialRequest:specialRequest});
            console.log(`booking_created : with emergencyContactName & emergencyContactPhone not set`); // testing: working
            // console.log(booking_created); // testing: working
        }
        else
            {
            booking_created = await Booking.create({userId:userId, flightId:flightId, bookingStatus:bookingStatus, seatPreference:seatPreference, mealPreference:mealPreference, specialRequest:specialRequest});
            console.log(`booking_created : with emergencyContactName & emergencyContactPhone set`); // testing: working
            // console.log(booking_created); // testing: working
        }

        if (!booking_created)
        {
            return res.status(500).json({success:false, msg:"Server Error"})
        }
        return res.status(200).json({success:true, msg:"Booking created successfully", data:booking_created});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"})
    }
})


app.get("/booking/:id", async (req,res)=>{
    const {id} = req.params;
    if (!id)
    {
        return res.status(400).json({success:false, msg:"Invalid Parameter"});
    }
    try
    {
        // check if such user exist
        const foundUser = await User.findOne({_id:id});
        if (!foundUser)
        {
            return res.status(404).json({success:false, msg:`No user found with id: ${id}`})
        }
        const foundBooking = await Booking.find({userId:id}).populate("flightId",  "flightName  departureCountry departureCity  destinationCountry  destinationCity  departureTime  arrivalTime  price");
        console.log(`foundBooking`); // testing: working
        console.log(foundBooking); // testing: working
        if (foundBooking)
        {
            return res.status(200).json({success:true, data:foundBooking}); 
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"});
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
        const foundPayment = await PayMent.findOne({bookingID:bookingID}).populate("bookingID");
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
    const {flightName, departureCountry, departureCity ,destinationCountry, destinationCity, departureTime, arrivalTime, totalSeats, price, flightDuration, flightAmenities, flightRating, flightClass} = req.body;
    try
    {
        if (!flightName || !departureCountry || !departureCity || !destinationCountry  || !destinationCity || !departureTime || !arrivalTime || !totalSeats || !price || !flightDuration || !flightAmenities || !flightRating || !flightClass)
        {
            return res.status(400).json({success:false, msg:"Invalid input"});
        }
        const flight_created = await Flight.create({flightName:flightName, departureCountry:departureCountry, departureCity:departureCity, destinationCountry:destinationCountry, destinationCity:destinationCity, departureTime:departureTime, arrivalTime:arrivalTime, totalSeats:totalSeats, price:price, flightDuration:flightDuration, flightAmenities:flightAmenities, flightRating:flightRating, flightClass:flightClass})
        if (!flight_created)
        {
            return res.status(500).json({success:false, msg:"Error creating flight details"});
        }
        return res.status(200).json({success:true, msg:"Flight details created successfully", data:{flightName:flight_created.flightName, departureCountry:flight_created.departureCountry, departureCity:flight_created.departureCity, destinationCountry:flight_created.destinationCountry, destinationCity:flight_created.destinationCity, departureTime:flight_created.departureTime, arrivalTime:flight_created.arrivalTime, totalSeats:flight_created.totalSeats, price:flight_created.price}});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"})
    }
})

// update flight details
app.put("/flightDetails/:id", async (req,res)=>{
    const {id} = req.params;
    const {flightName, departureCountry, departureCity ,destinationCountry, destinationCity, departureTime, arrivalTime, totalSeats, price, flightDuration, flightAmenities, flightRating, flightClass} = req.body;
    try
    {
        if (!id)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        const updatedFlight = await Flight.findByIdAndUpdate(id, {flightName:flightName, departureCountry:departureCountry, departureCity:departureCity, destinationCountry:destinationCountry, destinationCity:destinationCity, departureTime:departureTime, arrivalTime:arrivalTime, totalSeats:totalSeats, price:price, flightDuration:flightDuration, flightAmenities:flightAmenities, flightRating:flightRating, flightClass:flightClass}, {new:true});
        if (!updatedFlight)
        {
            return res.status(404).json({success:false, msg:`No flight found with id: ${id}`});
        }
        console.log(`updatedFlight`); // testing: working
        console.log(updatedFlight); // testing: working
        console.log(`Flight details updated successfully`);
        return res.status(200).json({success:true, msg:"Flight details updated successfully", data:updatedFlight});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"});
    }
});


module.exports = app;