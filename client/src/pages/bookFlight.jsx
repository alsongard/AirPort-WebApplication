import { useState ,useEffect } from 'react';
import { 
  Plane, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Search,
  Filter,
  Star,
  Wifi,
  Coffee,
  Headphones,
  CircleX
} from 'lucide-react';

import axios from "axios";

export default function SkyLuxFlightBooking() {
  const [searchFilters, setSearchFilters] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'Economy'
  });

  const apiURL= import.meta.env.VITE_API_URL;
  // console.log(`this is apiURL: ${apiURL}`) // testing:working
  // console.log(apiURL); // testing:working

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [userProfileData, setuserProfileData] = useState({});

  const user_email = localStorage.getItem("user_email");
  const user_id = localStorage.getItem("User_id");
  
  const getUserDetails = async ()=>{
    try
    {
      console.log(`user_id : ${user_id}`)
      const res = await axios.get(`${apiURL}/api/userdetails/getUserDetails/${user_id}`);
      // console.log(`This is response: ${res.status}`);
      // console.log(res);
  
      if (res.data.success)
      {
        // console.log(res.data.data); // success,otherproperties
        setuserProfileData(res.data.data);
      }

    }
    catch(err)
    {
      console.log(`Error: ${err}`);
    }
  };
  useEffect(() => {
    getUserDetails();
  },[])
  
  useEffect(() => {
    console.log(`userProfileData: `);
    console.log(userProfileData);
    setBookingData({
    firstName: userProfileData.first_name || '',
    lastName: userProfileData.last_name || '',
    email: user_email || '',
    phone: userProfileData.phone || '',
    passportNumber: userProfileData.passport || '',
    dateOfBirth: new Date(userProfileData.dateOfBirth).toLocaleDateString() || '',
    seatPreference: '',
    mealPreference: '',
    specialRequests: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  },[userProfileData])
  
  const [bookingData, setBookingData] = useState({
    firstName: userProfileData.first_name || '',
    lastName: userProfileData.last_name || '',
    email: user_email || '',
    phone: userProfileData.phone || '',
    passportNumber: userProfileData.passport || '',
    dateOfBirth: userProfileData.dateOfBirth || '',
    seatClass: 'Economy',
    seatPreference: '',
    mealPreference: '',
    specialRequests: '',
    emergencyContactName: userProfileData.emergencyContactName || '',
    emergencyContactPhone: userProfileData.emergencyContact ||  ''
  });

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setShowBookingForm(true);
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    console.log('Booking Data:', {
      flight: selectedFlight,
      passenger: bookingData
    });
    try
    {
      const response = await axios.post(`${apiURL}/api/booking/setBooking`, {
        userId:user_id,
        flightId: selectedFlight._id,
        departureDate: selectedFlight.departureDate,
        bookingStatus: 'confirmed',
        seatPreference: bookingData.seatPreference,
        mealPreference: bookingData.mealPreference,
        specialRequest: bookingData.specialRequests,
        emergencyContactName: bookingData.emergencyContactName,
        emergencyContactPhone: bookingData.emergencyContactPhone
      });
      console.log(response.data);
      if (response.data.success)
      {
        setBookingSuccessMsg("Flights booked successfully!");
        setTimeout(()=>{
          setBookingSuccessMsg("");
        }, 10000)
      }
      // alert('Flight booked successfully! Confirmation details will be sent to your email.');
    }
    catch(err)
    {
      console.error('Error booking flight:', err);
      // alert('Failed to book flight. Please try again later.');
    }

    // Reset form
    // setBookingData({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phone: '',
    //   passportNumber: '',
    //   dateOfBirth: '',
    //   seatPreference: '',
    //   mealPreference: '',
    //   specialRequests: '',
    //   emergencyContactName: '',
    //   emergencyContactPhone: ''
    // });
    // setShowBookingForm(false);
    // setSelectedFlight(null);
  };

  const renderAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'meals':
      case 'breakfast':
      case 'snacks':
      case 'premium meals':
        return <Coffee className="h-4 w-4" />;
      case 'entertainment':
        return <Headphones className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

   

  const [flights, setFlights] = useState([]);
  const getFlights = async () => {
    try { 
      const response = await axios.get(`${apiURL}/api/flights/getFlights`);
      if (response.data.success)
        {
          console.log('this is flights from getFlights');
          console.log(response.data.data);
          setFlights(response.data.data);
        }
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const [noFlightMsg, setNoFlightMsg] = useState("");// message when search is empty || no flights found
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState(""); // message when booking is successful
  const handleSearchFlight = async (event) => {
    event.preventDefault();
    console.log(searchFilters);
    // Perform search flight logic here
    try
    {
      const response = await axios.post(`${apiURL}/api/flights/searchFlight`, {
        departureCity: searchFilters.from,
        destinationCity: searchFilters.to,
        departureDate: searchFilters.departDate,
        returnDate: searchFilters.returnDate,
      });

      // console.log(`this is response`)
      // console.log(response);
      // console.log(`this is response.data`);
      // console.log(response.data);
      // console.log(response.data.success); 
      if (response.data.success)
      {
        setFlights(response.data.data);
      }
      if (response.status === 200 && !response.data.success) {
        // Update state with available flights
        console.log(`No flights found for the given search criteria`);
        setNoFlightMsg("No flights for the given search");
      }
    }
    catch (error) {
      console.error('Error searching flights:', error);
      // alert('Failed to search flights. Please try again later.');
    }
  };

  // the data handler/initial fetch for data
  function getData(){
    getFlights();
    setNoFlightMsg("")
  }


  // Initial fetch for flights and user details
  useEffect(() => {
    getFlights();
  },[])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className=" shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">
            Book Your <span className="text-blue-600">SkyLux</span> Flight
          </h1>
          <p className="text-blue-600 mt-2">Find and book the perfect flight for your journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!showBookingForm ? (
          <>
            {/* Search Filters */}
            <form onSubmit={handleSearchFlight} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Flights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="from"
                      value={searchFilters.from}
                      onChange={handleSearchChange}
                      placeholder="Departure City"
                      className="w-full placeholder:text-gray-300 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 " />
                    <input
                      type="text"
                      name="to"
                      value={searchFilters.to}
                      onChange={handleSearchChange}
                      placeholder="Destination City"
                      className="w-full placeholder:text-gray-300 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="departDate"
                      value={searchFilters.departDate}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="returnDate"
                      value={searchFilters.returnDate}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      name="passengers"
                      value={searchFilters.passengers}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                      <option value="4">4+ Passengers</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-1 justify-end">
                <button className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <Search className="h-4 w-4 mr-2" />
                  Search Flights
                </button>
                <button type='button' onClick={()=>{return getData()}} className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <CircleX className="h-4 w-4 mr-2" />
                  Clear Search
                </button>
                
              </div>
            </form>
            {/* No Flights Found Message */}
            {
              noFlightMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  {noFlightMsg}
                </div>
              )
            }

            {/* Available Flights */} {/* Also used for displaying search results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-blue-200">Available Flights</h2>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>

              {flights.map((flightObj) => (
                <div key={flightObj._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    {/* Flight Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Plane className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">SkyLux Prime</h3>
                            <p className="text-sm text-gray-600">{flightObj.flightName}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{flightObj.flightRating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-center"> 
                          <p className="text-2xl font-bold text-gray-900">{new  Date(flightObj.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          <p className="text-sm text-gray-600">{flightObj.departureCity}</p>
                        </div>
                        <div className="flex-1 mx-6">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                              <div className="bg-white px-3">
                                <Plane className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2">{flightObj.flightDuration}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{new Date(flightObj.arrivalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          <p className="text-sm text-gray-600">{flightObj.destinationCity}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-4">
                        {flightObj.flightAmenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                            {renderAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="space-y-2">
                      <div className="flex flex-row items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Flight {flightObj._id.slice(0,5).toUpperCase()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{new Date(flightObj.departureDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{flightObj.totalSeats} seats left</span>
                      </div>
                      <div className="flex items-center space-x-2  gap-y-2 flex-wrap">
                        {
                          flightObj.seatClass  === undefined ? 
                          (
                            <p>No FlightClass information for {flightObj.flightName} </p>
                          )
                          : 
                          (
                            flightObj.seatClass.map((flightClass, index) => (
                              <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${
                                flightClass === 'Business' ? 'bg-purple-100 text-purple-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {flightClass}
                              </span>
                            ))
                          )
                        }
                
                      </div>
                    </div>

                    {/* Price and Book */}
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="flex items-center justify-center space-x-1">
                          <DollarSign className="h-5 w-5 text-gray-600" />
                          <span className="text-3xl font-bold text-gray-900">{flightObj.flightClassPrice.economy.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600">Economy per person </p>
                      </div>
                      <button
                        onClick={() => handleFlightSelect(flightObj)}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Select Flight
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Booking Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Selected Flight Summary */}
              <div className="bg-blue-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Flight</p>
                    <p className="font-semibold">{selectedFlight._id.slice(0,5)} - {selectedFlight.flightName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Route</p>
                    <p className="font-semibold">{selectedFlight.departureCity} → {selectedFlight.destinationCity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">{new Date(selectedFlight.departureDate).toLocaleDateString()} at {new Date(selectedFlight.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-2xl text-blue-600">${selectedFlight.flightClassPrice.economy}</p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter last name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number *</label>
                        <input
                          type="text"
                          name="passportNumber"
                          value={bookingData.passportNumber}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter passport number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                        <p className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          {new Date(bookingData.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seat Class</label>
                        <select
                          name="seatClass"
                          value={bookingData.seatClass}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select preference</option>
                          <option value="Economy">Economy</option>
                          <option value="Business">Business</option>
                          <option value="First">First</option>
                          <option value="Premium Economy">Premium Economy</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seat Preference</label>
                        <select
                          name="seatPreference"
                          value={bookingData.seatPreference}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select preference</option>
                          <option value="Window">Window</option>
                          <option value="Aisle">Aisle</option>
                          <option value="Middle">Middle</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meal Preference</label>
                        <select
                          name="mealPreference"
                          value={bookingData.mealPreference}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {/* Vegetarian", "Non-Vegetarian", "Kosher", "Halal", "Vegan", "Gluten-Free", "Regular" */}
                          <option value="">Select preference</option>
                          <option value="Regular">Regular</option>
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                          <option value="Gluten-Free">Gluten-Free</option>
                          <option value="Vegan">Vegan</option>
                          <option value="Kosher">Kosher</option>
                          <option value="Halal">Halal</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                      <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        className="w-full placeholder:text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any special requests or requirements..."
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          value={bookingData.emergencyContactName}
                          onChange={handleChange}
                          required
                          className="w-full placeholder:text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Emergency contact name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                        <input
                          type="tel"
                          name="emergencyContactPhone"
                          value={bookingData.emergencyContactPhone}
                          onChange={handleChange}
                          required
                          className="w-full placeholder:text-gray-500 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Emergency contact phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back to Flights
                    </button>
                    <input
                      type="submit"
                      value={`Book Flight - $${selectedFlight.flightClassPrice.economy}`}
                      onClick={handleSubmit}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-colors"
                    />
                  </div>

                  {
                    bookingSuccessMsg && (
                      <div className="mt-4 bg-green-100 border border-green-400 text-green-600 font-medium p-4 rounded-lg">
                        {bookingSuccessMsg}
                      </div>
                    ) 
                  }
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}