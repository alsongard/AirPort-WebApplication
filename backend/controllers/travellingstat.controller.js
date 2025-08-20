const UserTravellingStats = require("../models/travelStats.model");

const SetTravellingStat = async (req, res)=>{
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
}

const GetUserTravellStats = async (req, res)=>{
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
}

module.exports = {GetUserTravellStats, SetTravellingStat};