import { useState, useEffect } from 'react';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import AddFlightForm from '../components/addFlight';
import GetAllFlights from '../components/getAllFlights';
import GetAllUsers from '../components/getAllUsers';
import GetAllBookings from '../components/getBooking';
import WebFont from "webfontloader";
import SearchFlight from '../components/searchFlight';
import axios from "axios";
import { 
  Plane, 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Shield, 
  EyeOff,
  MapPin, 
  CircleX,
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

  
  const [flightView, setFlightView] = useState(true);
  function clearFlightView()
  {
    setFlightView((prevValue)=>!prevValue);
  } 

  const [openNewForm, setOpenNewForm] = useState(false); 
  function openNewFlightForm()
  {
    setOpenNewForm((prevValue)=>!prevValue);
  }

  const [openSearchForm, setOpenSearchForm] = useState(false);
  function openNewSearchForm()
  {
    setOpenSearchForm((prevValue)=>!prevValue);
  }

  const renderFlights = () => (
    <div className="space-y-6 ">
      <div className="flex flex-col  md:flex-row md:items-center md:justify-between md:space-x-[10px] gap-4">
        <h2 className="text-2xl font-bold text-white">Flight Management</h2>
        <div className='flex flex-row w-3/4  items-center justify-end  gap-x-[20px]'>
          <button onClick={openNewSearchForm} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Search className="h-5 w-5 mr-2 text-white" />
            <span className=" text-white">Search Flights</span>
          </button>
          <button onClick={openNewFlightForm} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {openNewForm ? <CircleX  className="h-5 w-5 mr-2"  /> : <PlusCircle className="h-5 w-5 mr-2" /> }
            {openNewForm ? "Close Form "  : "Create New Flight"}
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={clearFlightView}>
            {flightView ?  <Eye className="h-5 w-5 mr-2" /> : <EyeOff className="h-5 w-5 mr-2" /> }
            {flightView ? "Hide Flights" : "Show Flights"}
          </button>
        </div>
      </div>
      {
        openSearchForm && 
        (
          <SearchFlight />
        )
      }

     {
      flightView && 
      (
        <GetAllFlights/>
      )
     }

      {
        openNewForm && (<AddFlightForm/>)
      }
      
    </div>
  );




  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Users className="h-5 w-5 mr-2" />
            Get  Users Data
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5 mr-2" />
            Export Users
          </button>
        </div>
      </div>

      <div>
        <p className='text-gray-300'>View Users </p>
      </div>

      <div>
        <GetAllUsers/>
      </div>

    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Booking Data</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-5 w-5 mr-2" />
          Export Bookings
        </button>
      </div>

      <GetAllBookings />
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