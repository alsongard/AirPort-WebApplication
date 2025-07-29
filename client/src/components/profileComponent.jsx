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

export default function ProfileComponent()
{
    // get items from localStorage:
  const token = localStorage.getItem("token");
  const user_email = localStorage.getItem("user_email");
  const user_id = localStorage.getItem("User_id");

  const [displayRegForm, setDisplayRegForm] = useState(false);

  const getUserDetails = async ()=>{
    try
    {
        const res = await axios.get("http://localhost:5000/getUserDetail/688596970090340009d242f8");
        console.log(`This is response`);
        console.log(res);
        if (res.status === 404)
        {
          setDisplayRegForm(true);
    
        }
        console.log(res.data.data); // success,otherproperties
    }
    catch(err)
    {

    }
  }



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

  const [preferences, setPreferences] = useState({
    seatPreference: 'Window',
    mealPreference: 'Vegetarian',
    classPreference: 'Business',
    notifications: true,
    newsletter: true,
    smsAlerts: false
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

  const recentBookings = [
    {
      id: 'SL001',
      destination: 'Tokyo, Japan',
      date: '2025-02-15',
      time: '14:30',
      flight: 'SL 4501',
      class: 'Business',
      status: 'Confirmed',
      gate: 'A12'
    },
    {
      id: 'SL002',
      destination: 'London, UK',
      date: '2025-01-28',
      time: '10:45',
      flight: 'SL 2205',
      class: 'First',
      status: 'Completed',
      gate: 'B8'
    },
    {
      id: 'SL003',
      destination: 'Dubai, UAE',
      date: '2025-01-10',
      time: '23:15',
      flight: 'SL 7788',
      class: 'Business',
      status: 'Completed',
      gate: 'C5'
    }
  ];

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
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'achievements', name: 'Achievements', icon: Star }
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

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

    return (
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
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl font-bold">
                    AM
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <div className="flex items-center space-x-4 text-blue-200">
                    <span className="flex items-center space-x-1">
                      <Crown className="w-4 h-4 text-yellow-400" />
                      <span>{userStats.loyaltyTier}</span>
                    </span>
                    <span>Member since {userStats.memberSince}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-blue-300">
                    <span>{userStats.totalFlights} flights</span>
                    <span>{userStats.milesFlown.toLocaleString()} miles</span>
                    <span>{userStats.countriesVisited} countries</span>
                    <button onClick={getUserDetails}>GetUserData</button>
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
                        <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{profileData.firstName}</div>
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
                        <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{profileData.lastName}</div>
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
                          {profileData.email}
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
                          {profileData.phone}
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
                        <div className="px-4 py-3 bg-white/5 rounded-xl text-white">{profileData.passportNumber}</div>
                      )}
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
                        <span className="text-2xl font-bold text-white">{userStats.totalFlights}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-200">Miles Flown</span>
                        <span className="text-2xl font-bold text-white">{userStats.milesFlown.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-200">Countries</span>
                        <span className="text-2xl font-bold text-white">{userStats.countriesVisited}</span>
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
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                            <Plane className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{booking.destination}</h3>
                            <div className="flex items-center space-x-4 text-blue-200 text-sm">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{booking.date}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{booking.time}</span>
                              </span>
                              <span>Flight {booking.flight}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-white font-semibold">{booking.class}</div>
                            <div className="text-blue-200 text-sm">Gate {booking.gate}</div>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                            booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-300' :
                            booking.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-blue-400" />
                  Travel Preferences
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Seat Preference</label>
                      <select
                        value={preferences.seatPreference}
                        onChange={(e) => handlePreferenceChange('seatPreference', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Window" className="bg-slate-800">Window</option>
                        <option value="Aisle" className="bg-slate-800">Aisle</option>
                        <option value="Middle" className="bg-slate-800">Middle</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Meal Preference</label>
                      <select
                        value={preferences.mealPreference}
                        onChange={(e) => handlePreferenceChange('mealPreference', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Regular" className="bg-slate-800">Regular</option>
                        <option value="Vegetarian" className="bg-slate-800">Vegetarian</option>
                        <option value="Vegan" className="bg-slate-800">Vegan</option>
                        <option value="Halal" className="bg-slate-800">Halal</option>
                        <option value="Kosher" className="bg-slate-800">Kosher</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Preferred Class</label>
                      <select
                        value={preferences.classPreference}
                        onChange={(e) => handlePreferenceChange('classPreference', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Economy" className="bg-slate-800">Economy</option>
                        <option value="Premium Economy" className="bg-slate-800">Premium Economy</option>
                        <option value="Business" className="bg-slate-800">Business</option>
                        <option value="First" className="bg-slate-800">First Class</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Notification Preferences</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-blue-400" />
                            <span className="text-white">Push Notifications</span>
                          </div>
                          <button
                            onClick={() => handlePreferenceChange('notifications', !preferences.notifications)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              preferences.notifications ? 'bg-blue-500' : 'bg-white/20'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-400" />
                            <span className="text-white">Email Newsletter</span>
                          </div>
                          <button
                            onClick={() => handlePreferenceChange('newsletter', !preferences.newsletter)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              preferences.newsletter ? 'bg-blue-500' : 'bg-white/20'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              preferences.newsletter ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
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