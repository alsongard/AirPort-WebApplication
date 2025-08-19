import { useState, useEffect } from 'react';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector'
import WebFont from "webfontloader";

import { 
  Plane, 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Shield, 
  MapPin, 
  Clock, 
  Bell,
  FileText,
  UserCheck,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download
} from 'lucide-react';
import Select from 'react-select';
export default function SkyLuxAdminDashboard() {
  useEffect(()=>{
    WebFont.load({
      google: {
        families: ['DM Serif Display', 'ABeeZee', 'Prompt:300,500']
      }
    })
  })
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const flightData = [
    { id: 'SL001', from: 'NYC', to: 'LAX', date: '2025-08-15', time: '14:30', status: 'Scheduled', passengers: 180 },
    { id: 'SL002', from: 'LAX', to: 'CHI', date: '2025-08-15', time: '09:15', status: 'Boarding', passengers: 165 },
    { id: 'SL003', from: 'MIA', to: 'NYC', date: '2025-08-15', time: '11:45', status: 'Delayed', passengers: 142 },
  ];

  const userData = [
    { id: 1, name: 'John Smith', email: 'john@email.com', joinDate: '2024-01-15', bookings: 5, status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', joinDate: '2024-03-22', bookings: 12, status: 'VIP' },
    { id: 3, name: 'Mike Chen', email: 'mike@email.com', joinDate: '2024-02-10', bookings: 3, status: 'Active' },
  ];

  const bookingData = [
    { id: 'BK001', passenger: 'John Smith', flight: 'SL001', date: '2025-08-15', amount: '$450', status: 'Confirmed' },
    { id: 'BK002', passenger: 'Sarah Johnson', flight: 'SL002', date: '2025-08-15', amount: '$320', status: 'Confirmed' },
    { id: 'BK003', passenger: 'Mike Chen', flight: 'SL003', date: '2025-08-15', amount: '$280', status: 'Pending' },
  ];

  const stats = {
    totalFlights: 156,
    totalUsers: 2840,
    totalBookings: 1230,
    totalRevenue: '$485,600',
    activeFlights: 12,
    pendingBookings: 45
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'flights', label: 'Flight Management', icon: Plane },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'bookings', label: 'Booking Data', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'airports', label: 'Airport Management', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className=" p-6 bg-gradient-to-br from-slate-700 via-blue-400 to-indigo-500 rounded-lg border-l-4 border-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Total Flights</p>
              <p className="text-2xl font-bold text-white">{stats.totalFlights}</p>
            </div>
            <Plane className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-700 via-blue-400 to-indigo-500 p-6 rounded-lg border-l-4 border-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-700 via-blue-400 to-indigo-500 p-6 rounded-lg border-l-4 border-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-white">{stats.totalRevenue}</p>
            </div>
            <CreditCard className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-gradient-to-br from-slate-500 via-blue-500 to-indigo-500 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Flights</h3>
          <div className="space-y-3">
            {flightData.slice(0, 3).map((flight) => (
              <div key={flight.id} className="flex flex-row items-center justify-between p-3 bg-gray-900 rounded">
                <div>
                  <p className="font-medium text-white">{flight.id}: {flight.from} → {flight.to}</p>
                  <p className="text-sm text-white">{flight.date} at {flight.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  flight.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                  flight.status === 'Boarding' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {flight.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-500 via-blue-500 to-indigo-500  p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <PlusCircle className="h-5 w-5 mr-2" />
              New Flight
            </button>
            <button className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-lg hover:bg-green-700 transition-colors">
              <UserCheck className="h-5 w-5 mr-2" />
              User Approval
            </button>
            <button className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Export Data
            </button>
            <button className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <Bell className="h-5 w-5 mr-2" />
              Send Alert
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  function openNewFlightForm()
  {
    console.log('Will be adding new filght');
  }
  
  
  const AddFlightForm =()=>
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
      premiumSeats: ""

    });
    function handleNewFlightChange(event)
    {
      const {name, value} = event.target;
      setNewFlight((prevData)=>{
        return {
          ...prevData,
          [name]: value
        }
      })
    }
    function handleCheckBox(event)
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
    function handleSeatCheckBox(event)
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

    function handleSubmit(event)
    {
      newFlight.departureCountry = departureCountry;
      newFlight.departureCity = departureCity;
      newFlight.destinationCity = destinationCity;
      newFlight.destinationCountry = destinationCountry;

      event.preventDefault();
      console.log(newFlight);
    }
    return (
      <div className='bg-white rounded-lg'>
        <form onSubmit={handleSubmit} className='pb-[10px] px-[15px]'>
          <div className='grid grid-cols-2 space-x-[15px] gap-y-[30px] py-[15px] '>
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
              <input id='flightduration' type="number" name="flightDuration" className='border-1 border-black p-[5px] rounded-md' value={newFlight.flightDuration} onChange={handleNewFlightChange}/>
            </div>

          </div>
          <input className='bg-green-900 rounded-md py-[10px] w-full hover:bg-green-500' type='submit' value='submit'/>
        </form>
      </div>
    )
  }

  const renderFlights = () => (
    <div className="space-y-6 ">
      <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Flight Management</h2>
        <button onClick={openNewFlightForm} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircle className="h-5 w-5 mr-2" />
          Create New Flight
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search flights..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passengers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flightData.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{flight.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flight.from} → {flight.to}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flight.date} {flight.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flight.passengers}/200</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      flight.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      flight.status === 'Boarding' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {flight.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddFlightForm/>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <UserCheck className="h-5 w-5 mr-2" />
            Approve Users
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5 mr-2" />
            Export Users
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">#{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{user.bookings}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Booking Data</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-5 w-5 mr-2" />
          Export Bookings
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookingData.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{booking.passenger}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{booking.flight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">{booking.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'flights':
        return renderFlights();
      case 'users':
        return renderUsers();
      case 'bookings':
        return renderBookings();
      case 'payments':
        return (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Management</h3>
            <p className="text-gray-600">Payment processing and financial reports will be displayed here.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h3>
            <p className="text-gray-600">Detailed analytics and reporting dashboard coming soon.</p>
          </div>
        );
      case 'airports':
        return (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Airport Management</h3>
            <p className="text-gray-600">Manage airport information, gates, and facilities.</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Center</h3>
            <p className="text-gray-600">Send alerts and manage system notifications.</p>
          </div>
        );
      case 'security':
        return (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Security & Access Control</h3>
            <p className="text-gray-600">Manage user permissions and security settings.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600">Configure system preferences and global settings.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">


      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-500 shadow-sm h-screen sticky top-0">
          <div className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}