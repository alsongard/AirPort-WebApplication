import React, { useState, useEffect } from 'react';
import { 
  User, Edit3, Camera, Plane, Star, Clock, MapPin, 
  CreditCard, Bell, Shield, Settings, Calendar, 
  Award, Crown, Gift, Briefcase, Heart, Coffee,
  CheckCircle, X, Save, Phone, Mail, Globe,
  TrendingUp, Target, Users, Badge
} from 'lucide-react';
import clsx from "clsx";
import axios from "axios";
import SkyLuxSpinner from '../components/spinnerComponent';


export default function ProfileComponent(props)
{

  // get items from localStorage:
  const token = localStorage.getItem("token");
  const user_email = localStorage.getItem("user_email");
  const user_id = localStorage.getItem("User_id");
  // console.log(`user_email: ${user_email}`); // testing:working
  
  const [userProfileData, setuserProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userTravelStatData, setUserTravelStatData] = useState({
    trips: 0,
    distance: 0,
    lastTripDate: '----/--/--',
    countriesNum: 0,
    totalDistance: 0
  });
  const [userPreferenceData, setUserPreferenceData] = useState({});
  const [userBookingData, setUserBookingData] = useState([]);

  const getUserDetails = async ()=>{
    try
    {
      console.log(`user_id : ${user_id}`)
      const res = await axios.get(`http://localhost:5000/getUserDetail/${user_id}`);
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


  const getTravelStats = async ()=>{
    try
    {
      const res = await axios.get(`http://localhost:5000/travellingStats/${user_id}`);
      // console.log(res);
      if (res.data.success)
      {
        setUserTravelStatData(res.data.data);
      }
    }
    catch(err)
    {
      console.log(`Error: ${err}`);
    }
  }
  const getUserPreference = async ()=>{
    try
    {
      const res = await axios.get(`http://localhost:5000/userpreferences/${user_id}`);
      // console.log(res); // testing:working
      if (res.data.success)
      {
        setUserPreferenceData(res.data.data);
      }
    }
    catch(err)
    {
      console.log(`Error: ${err}`);
    }
  }
  const getBooking = async ()=>{
    try
    {
      const res = await axios.get(`http://localhost:5000/booking/${user_id}`);
      // console.log(`this is res on getBooking`); // testing:working
      // console.log(res); // testing:working
      console.log(`this is res.data on getBooking`); // testing:working
      // console.log(res.data); // testing:working

      // console.log(`this is res.data.data`);
      // console.log(res.data.data);
      if (res.data.success)
      {
          setUserBookingData(res.data.data);
      }
    }
    catch(err)
    {
      console.log(`Error: ${err}`);
    }
  }
  useEffect(()=>{
    getUserDetails();
    getTravelStats();
    getUserPreference();
    getBooking();
  },[])

  useEffect(()=>{
    // console.log(`this is userProfileData: `); //testing :working
    // console.log(userProfileData); //testing :working
    // console.log(`this is userTravelStatData: `); //testing :working
    // console.log(userTravelStatData); //testing :working
    // console.log(`this is userPreferenceData: `); //testing :working
    // console.log(userPreferenceData); //testing :working
    console.log(`this is userBookingData: `);
    console.log(userBookingData);
  }, [userBookingData]);

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Alexandra',
    lastName: 'Morrison',
    email: 'alexandra.morrison@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1988-03-15',
    nationality: 'United States',
    passportNumber: 'P123456789',
    emergencyContact: 'James Morrison - +1 (555) 987-6543'
  });


  const userStats = {
    memberSince: '2020',
    totalFlights: 47,
    milesFlown: 125840,
    countriesVisited: 23,
    loyaltyTier: 'Platinum Elite',
    loyaltyPoints: 24750,
    nextTierPoints: 5250
  };

  

  const favoriteServices = [
    { name: 'Premium Lounge Access', usage: 32, icon: Crown },
    { name: 'Spa & Wellness', usage: 18, icon: Heart },
    { name: 'Fine Dining', usage: 25, icon: Coffee },
    { name: 'VIP Concierge', usage: 12, icon: Users }
  ];

  const achievements = [
    { title: 'Frequent Flyer', description: '25+ flights completed', earned: true, icon: Plane },
    { title: 'Globe Trotter', description: '20+ countries visited', earned: true, icon: Globe },
    { title: 'Luxury Traveler', description: 'Premium services user', earned: true, icon: Crown },
    { title: 'Miles Master', description: '100K+ miles flown', earned: true, icon: Target },
    { title: 'VIP Explorer', description: '50+ flights milestone', earned: false, icon: Star },
    { title: 'World Wanderer', description: '30+ countries goal', earned: false, icon: Badge }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'bookings', name: 'My Bookings', icon: Plane },
    { id: 'loyalty', name: 'Loyalty Program', icon: Award },
    { id: 'achievements', name: 'Achievements', icon: Star },
    { id: 'book-flight', name: 'Book Flight', icon: Plane },
  ];

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profileData);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  useEffect(()=>{
      setIsLoading(()=>{
        return userProfileData.first_name && userProfileData.middle_name ? false : true
      })
  }, [userProfileData])
  return (
    <div>
      {
        isLoading ? 
        (
          <SkyLuxSpinner/>
        )
        : 
        (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
              {/* Animated background elements */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
              </div>
        
              <div className="relative z-10 px-6 py-8">
                <div className="max-w-7xl mx-auto">
                  {/* Profile Header */}
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl uppercase font-bold">
                            {userProfileData.first_name.slice(0,1)}{userProfileData.middle_name.slice(0,1)}
                          </div>
                          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                            <Camera className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <div>
                          <h1 className="text-4xl font-bold capitalize text-white mb-2">
                            {userProfileData.first_name} {userProfileData.middle_name}
                          </h1>
                          <div className="flex items-center space-x-4 text-blue-200">
                            <span className="flex items-center space-x-1">
                              <Crown className="w-4 h-4 text-yellow-400" />
                              <span>{userStats.loyaltyTier}</span>
                            </span>
                            <span>Member since {userStats.memberSince}</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-blue-300">
                            <span>{userTravelStatData.trips} flights</span>
                            <span>{userTravelStatData.distance.toLocaleString()} miles</span>
                            <span>{userTravelStatData.countriesNum} countries</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                        </button>
                        {isEditing && (
                          <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition-colors flex items-center space-x-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
        
                  {/* Navigation Tabs */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                      </button>
                    ))}
                  </div>
        
                  {/* Tab Content */}
                  <div className="space-y-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Personal Information */}
                        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <User className="w-6 h-6 mr-3 text-blue-400" />
                            Personal Information
                          </h2>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-white/90 mb-2">First Name</label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={profileData.firstName}
                                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-white/5 rounded-xl capitalize text-white">{userProfileData.first_name}</div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-white/90 mb-2">Last Name</label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={profileData.lastName}
                                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-white/5 rounded-xl capitalize text-white">{userProfileData.last_name}</div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                              {isEditing ? (
                                <input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-white/5 rounded-xl text-white flex items-center">
                                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                                  {user_email}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                              {isEditing ? (
                                <input
                                  type="tel"
                                  value={profileData.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-white/5 rounded-xl text-white flex items-center">
                                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                                   + {userProfileData.phone}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-white/90 mb-2">Nationality</label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={profileData.nationality}
                                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{profileData.nationality}</div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-white/90 mb-2">Passport Number</label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={profileData.passportNumber}
                                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{userProfileData.passport}</div>
                              )}
                            </div>
                          </div>
                          {/* Preference View */}
                          <div className='pt-[50px]'>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                              <User className="w-6 h-6 mr-3 text-blue-400" />
                              Travel Preferences
                            </h2>
                            <div className="space-y-6">
                              <div>
                                <p className="block text-sm font-medium text-white/90 mb-2">Seat Preference</p>
                                <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{userPreferenceData.seatPreference}</div>
                              </div>
                              <div>
                                <p className="block text-sm font-medium text-white/90 mb-2">Meal Preference</p>
                                <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{userPreferenceData.mealPreference}</div>
                              </div>
                              <div>
                                <p className="block text-sm font-medium text-white/90 mb-2">Prefered Class</p>
                                <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{userPreferenceData.classPreference}</div>
                              </div>
                              <div >
                                <p className="block text-sm font-medium text-white/90 mb-2">Notification Preferences</p>
                                <div className="px-4 py-3 bg-white/5 rounded-xl">
                                  <button className={clsx(userPreferenceData.notifications ? 'bg-blue-500' : 'bg-white/20', "w-12 h-6 rounded-full transition-colors")}>
                                    <div className={clsx(userPreferenceData.notifications ? "translate-x-6": "translate-x-1", "w-5 h-5 bg-white rounded-full transition-transform")}></div>
                                  </button>
                                </div>
                              </div>
                              <div>
                                <p className="block text-sm font-medium text-white/90 mb-2">NewsLetter Preferences</p>
                                <div className="px-4 py-3 bg-white/5 rounded-xl">
                                  <button className={clsx(userPreferenceData.newsletter ? 'bg-blue-500' : 'bg-white/20', "w-12 h-6 rounded-full transition-colors")}>
                                    <div className={clsx(userPreferenceData.newsletter ? "translate-x-6": "translate-x-1", "w-5 h-5 bg-white rounded-full transition-transform")}></div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
        
                        {/* Quick Stats */}
                        <div className="space-y-6">
                          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Travel Stats</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-blue-200">Total Flights</span>
                                <span className="text-2xl font-bold text-white">{userTravelStatData.trips}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-blue-200">Miles Flown</span>
                                <span className="text-2xl font-bold text-white">{userTravelStatData.distance.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-blue-200">Countries</span>
                                <span className="text-2xl font-bold text-white">{userTravelStatData.countriesNum}</span>
                              </div>
                            </div>
                          </div>
        
                          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Loyalty Status</h3>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Crown className="w-8 h-8 text-white" />
                              </div>
                              <div className="text-xl font-bold text-yellow-400 mb-2">{userStats.loyaltyTier}</div>
                              <div className="text-blue-200 text-sm mb-4">{userStats.loyaltyPoints.toLocaleString()} points</div>
                              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                                <div 
                                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                                  style={{ width: `${(userStats.loyaltyPoints / (userStats.loyaltyPoints + userStats.nextTierPoints)) * 100}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-blue-300">{userStats.nextTierPoints} points to next tier</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
        
                    {/* Bookings Tab */}
                    {activeTab === 'bookings' && (
                      <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                          <Plane className="w-6 h-6 mr-3 text-blue-400" />
                          Recent Bookings
                        </h2>
                        
                        <div className="space-y-4">
                          {
                            userBookingData.length === 0 ?
                            (
                              <div className="text-center text-blue-200">
                                <p className="text-lg">No bookings found.</p>
                                <p className="text-sm">Start booking your next adventure!</p>
                              </div>
                            )
                            :
                            (
                              <div>
                              {userBookingData.map((booking) => (
                                <div key={booking._id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-6">
                                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                        <Plane className="w-6 h-6 text-white" />
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-semibold text-white">{booking.flightId.departureCountry} {booking.flightId.departureCity}</h3>
                                        <div className="flex items-center space-x-4 text-blue-200 text-sm">
                                          <span className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(booking.flightId.departureTime).toLocaleDateString()}</span>
                                          </span>
                                          <span className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(booking.flightId.departureTime).toLocaleTimeString()}</span>
                                          </span>
                                          <span>Flight {booking.flightId.flightName}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4">
                                      <div className="text-right">
                                        <div className="text-white font-semibold">{booking.seatClass}</div>
                                        <div className="text-blue-200 text-sm">Gate A1</div>
                                      </div>
                                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                                        booking.bookingStatus === 'Confirmed' ? 'bg-green-500/20 text-green-300' :
                                        booking.bookingStatus === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                                        'bg-yellow-500/20 text-yellow-300'
                                      }`}>
                                        {booking.bookingStatus}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )}
        
                    {/* Loyalty Tab */}
                    {activeTab === 'loyalty' && (
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Award className="w-6 h-6 mr-3 text-yellow-400" />
                            Loyalty Program
                          </h2>
                          
                          <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                              <Crown className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-yellow-400 mb-2">{userStats.loyaltyTier}</h3>
                            <p className="text-blue-200 mb-6">Exclusive benefits and priority access</p>
                            
                            <div className="bg-white/5 rounded-2xl p-6 mb-6">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-blue-200">Current Points</span>
                                <span className="text-2xl font-bold text-white">{userStats.loyaltyPoints.toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                                <div 
                                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
                                  style={{ width: `${(userStats.loyaltyPoints / (userStats.loyaltyPoints + userStats.nextTierPoints)) * 100}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-blue-300">{userStats.nextTierPoints} points until Diamond Elite</p>
                            </div>
                          </div>
        
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-white">Current Benefits</h4>
                            <div className="space-y-2">
                              {['Priority Check-in', 'Lounge Access', 'Extra Baggage', 'Seat Selection', 'Fast Track Security'].map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  <span className="text-blue-200">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
        
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                          <h3 className="text-xl font-bold text-white mb-6">Favorite Services</h3>
                          <div className="space-y-4">
                            {favoriteServices.map((service, index) => (
                              <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <service.icon className="w-5 h-5 text-blue-400" />
                                    <span className="text-white font-medium">{service.name}</span>
                                  </div>
                                  <span className="text-blue-300 text-sm">{service.usage} times</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                                    style={{ width: `${(service.usage / 35) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
        
                    
        
                    {/* Achievements Tab */}
                    {activeTab === 'achievements' && (
                      <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                          <Star className="w-6 h-6 mr-3 text-yellow-400" />
                          Achievements & Badges
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {achievements.map((achievement, index) => (
                            <div key={index} className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                              achievement.earned 
                                ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/20' 
                                : 'bg-white/5 border-white/10'
                            }`}>
                              <div className="text-center">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                                  achievement.earned 
                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                                    : 'bg-white/10'
                                }`}>
                                  <achievement.icon className={`w-8 h-8 ${
                                    achievement.earned ? 'text-white' : 'text-white/40'
                                  }`} />
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${
                                  achievement.earned ? 'text-white' : 'text-white/60'
                                }`}>
                                  {achievement.title}
                                </h3>
                                <p className={`text-sm ${
                                  achievement.earned ? 'text-blue-200' : 'text-white/40'
                                }`}>
                                  {achievement.description}
                                </p>
                                {achievement.earned && (
                                  <div className="mt-3 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                                    Earned
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
          </div>
        )
      }
    </div>
  )
}