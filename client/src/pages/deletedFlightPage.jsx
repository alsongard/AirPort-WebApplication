import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plane, MapPin, Calendar,Clapperboard, Soup, BedSingle, EarOff, Clock, Users, Star, DollarSign, Wifi,AlertTriangle,Trash2 } from 'lucide-react';
import axios from "axios";
export default function SkyLuxFlightDelete() 
{
    const { id } = useParams();
	
    // console.log(`Flight ID to delete: ${id}`); // testing:working
    const navigate  = useNavigate();
	const goAdminDashBoard = () => {
		navigate("/admindash");
	}
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
        flightAmenities: [],
        flightRating: '',
        seatClass: [],
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
                // console.log(flightDetails); // testing:working  
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

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
        `Are you sure you want to delete flight ${flightData.flightName}? This action cannot be undone.`
        );
        
        if (confirmDelete) 
        {
            const response = await axios.delete(`https://airportwebapp-api.vercel.app/api/admin/deleteFlight/${id}`)

            if (response.data.success)
            {
                alert(`Flight ${flightData.flightName} has been successfully deleted.`);
            }
            // Here you would typically make an API call to delete the flight
            // and then redirect to the flights list or admin dashboard
        }
    };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h2 className="text-lg font-semibold text-red-800">Delete Flight Confirmation</h2>
              <p className="text-red-700">Please review the flight details below before confirming deletion.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Flight Header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Plane className="h-8 w-8 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{flightData.flightName}</h1>
                  <p className="text-blue-100">Flight Details - SkyLux Airport</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-300 fill-current" />
                <span className="text-white font-semibold">{flightData.flightRating}/10</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Route Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Route Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{flightData.departureCity}</p>
                    <p className="text-sm text-gray-600">{flightData.departureCountry}</p>
                    <p className="text-xs text-gray-500 mt-1">DEPARTURE</p>
                  </div>
                  <div className="flex-1 mx-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-blue-300"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <div className="bg-gray-50 px-3">
                          <Plane className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">{flightData.flightDuration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{flightData.destinationCity}</p>
                    <p className="text-sm text-gray-600">{flightData.destinationCountry}</p>
                    <p className="text-xs text-gray-500 mt-1">ARRIVAL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Schedule Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Departure</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{formatDateTime(flightData.departureDate)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Arrival</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{formatDateTime(flightData.arrivalDate)}</p>
                </div>
              </div>
            </div>

            {/* Seat Configuration */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Seat Configuration
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{flightData.totalSeats}</p>
                  <p className="text-sm text-gray-600">Total Seats</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-800">{flightData.firstSeats}</p>
                  <p className="text-sm text-yellow-700">First Class</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-800">{flightData.businessSeats}</p>
                  <p className="text-sm text-purple-700">Business</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-800">{flightData.premiumSeats}</p>
                  <p className="text-sm text-green-700">Premium Economy</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-800">{flightData.economySeats}</p>
                  <p className="text-sm text-blue-700">Economy</p>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Class Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-800">First Class</p>
                      <p className="text-2xl font-bold text-yellow-900">{flightData.firstPrice.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-800">Business Class</p>
                      <p className="text-2xl font-bold text-purple-900">{flightData.businessPrice.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">Premium Economy</p>
                      <p className="text-2xl font-bold text-green-900">{flightData.premiumPrice.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Economy Class</p>
                      <p className="text-2xl font-bold text-blue-900">{flightData.economyPrice.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Wifi className="h-5 w-5 mr-2 text-blue-600" />
                Flight Amenities
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {flightData.flightAmenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                    {
                        amenity == "In-seat Entertainment" ? ( <><Clapperboard className="h-3 w-3 mr-1" /> {amenity} </> ) : 
                        amenity == "WiFi" ? ( <><Wifi className="h-3 w-3 mr-1" /> {amenity} </> ) :
                        amenity == "Gourmet Meals" ? (<><Soup className="h-3 w-3 mr-1"/>{amenity}</>):
                        amenity == "Pillows" ? (<><BedSingle className="h-3 w-3 mr-1" /> {amenity}</>) :
                        amenity == "Noise Cancelling Headphones" && (<><EarOff className="h-3 w-3 mr-1"/>{amenity}</>)  
                    }
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Seat Classes */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Available Seat Classes
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {flightData.seatClass.map((seatClass, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        seatClass === 'First' ? 'bg-yellow-100 text-yellow-800' :
                        seatClass === 'Business' ? 'bg-purple-100 text-purple-800' :
                        seatClass === 'Premium' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {seatClass}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <div className="pt-6 border-t  justify-center border-gray-200">
				<div className="flex  flex-row justify-center">
					<button
						onClick={handleDelete}
						className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
					>
						<Trash2 className="h-5 w-5 mr-2" />
						Delete Flight {flightData.flightName}
					</button>
				</div>
				<p className="text-center text-sm text-gray-500 mt-2">
					This action cannot be undone. Please confirm before proceeding.
				</p>
            </div>
			<div>
				<button
					onClick={goAdminDashBoard}
					className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
				>
					<Plane  className="h-5 w-5 mr-2"/>
					Go AdminDashBoard
				</button>
			</div>
          </div>
        </div>
      </div>
    </div>
  );
}