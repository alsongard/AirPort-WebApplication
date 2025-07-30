import { useState } from 'react';
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
  Headphones
} from 'lucide-react';

export default function SkyLuxFlightBooking() {
  const [searchFilters, setSearchFilters] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'Economy'
  });

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    dateOfBirth: '',
    seatPreference: '',
    mealPreference: '',
    specialRequests: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  // Sample flight data
  const availableFlights = [
    {
      id: 'SL001',
      airline: 'SkyLux Airways',
      from: 'New York (NYC)',
      to: 'Los Angeles (LAX)',
      departTime: '08:30',
      arriveTime: '11:45',
      duration: '5h 15m',
      date: '2025-08-15',
      price: 450,
      class: 'Economy',
      availableSeats: 45,
      aircraft: 'Boeing 737-800',
      amenities: ['Wifi', 'Meals', 'Entertainment'],
      rating: 4.5
    },
    {
      id: 'SL002',
      airline: 'SkyLux Airways',
      from: 'New York (NYC)',
      to: 'Los Angeles (LAX)',
      departTime: '14:20',
      arriveTime: '17:35',
      duration: '5h 15m',
      date: '2025-08-15',
      price: 380,
      class: 'Economy',
      availableSeats: 32,
      aircraft: 'Airbus A320',
      amenities: ['Wifi', 'Snacks', 'Entertainment'],
      rating: 4.2
    },
    {
      id: 'SL003',
      airline: 'SkyLux Premium',
      from: 'New York (NYC)',
      to: 'Los Angeles (LAX)',
      departTime: '19:15',
      arriveTime: '22:30',
      duration: '5h 15m',
      date: '2025-08-15',
      price: 750,
      class: 'Business',
      availableSeats: 12,
      aircraft: 'Boeing 787-9',
      amenities: ['Wifi', 'Premium Meals', 'Lie-flat Seats', 'Priority Boarding'],
      rating: 4.8
    },
    {
      id: 'SL004',
      airline: 'SkyLux Airways',
      from: 'New York (NYC)',
      to: 'Los Angeles (LAX)',
      departTime: '06:00',
      arriveTime: '09:15',
      duration: '5h 15m',
      date: '2025-08-15',
      price: 420,
      class: 'Economy',
      availableSeats: 28,
      aircraft: 'Boeing 737-900',
      amenities: ['Wifi', 'Breakfast', 'Entertainment'],
      rating: 4.3
    }
  ];

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Booking Data:', {
      flight: selectedFlight,
      passenger: bookingData
    });
    alert('Flight booked successfully! Confirmation details will be sent to your email.');
    // Reset form
    setBookingData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passportNumber: '',
      dateOfBirth: '',
      seatPreference: '',
      mealPreference: '',
      specialRequests: '',
      emergencyContactName: '',
      emergencyContactPhone: ''
    });
    setShowBookingForm(false);
    setSelectedFlight(null);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Book Your <span className="text-blue-600">SkyLux</span> Flight
          </h1>
          <p className="text-gray-600 mt-2">Find and book the perfect flight for your journey</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!showBookingForm ? (
          <>
            {/* Search Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                      placeholder="New York"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="to"
                      value={searchFilters.to}
                      onChange={handleSearchChange}
                      placeholder="Los Angeles"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              <div className="mt-4 flex justify-end">
                <button className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <Search className="h-4 w-4 mr-2" />
                  Search Flights
                </button>
              </div>
            </div>

            {/* Available Flights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Available Flights</h2>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>

              {availableFlights.map((flight) => (
                <div key={flight.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    {/* Flight Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Plane className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{flight.airline}</h3>
                            <p className="text-sm text-gray-600">{flight.aircraft}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{flight.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.departTime}</p>
                          <p className="text-sm text-gray-600">{flight.from}</p>
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
                          <p className="text-center text-sm text-gray-600 mt-2">{flight.duration}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.arriveTime}</p>
                          <p className="text-sm text-gray-600">{flight.to}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-4">
                        {flight.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                            {renderAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Flight {flight.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{flight.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{flight.availableSeats} seats left</span>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          flight.class === 'Business' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {flight.class}
                        </span>
                      </div>
                    </div>

                    {/* Price and Book */}
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="flex items-center justify-center space-x-1">
                          <DollarSign className="h-5 w-5 text-gray-600" />
                          <span className="text-3xl font-bold text-gray-900">{flight.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>
                      <button
                        onClick={() => handleFlightSelect(flight)}
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
                    <p className="font-semibold">{selectedFlight.id} - {selectedFlight.airline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Route</p>
                    <p className="font-semibold">{selectedFlight.from} → {selectedFlight.to}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">{selectedFlight.date} at {selectedFlight.departTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-2xl text-blue-600">${selectedFlight.price}</p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="p-6">
                <div onSubmit={handleSubmit} className="space-y-6">
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
                          placeholder="Enter first name"
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
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={bookingData.dateOfBirth}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <option value="">Select preference</option>
                          <option value="Regular">Regular</option>
                          <option value="Vegetarian">Vegetarian</option>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      value={`Book Flight - $${selectedFlight.price}`}
                      onClick={handleSubmit}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}