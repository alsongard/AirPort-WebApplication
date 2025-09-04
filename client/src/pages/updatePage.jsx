import { useEffect, useState } from 'react';
import { Plane, MapPin, Calendar, Sun, Moon,  Clock, Users, Star, DollarSign, Wifi } from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function UpdatePage()
{
    const [dark, setDarkmode] = useState(false);
    const handleChangeTheme = ()=>{
        setDarkmode((prevValue)=>!prevValue);
    }
    const darkTheme = dark ? "dark": "";
    // console.log(`this is ${darkTheme}`);
    const {id} = useParams();
    const navigate = useNavigate();
    // console.log(`id from params: ${id}`);
    const [flightData, setFlightData] = useState({
        flightName: '',
        departureCountry: '',
        departureCity: '',
        destinationCountry: '',
        destinationCity: '',
        departureDate: '',
        arrivalDate: '',
        totalSeats: '',
        firstSeats: '',
        businessSeats: '',
        premiumSeats: '',
        economySeats: '',
        flightDuration: '',
        flightAmenities: '',
        flightRating: '',
        seatClass: '',
        firstPrice: '',
        businessPrice: '',
        premiumPrice: '',
        economyPrice: ''
    });
    const GetFlightData = async()=>
        {

            const response = await axios.get(`https://airportwebapp-api.vercel.app/api/admin/singleFlight/${id}`);
            // console.log(response); // testing:working
            if (response.data.success)
            {
                const flightDetails = response.data.data;
                setFlightData({
                    flightName:flightDetails.flightName, 
                    departureCountry:flightDetails.departureCountry,
                    departureCity:flightDetails.departureCity,
                    destinationCountry:flightDetails.destinationCountry,
                    destinationCity:flightDetails.destinationCity,
                    departureDate:flightDetails.departureDate,
                    arrivalDate:flightDetails.arrivalDate,
                    totalSeats:flightDetails.totalSeats,
                    firstSeats:flightDetails.seatNumbers.firstSeats,
                    businessSeats:flightDetails.seatNumbers.businessSeats,
                    premiumSeats:flightDetails.seatNumbers.premiumSeats,
                    economySeats:flightDetails.seatNumbers.economySeats,
                    flightDuration:flightDetails.flightDuration,
                    flightAmenities:flightDetails.flightAmenities,
                    flightRating:flightDetails.flightRating,
                    seatClass:flightDetails.seatClass,
                    firstPrice:flightDetails.flightClassPrice.first,
                    businessPrice:flightDetails.flightClassPrice.business,
                    premiumPrice:flightDetails.flightClassPrice.premium,
                    economyPrice:flightDetails.flightClassPrice.economy
                })
            }
        }

    useEffect(()=>{
        GetFlightData();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFlightData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleSubmit =  async (event) => {
        event.preventDefault();
        console.log('Updated Flight Data:');
        console.log(flightData);
        // const response = await axios.put(`https://airportwebapp-api.vercel.app/api/admin/updateFlight/${id}`, flightData);
        const response = await axios.put(`http://localhost:5000/api/flights/updateFlight/${id}`, flightData);
        if (response.data.success) {
            alert('Flight data updated successfully!');
            navigate("/admindash");
        }
    };

// min-h-screen bg-[#1B78D1] py-8 px-4
    return (
        <div className={darkTheme}>
            <section className='min-h-screen dark:bg-[#1B78D1] bg-white py-8 px-4 '>
                <div className="max-w-6xl mx-auto">
                    <div className=" b-red-300 rounded-lg shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="dark:bg-[#363B3F]  bg-blue-600 px-6 py-4">
                            <div className="flex flex-row justify-between items-center ">
                                <div className='flex flex-row space-x-3'>
                                    <Plane className="h-8 w-8 text-white" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">Edit Flight Details</h1>
                                        <p className="text-blue-100">SkyLux Airport Admin Panel</p>
                                    </div>
                                </div>

                                <div onClick={handleChangeTheme}>
                                    {
                                        dark === true ? 
                                        (
                                            <Sun className='dark:text-white'/>
                                        )
                                        : 
                                        (
                                            <Moon/>
                                        )
                                    }
                                </div>
                            </div>

                        </div>

                        {/* Form */}
                        <form className="p-6 dark:bg-[#363B3F]" onSubmit={handleSubmit}>
                            <div className="space-y-8">
                            {/* Basic Flight Information */}
                            <div>
                                <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-4 flex items-center">
                                <Plane className="h-5 w-5 mr-2 dark:text-white text-blue-600" />
                                Basic Flight Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="flightName" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">
                                    Flight Name *
                                    </label>
                                    <input
                                    type="text"
                                    id="flightName"
                                    name="flightName"
                                    value={flightData.flightName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="flightDuration" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Flight Duration *
                                    </label>
                                    <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        id="flightDuration"
                                        name="flightDuration"
                                        value={flightData.flightDuration}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="flightRating" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Flight Rating (1-10) *
                                    </label>
                                    <div className="relative">
                                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="number"
                                        id="flightRating"
                                        name="flightRating"
                                        value={flightData.flightRating}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="10"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    </div>
                                </div>
                                </div>
                            </div>

                            {/* Route Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-blue-600 dark:text-white" />
                                Route Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="departureCountry" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Departure Country *
                                    </label>
                                    <input
                                        type="text"
                                        id="departureCountry"
                                        name="departureCountry"
                                        value={flightData.departureCountry}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Departure City *
                                    </label>
                                    <input
                                    type="text"
                                    id="departureCity"
                                    name="departureCity"
                                    value={flightData.departureCity}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="destinationCountry" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Destination Country *
                                    </label>
                                    <input
                                    type="text"
                                    id="destinationCountry"
                                    name="destinationCountry"
                                    value={flightData.destinationCountry}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="destinationCity" className="block text-sm font-medium text-gray-700 mb-1">
                                    Destination City *
                                    </label>
                                    <input
                                    type="text"
                                    id="destinationCity"
                                    name="destinationCity"
                                    value={flightData.destinationCity}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>
                                </div>
                            </div>

                            {/* Schedule Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Calendar className="h-5 w-5 mr-2 text-blue-600 dark:text-white"/>
                                    Schedule Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                            Departure Date & Time *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="departureDate"
                                            name="departureDate"
                                            value={flightData.departureDate.slice(0, 16)}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                            Arrival Date & Time *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="arrivalDate"
                                            name="arrivalDate"
                                            value={flightData.arrivalDate.slice(0, 16)}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Seat Configuration */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Users className="h-5 w-5 mr-2 text-blue-600 dark:text-white" />
                                Seat Configuration
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <div>
                                    <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Total Seats *
                                    </label>
                                    <input
                                    type="number"
                                    id="totalSeats"
                                    name="totalSeats"
                                    value={flightData.totalSeats}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="firstSeats" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    First Class Seats *
                                    </label>
                                    <input
                                    type="number"
                                    id="firstSeats"
                                    name="firstSeats"
                                    value={flightData.firstSeats}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="businessSeats" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Business Class Seats *
                                    </label>
                                    <input
                                    type="number"
                                    id="businessSeats"
                                    name="businessSeats"
                                    value={flightData.businessSeats}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="premiumSeats" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Premium Economy Seats *
                                    </label>
                                    <input
                                    type="number"
                                    id="premiumSeats"
                                    name="premiumSeats"
                                    value={flightData.premiumSeats}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="economySeats" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Economy Class Seats *
                                    </label>
                                    <input
                                    type="number"
                                    id="economySeats"
                                    name="economySeats"
                                    value={flightData.economySeats}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                </div>
                                </div>
                            </div>

                            {/* Pricing Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white flex items-center">
                                <DollarSign className="h-5 w-5 mr-2 text-blue-600 dark:text-white" />
                                Class Pricing
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="firstPrice" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    First Class Price *
                                    </label>
                                    <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white" />
                                    <input
                                        type="number"
                                        id="firstPrice"
                                        name="firstPrice"
                                        value={flightData.firstPrice}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="businessPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">
                                    Business Class Price *
                                    </label>
                                    <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white" />
                                    <input
                                        type="number"
                                        id="businessPrice"
                                        name="businessPrice"
                                        value={flightData.businessPrice}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="premiumPrice" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Premium Economy Price *
                                    </label>
                                    <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white" />
                                    <input
                                        type="number"
                                        id="premiumPrice"
                                        name="premiumPrice"
                                        value={flightData.premiumPrice}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="economyPrice" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Economy Class Price *
                                    </label>
                                    <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white" />
                                    <input
                                        type="number"
                                        id="economyPrice"
                                        name="economyPrice"
                                        value={flightData.economyPrice}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    </div>
                                </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center dark:text-white">
                                <Wifi className="h-5 w-5 mr-2 text-blue-600 dark:text-white" />
                                Additional Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="flightAmenities" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Flight Amenities (comma-separated) *
                                    </label>
                                    <textarea
                                        id="flightAmenities"
                                        name="flightAmenities"
                                        value={flightData.flightAmenities}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 dark:text-gray-100">Separate each amenity with a comma</p>
                                </div>

                                <div>
                                    <label htmlFor="seatClass" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100">
                                    Available Seat Classes (comma-separated) *
                                    </label>
                                    <textarea
                                        id="seatClass"
                                        name="seatClass"
                                        value={flightData.seatClass}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 dark:text-gray-100">Separate each class with a comma</p>
                                </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-200">
                                <div className="flex justify-end space-x-1.5">
                                    <input
                                        type="submit"
                                        value="Update Flight Data"
                                        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                                    />
                                    <button
                                        type='button'
                                        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                                        onClick={()=>{navigate('/admindash')}}
                                    >
                                        Go AdminDashBoard
                                    </button>
                                </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}