import { useState, useEffect } from "react";
import axios from "axios";
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';

export default function AddFlightForm()
{
    const [newFlight, setNewFlight] = useState({
        flightName: "",
        departureCountry: "",
        departureCity: "",
        destinationCountry: "",
        destinationCity: "",
        departureDate: "",
        departureTime: "",
        arrivalDate: "",
        arrivalTime: "",
        totalSeats: "",
        flightDuration: "",
        flightAmenities: [],
        seatClass: [], 
        premium: "", // price
        business:"", // price
        economy:"", // price
        first:"", // price
        economySeats: "",
        businessSeats: "",
        firstSeats: "",
        premiumSeats: "",
        flightRating:""

    });
    const handleNewFlightChange =(event)=>
    {
        const {name, value} = event.target;
        setNewFlight((prevData)=>{
        return {
            ...prevData,
            [name]: value
        }
        })
    }
    const handleCheckBox =(event)=>
    {
        const {checked, value} = event.target;
        console.log(`checked: ${checked}`);
        console.log(`value: ${value}`);
        setNewFlight((prevData)=>{
        if (checked)
        {
            return {
            ...prevData, 
            flightAmenities: [...prevData.flightAmenities, value]
            }
        }
        else
        {
            return {
            ...prevData,
            flightAmenities: prevData.flightAmenities.filter((amenitieItem)=>{
                console.log(amenitieItem);
                return amenitieItem !== value;
            })
            }
        }
        })
    }
    const handleSeatCheckBox =(event)=>
    {
        const {value, checked} = event.target;
        setNewFlight((prevData)=>{
            if (checked)
            {
                return {
                ...prevData, 
                seatClass: [...prevData.seatClass, value]
                }
            }
            else
            {
                return {
                    ...prevData,
                    seatClass: prevData.seatClass.filter((seatClassItem)=>{return seatClassItem !== value})
                }
            }
        })
    }
    const [departureCountry , setDepatureCountry] = useState();
    const [departureCity, setDepatureCity] = useState();
    
    const [destinationCountry, setDestinationCountry] = useState();
    const [destinationCity, setdestinationCity] = useState();
    
    const [newFlightSuccessMsg, setNewFlightSuccessMsg] = useState(false); 

    const  handleSubmit = async(event)=>
    {
        event.preventDefault();
        newFlight.departureCountry = departureCountry;
        newFlight.departureCity = departureCity;
        newFlight.destinationCity = destinationCity;
        newFlight.destinationCountry = destinationCountry;
        try
        {
            console.log(newFlight);
            const new_flight = await axios.post("http://localhost:5000/api/flights/createFlight", newFlight)
            if (new_flight.data.sucess)
            {
                setNewFlightSuccessMsg(true);
                setTimeout(()=>{
                    setNewFlightSuccessMsg(false);
                },8000)
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`)
        }
    }
    return (

        <div className='bg-white rounded-lg pb-[20px]'>
            <form onSubmit={handleSubmit} className='pb-[10px] px-[15px]'>
                <div className='grid grid-cols-2 space-x-[15px] gap-y-[30px] py-[15px]'>
                    <div className=' flex flex-col shadow-[0px_0px_1px_#696969] p-[5px] rounded-md space-y-[2.5px]'>
                        <label className='font-dm-serif' htmlFor='flightName'>Flight Name</label>
                        <input className='border-1 border-black p-[5px] rounded-md'id="flightName"  type='text' onChange={handleNewFlightChange} value={newFlight.flightName} name='flightName' />
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='totalSeats'>Total Seats</label>
                        <input id='totalSeats' type="number" name="totalSeats" value={newFlight.totalSeats} onChange={handleNewFlightChange} className='border-1 border-black p-[5px] rounded-md'/>
                    </div>
                    <div className='font-dm-serif  flex flex-col  shadow-[0px_0px_1px_black] p-[5px] rounded-md  space-y-[2.5px]'>
                        <label htmlFor=''>Departure Country</label>
                        <CountryDropdown className='border-1 border-black rounded-md  p-[5px] ' name='departureCountry' value={departureCountry} onChange={(val)=>{setDepatureCountry(val)}} />
                    </div>
                    <div className='flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor=''>Departure City</label>
                        <RegionDropdown className='border-1 border-black rounded-md  p-[5px]' country={departureCountry} value={departureCity} onChange={(val)=>{setDepatureCity(val)}}/>
                    </div>
                    <div className='flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='departureDate'>Departure Date</label>
                        <input className='border-1 border-black p-[5px] rounded-md' type='date' name='departureDate' value={newFlight.departureDate} onChange={handleNewFlightChange}/>
                    </div>
                    <div className='flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='departureTime'>Departure Time</label>
                        <input className='border-1 border-black p-[5px] rounded-md' type='time' name='departureTime' value={newFlight.departureTime} onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif'>Destination Country</label>
                        <CountryDropdown className='border-1 border-black p-[5px] rounded-md' value={destinationCountry} onChange={(val)=>{setDestinationCountry(val)}}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif'>Destination City</label>
                        <RegionDropdown country={destinationCountry} className='border-1 border-black p-[5px] rounded-md' value={destinationCity} onChange={(val)=>{setdestinationCity(val)}}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif'>Arrival Date</label>
                        <input  type="date"  className='border-1 border-black p-[5px] rounded-md' value={newFlight.arrivalDate} name='arrivalDate' onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='arrivalTime'>Arrival Time</label>
                        <input type='time' className='border-1 border-black p-[5px] rounded-md' value={newFlight.arrivalTime} name='arrivalTime' onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='standardprice'>First Seats</label> 
                        <input id='standardprice' type="number"  className='border-1 border-black p-[5px] rounded-md' value={newFlight.firstSeats} name='firstSeats'  onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='standardprice'>Business Seats </label> 
                        <input id='standardprice' type="number"  className='border-1 border-black p-[5px] rounded-md' value={newFlight.businessSeats} name='businessSeats' onChange={handleNewFlightChange} />
                    </div>
                    <div className=' flex flex-col shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='standardprice'>Premium Seats</label> 
                        <input id='standardprice' type="number"  className='border-1 border-black p-[5px] rounded-md' value={newFlight.premiumSeats} name='premiumSeats'  onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='standardprice'>Economy Seats</label> 
                        <input id='standardprice' type="number"  className='border-1 border-black p-[5px] rounded-md' value={newFlight.economySeats} name='economySeats' onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='firstPrice'>First Seat Price</label>
                        <input  id='firstPrice' type='number' className='border-1 border-black p-[5px] rounded-md' name='first' value={newFlight.first} onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='businessPrice'>Business  Seat Price</label>
                        <input  id='businessPrice' type='number' className='border-1 border-black p-[5px] rounded-md' name='business' value={newFlight.business} onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='premiumprice'>Premium Seat Price</label>
                        <input  id='premiumprice' type='number' className='border-1 border-black p-[5px] rounded-md' name='premium' value={newFlight.premium} onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='economyPrice'>Economy Seat Price</label>
                        <input  id='economyPrice' type='number' className='border-1 border-black p-[5px] rounded-md' name='economy' value={newFlight.economy} onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='flightanemities'>Flight Amenities</label>
                        <div className='border-1 border-black p-[5px] rounded-md flex flex-row gap-x-[25px]'>
                        <label className=''>Blankets   <input type='checkbox' name='flightAmenities' value='Blankets'   onChange={handleCheckBox} checked={newFlight.flightAmenities.includes("Blankets")}/></label>
                        <label className=''>Pillow     <input type='checkbox' name='flightAmenities' value='Pillow'     onChange={handleCheckBox} checked={newFlight.flightAmenities.includes("Pillow")}/></label>
                        <label className=''>Ear Plug   <input   type='checkbox' name='flightAmenities' value='Ear Plug' onChange={handleCheckBox} checked={newFlight.flightAmenities.includes("Ear Plug")}/></label>
                        <label className=''>FREE WiFi  <input  type='checkbox' name='flightAmenities' value='FREE WiFi' onChange={handleCheckBox} checked={newFlight.flightAmenities.includes("FREE WiFi")}/></label>
                        </div>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor=''>Seat Class</label>
                        <div className='border-1 border-black p-[5px] rounded-md flex flex-row gap-x-[25px]'>
                        <label>First    <input type='checkbox'  value='First' name='First' checked={newFlight.seatClass.includes('First')} onChange={handleSeatCheckBox}/> </label>
                        <label>Business <input type='checkbox'  value='Business' name='Business' checked={newFlight.seatClass.includes('Business')} onChange={handleSeatCheckBox}/> </label>
                        <label>Premium  <input type='checkbox'  value='Premium' name='Premium' checked={newFlight.seatClass.includes('Premium')} onChange={handleSeatCheckBox}/> </label>
                        <label>Economy  <input type='checkbox'  value='Economy' name='Economy' checked={newFlight.seatClass.includes('Economy')} onChange={handleSeatCheckBox}/> </label>
                        </div>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='flightDuration'>Flight Duration</label>
                        <input id='flightduration' type="text" name="flightDuration" className='border-1 border-black p-[5px] rounded-md' value={newFlight.flightDuration} onChange={handleNewFlightChange}/>
                    </div>
                    <div className=' flex flex-col space-y-[2.5px] shadow-[0px_0px_1px_black] p-[5px] rounded-md'>
                        <label className='font-dm-serif' htmlFor='flightRating'>Flight Rating</label>
                        <input id='flightRating' type="number" name="flightRating" className='border-1 border-black p-[5px] rounded-md' value={newFlight.flightRating} onChange={handleNewFlightChange}/>
                    </div>
                </div>
                <input className='bg-green-900 rounded-md py-[10px] w-full hover:bg-green-500' type='submit' value='submit'/>
            </form>
            {
                newFlightSuccessMsg && (<p className='newFlightSuccess'>New Flight Successfully Added</p>)
            }
        </div>
    )
}