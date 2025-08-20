const Booking = require("../models/booking.model");
const User = require("../models/user.model");


const SetUserBooking =  async (req,res)=>{
    const {userId, flightId, bookingStatus, seatPreference, mealPreference, emergencyContactName, emergencyContactPhone, specialRequest} = req.body;
    console.log(`userId: ${userId} \n flightId: ${flightId} \n bookingStatus: ${bookingStatus} \n seatPreference: ${seatPreference} \n mealPreference: ${mealPreference} \n emergencyContactName: ${emergencyContactName} \n emergencyContactPhone: ${emergencyContactPhone} \n specialRequest: ${specialRequest}`); // testing: working
    try
    {
        if (!userId || !flightId || !bookingStatus)
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
}


const GetUserBooking = async (req,res)=>{
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
}

module.exports = {GetUserBooking, SetUserBooking};