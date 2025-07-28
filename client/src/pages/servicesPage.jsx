import React, { useState, useEffect } from 'react';
import { 
  Plane, Coffee, ShoppingBag, Wifi, Car, Utensils, Briefcase, 
  Shield, Clock, Star, Users, MapPin, Phone, CreditCard, 
  Luggage, Heart, Sparkles, Crown, ArrowRight, CheckCircle,
  Gift, Headphones, Bed, Dumbbell, Scissors, Camera
} from 'lucide-react';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState(null);

  const categories = [
    { id: 'all', name: 'All Services', icon: Sparkles },
    { id: 'lounges', name: 'Lounges & Relaxation', icon: Crown },
    { id: 'dining', name: 'Dining & Shopping', icon: Utensils },
    { id: 'business', name: 'Business Services', icon: Briefcase },
    { id: 'travel', name: 'Travel Support', icon: Luggage },
    { id: 'wellness', name: 'Health & Wellness', icon: Heart }
  ];

  const services = [
    {
      id: 1,
      category: 'lounges',
      title: 'Premium Sky Lounge',
      description: 'Exclusive luxury lounge with panoramic runway views, gourmet cuisine, and personal concierge service.',
      features: ['Panoramic Views', 'Gourmet Buffet', 'Private Workstations', 'Shower Facilities'],
      price: 'From $85/day',
      rating: 4.9,
      icon: Crown,
      image: '🏙️',
      availability: '24/7'
    },
    {
      id: 2,
      category: 'lounges',
      title: 'Executive Business Center',
      description: 'Professional workspace with high-speed internet, meeting rooms, and business amenities.',
      features: ['Meeting Rooms', 'High-Speed WiFi', 'Printing Services', 'Video Conferencing'],
      price: 'From $45/hour',
      rating: 4.8,
      icon: Briefcase,
      image: '💼',
      availability: '6:00 AM - 11:00 PM'
    },
    {
      id: 3,
      category: 'dining',
      title: 'SkyLux Fine Dining',
      description: 'Award-winning restaurants featuring international cuisine by renowned chefs.',
      features: ['Michelin Starred Chefs', 'Wine Selection', 'Private Dining', 'Dietary Options'],
      price: 'From $35/person',
      rating: 4.9,
      icon: Utensils,
      image: '🍽️',
      availability: '5:00 AM - 12:00 AM'
    },
    {
      id: 4,
      category: 'dining',
      title: 'Luxury Shopping Plaza',
      description: 'Premium retail experience with designer boutiques, duty-free shopping, and exclusive brands.',
      features: ['Designer Brands', 'Duty-Free Savings', 'Personal Shopping', 'Gift Wrapping'],
      price: 'Tax-Free Shopping',
      rating: 4.7,
      icon: ShoppingBag,
      image: '🛍️',
      availability: '24/7'
    },
    {
      id: 5,
      category: 'wellness',
      title: 'Spa & Wellness Center',
      description: 'Full-service spa offering massages, treatments, and relaxation therapies.',
      features: ['Massage Therapy', 'Facial Treatments', 'Meditation Pods', 'Yoga Studio'],
      price: 'From $120/session',
      rating: 4.9,
      icon: Heart,
      image: '🧘',
      availability: '6:00 AM - 10:00 PM'
    },
    {
      id: 6,
      category: 'wellness',
      title: 'Fitness & Recreation',
      description: 'State-of-the-art fitness center with personal trainers and wellness programs.',
      features: ['Gym Equipment', 'Personal Training', 'Swimming Pool', 'Sauna & Steam'],
      price: 'From $25/day',
      rating: 4.6,
      icon: Dumbbell,
      image: '🏋️',
      availability: '5:00 AM - 11:00 PM'
    },
    {
      id: 7,
      category: 'travel',
      title: 'VIP Concierge Service',
      description: 'Personal assistance for all your travel needs, from booking to baggage handling.',
      features: ['Personal Assistant', 'Fast Track Security', 'Baggage Service', 'Transportation'],
      price: 'From $150/service',
      rating: 5.0,
      icon: Users,
      image: '🎩',
      availability: '24/7'
    },
    {
      id: 8,
      category: 'travel',
      title: 'Premium Parking',
      description: 'Valet parking service with car care options and direct terminal access.',
      features: ['Valet Service', 'Car Detailing', 'EV Charging', 'Covered Parking'],
      price: 'From $45/day',
      rating: 4.8,
      icon: Car,
      image: '🚗',
      availability: '24/7'
    },
    {
      id: 9,
      category: 'business',
      title: 'Conference Facilities',
      description: 'Modern meeting rooms and conference halls with full AV support and catering.',
      features: ['AV Equipment', 'Catering Service', 'Live Streaming', 'Translation Services'],
      price: 'From $200/hour',
      rating: 4.7,
      icon: Briefcase,
      image: '🏢',
      availability: '24/7'
    },
    {
      id: 10,
      category: 'travel',
      title: 'Baggage Services',
      description: 'Comprehensive baggage solutions including storage, wrapping, and delivery.',
      features: ['Baggage Storage', 'Security Wrapping', 'Home Delivery', 'Lost & Found'],
      price: 'From $15/service',
      rating: 4.5,
      icon: Luggage,
      image: '🧳',
      availability: '24/7'
    },
    {
      id: 11,
      category: 'lounges',
      title: 'Sleep Pods & Rest Areas',
      description: 'Private sleeping pods and quiet zones for relaxation between flights.',
      features: ['Private Pods', 'Climate Control', 'USB Charging', 'Wake-up Service'],
      price: 'From $35/hour',
      rating: 4.6,
      icon: Bed,
      image: '🛏️',
      availability: '24/7'
    },
    {
      id: 12,
      category: 'wellness',
      title: 'Beauty & Grooming',
      description: 'Professional beauty services including hair styling, manicures, and grooming.',
      features: ['Hair Styling', 'Manicure/Pedicure', 'Grooming Services', 'Express Treatments'],
      price: 'From $50/service',
      rating: 4.7,
      icon: Scissors,
      image: '💅',
      availability: '7:00 AM - 9:00 PM'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const premiumFeatures = [
    { icon: Shield, title: 'Security Priority', description: 'Fast-track security clearance' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance' },
    { icon: Star, title: 'Premium Quality', description: 'Award-winning service standards' },
    { icon: Phone, title: 'Instant Booking', description: 'Reserve services in advance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Premium Services
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Elevate your travel experience with our world-class amenities and personalized services 
              designed to make every moment at SkyLux Airport extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 text-6xl">
                    {service.image}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-white text-sm font-semibold">{service.rating}</span>
                      </div>
                      <div className="text-xs text-blue-300">{service.availability}</div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-blue-200 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-blue-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">{service.price}</div>
                    </div>
                    <button className="group/btn px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2">
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                {hoveredService === service.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Why Choose Our Services
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-4">Unmatched Luxury</h3>
                <p className="text-blue-200 text-lg leading-relaxed mb-6">
                  Every service at SkyLux Airport is designed with luxury in mind. From our award-winning 
                  spa treatments to our Michelin-starred dining experiences, we set the standard for 
                  premium airport amenities worldwide.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm">Premium Quality</span>
                  <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm">Award Winning</span>
                  <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">World Class</span>
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-4">Seamless Experience</h3>
                <p className="text-blue-200 text-lg leading-relaxed">
                  Our integrated booking system and personalized service ensure that every aspect 
                  of your airport experience is smooth, efficient, and tailored to your preferences.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                <div className="text-white font-semibold mb-1">Customer Satisfaction</div>
                <div className="text-blue-200 text-sm">Consistently exceptional reviews</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-white font-semibold mb-1">Service Availability</div>
                <div className="text-blue-200 text-sm">Round-the-clock support</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-white font-semibold mb-1">Premium Services</div>
                <div className="text-blue-200 text-sm">Comprehensive amenities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/20">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Book our premium services in advance and enjoy exclusive benefits, priority access, 
              and personalized attention throughout your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="flex items-center justify-center">
                  Book Services Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                Contact Concierge
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}