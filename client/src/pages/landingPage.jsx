import React, { useState, useEffect } from 'react';
import { Plane, Clock, MapPin, Users, Star, ArrowRight, Menu, X, Phone, Mail, Globe } from 'lucide-react';



export default function LandingPage()
{
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState('departures');
    const stats = [
        { icon: Users, number: '45M+', label: 'Annual Passengers' },
        { icon: Plane, number: '300K+', label: 'Annual Flights' },
        { icon: Globe, number: '150+', label: 'Destinations' },
        { icon: Star, number: '4.8', label: 'Customer Rating' }
    ];
    const flights = {
        departures: [
        { flight: 'AA 1234', destination: 'New York', time: '14:30', gate: 'A12', status: 'On Time' },
        { flight: 'BA 5678', destination: 'London', time: '15:45', gate: 'B8', status: 'Boarding' },
        { flight: 'LH 9012', destination: 'Frankfurt', time: '16:20', gate: 'C5', status: 'Delayed' },
        { flight: 'AF 3456', destination: 'Paris', time: '17:10', gate: 'A15', status: 'On Time' },
        ],
        arrivals: [
        { flight: 'DL 7890', destination: 'Los Angeles', time: '13:15', gate: 'B12', status: 'Landed' },
        { flight: 'UA 2468', destination: 'Chicago', time: '14:50', gate: 'A9', status: 'On Time' },
        { flight: 'EK 1357', destination: 'Dubai', time: '15:30', gate: 'C11', status: 'Approaching' },
        { flight: 'QF 9753', destination: 'Sydney', time: '16:45', gate: 'B6', status: 'On Time' },
        ]
    };
    const services = [
        { title: 'Premium Lounges', desc: 'Relax in luxury before your flight', image: '🛋️' },
        { title: 'Shopping & Dining', desc: 'World-class retail and restaurants', image: '🛍️' },
        { title: 'Fast Track Security', desc: 'Skip the lines with priority access', image: '⚡' },
        { title: 'Baggage Services', desc: 'Smart luggage solutions', image: '🧳' }
    ];

    return (
        <div className="w-full  min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">  
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                        Welcome to the Future
                        <br />
                        <span className="text-4xl md:text-6xl">of Air Travel</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
                        Experience seamless journeys with cutting-edge technology, world-class amenities, 
                        and unparalleled service at SkyPort International Airport.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <span className="flex items-center justify-center">
                            Check Flight Status
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        </button>
                        <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                        Explore Services
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                    <div key={index} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="flex flex-col items-center">
                            <stat.icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                            <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                            <div className="text-blue-200 text-sm">{stat.label}</div>
                        </div>
                    </div>
                    ))}
                </div>
            </section>

            {/* Flight Information */}
            <section className="relative z-10 px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Live Flight Information
                    </h2>
          
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                        <div className="flex border-b border-white/20">
                        <button
                            className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'departures' 
                            ? 'bg-blue-500/20 text-blue-300 border-b-2 border-blue-400' 
                            : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setActiveTab('departures')}
                        >
                            Departures
                        </button>
                        <button
                            className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'arrivals' 
                            ? 'bg-blue-500/20 text-blue-300 border-b-2 border-blue-400' 
                            : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setActiveTab('arrivals')}
                        >
                            Arrivals
                        </button>
                    </div>
            
                    <div className="p-6">
                    <div className="grid gap-3">
                        {flights[activeTab].map((flight, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center space-x-6">
                        <div className="text-lg font-semibold text-blue-300">{flight.flight}</div>
                        <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-white/60" />
                        <span className="text-white">{flight.destination}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <div className="text-white font-semibold">{flight.time}</div>
                        <div className="text-white/60 text-sm">Gate {flight.gate}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        flight.status === 'On Time' ? 'bg-green-500/20 text-green-300' :
                        flight.status === 'Boarding' ? 'bg-blue-500/20 text-blue-300' :
                        flight.status === 'Delayed' ? 'bg-red-500/20 text-red-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {flight.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Premium Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.image}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-blue-200 group-hover:text-white transition-colors">{service.desc}</p>
                <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>








        </div>
    )
}

