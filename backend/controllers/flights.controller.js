
const Flight = require("../models/flightdetails.model");


const CreateFlight = async (req,res)=>{
    /**
     * flightName
        departureCountry
        departureCity
        destinationCountry
        destinationCity
        departureDate
        departureTime
        arrivalDate
        arrivalTime
        totalSeats
        flightDuration
        flightAmenities
        seatClass
        premium
        business
        economy
        first
        economySeats
        businessSeats
        firstSeats
        premiumSeats
     */
    const {flightName, departureCountry, departureCity, destinationCountry, destinationCity, totalSeats, flightDuration, premium, business, economy, first, economySeats, businessSeats, firstSeats, premiumSeats, flightAmenities, seatClass, flightRating } = req.body;
    const seatNumbers = {
        "firstSeats":firstSeats,
        "businessSeats":businessSeats,
        "premiumSeats":premiumSeats,
        "economySeats":economySeats
    } 
    const flightClassPrice = {
        "business":business,
        "economy":economy,
        "first":first,
        "premium":premium
    }
    let {departureDate, departureTime, arrivalDate, arrivalTime,} = req.body;
    departureDate = departureDate + "T" + departureTime
    console.log(`departureDate: ${departureDate}`);
    arrivalDate = arrivalDate + "T"+ arrivalTime;
    console.log(`arrivateDate: ${arrivalDate}`);
    console.log(`flightName : ${flightName}\n departureCountry : ${departureCountry}\n departureCity : ${departureCity}\n destinationCountry : ${destinationCountry}\n destinationCity : ${destinationCity}\n departureDate : ${departureDate}\n arrivalDate : ${arrivalDate}\n totalSeats : ${totalSeats}\n flightDuration : ${flightDuration}\n flightAmenities : ${flightAmenities}\n seatClass : ${seatClass}\n flightRating : ${flightRating}\n flightClassPrice:${flightClassPrice}\n SeatNumbers: ${seatNumbers}`);
    
    console.log(flightClassPrice);
    console.log(seatNumbers)
    try
    {
        if (!flightName || !departureCountry || !departureCity || !destinationCountry  || !destinationCity || !departureDate || !arrivalDate || !totalSeats || !flightDuration || !flightAmenities || !seatClass || !flightRating || !flightClassPrice || !seatNumbers)
        {
            console.log('invalid input')
            return res.status(400).json({success:false, msg:"Invalid input"});
        }
        const flight_created = await Flight.create({flightName:flightName, departureCountry:departureCountry, departureCity:departureCity, destinationCountry:destinationCountry, destinationCity:destinationCity, departureDate:departureDate, arrivalDate:arrivalDate, totalSeats:totalSeats, flightDuration:flightDuration, flightAmenities:flightAmenities, seatClass:seatClass, flightRating:flightRating, flightClassPrice:flightClassPrice, seatNumbers: seatNumbers})
        if (!flight_created)
        {
            return res.status(500).json({success:false, msg:"Error creating flight details"});
        }
        return res.status(200).json({success:true, msg:"Flight details created successfully", data:flight_created});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Internal Server Error"})
    }
};

const SearchFlight = async (req, res)=>{
    const { departureCity,   destinationCity , departureDate} = req.body;
    console.log(`departureCity: ${departureCity} \n destinationCity: ${destinationCity}\n departureDate ${departureDate}`); // testing: working
    try
    {
        if (!departureCity || !destinationCity )
        {
            console.log(`invalid input`);
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        const new_date_type = new Date(departureDate);
        console.log(`type of new_date_type:  ${typeof(new_date_type)}`)
        console.log(new_date_type);

        await Flight.find().where('de')
        //departureTime:departureTime, departureDa:returnDates
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
}

// get All Flight Details
const GetFlightDetails = async (req, res)=>{
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

}

const UpdateFlightDetails = async (req,res)=>{
    const {id} = req.params;
    const {flightName, departureCountry, departureCity, destinationCountry, destinationCity, totalSeats, flightDuration, premium, business, economy, first, economySeats, businessSeats, firstSeats, premiumSeats, flightAmenities, seatClass, flightRating } = req.body;
    try
    {
        if (!id)
        {
            return res.status(400).json({success:false, msg:"Invalid Input"});
        }
        const updatedFlight = await Flight.findByIdAndUpdate(id, {flightName, departureCountry, departureCity, destinationCountry, destinationCity, totalSeats, flightDuration, premium, business, economy, first, economySeats, businessSeats, firstSeats, premiumSeats, flightAmenities, seatClass, flightRating}, {new:true});
        console.log("Right after updating");
        console.log(updatedFlight);
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
}


module.exports = {UpdateFlightDetails, GetFlightDetails, SearchFlight, CreateFlight};