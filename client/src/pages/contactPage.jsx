import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, 
  Headphones, Users, AlertCircle, CheckCircle, 
  Plane, Globe, Calendar, Star, ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Customer Service',
      primary: '+1 (555) 123-SKYY',
      secondary: '+1 (555) 123-7599',
      description: 'Immediate assistance for all inquiries',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Mail,
      title: 'Email Support',
      primary: 'info@skyluxairport.com',
      secondary: 'vip@skyluxairport.com',
      description: 'Response within 2 hours guaranteed',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: 'Available 24/7',
      secondary: 'Average wait: 30 seconds',
      description: 'Instant support via website chat',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Headphones,
      title: 'VIP Concierge',
      primary: '+1 (555) VIP-LUXE',
      secondary: '+1 (555) 847-5893',
      description: 'Premium support for exclusive services',
      color: 'from-yellow-400 to-orange-400'
    }
  ];

  const departments = [
    { id: 'general', name: 'General Inquiries', icon: MessageCircle },
    { id: 'bookings', name: 'Flight Bookings', icon: Plane },
    { id: 'services', name: 'Premium Services', icon: Star },
    { id: 'business', name: 'Corporate Travel', icon: Users },
    { id: 'feedback', name: 'Feedback & Complaints', icon: AlertCircle },
    { id: 'media', name: 'Media & Press', icon: Globe }
  ];

  const operatingHours = [
    { department: 'Customer Service', hours: '24/7', status: 'Always Available' },
    { department: 'VIP Concierge', hours: '24/7', status: 'Always Available' },
    { department: 'Booking Office', hours: '5:00 AM - 11:00 PM', status: 'Open Now' },
    { department: 'Corporate Services', hours: '8:00 AM - 6:00 PM', status: 'Open Now' },
    { department: 'Media Relations', hours: '9:00 AM - 5:00 PM', status: 'Open Now' }
  ];

  const locations = [
    {
      title: 'Main Terminal',
      address: '1 SkyLux Boulevard, Terminal A',
      city: 'Metropolitan City, MC 10001',
      phone: '+1 (555) 123-7599',
      services: ['Check-in', 'Customer Service', 'VIP Lounge']
    },
    {
      title: 'Executive Center',
      address: '50 Business Plaza, Floor 15',
      city: 'Metropolitan City, MC 10002',
      phone: '+1 (555) 456-7890',
      services: ['Corporate Bookings', 'Meeting Rooms', 'Business Services']
    },
    {
      title: 'Cargo Terminal',
      address: '200 Freight Avenue',
      city: 'Metropolitan City, MC 10003',
      phone: '+1 (555) 789-0123',
      services: ['Freight Services', 'Logistics', 'Cargo Tracking']
    }
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
              <MessageCircle className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Get in Touch
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              We're here to assist you 24/7. Whether you need help with bookings, have questions about our services, 
              or require VIP assistance, our dedicated team is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            How to Reach Us
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="text-lg font-semibold text-blue-300">{method.primary}</div>
                  <div className="text-sm text-blue-200">{method.secondary}</div>
                </div>
                <p className="text-blue-200 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Send us a Message</h3>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300">Message sent successfully! We'll respond within 2 hours.</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Department</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="" className="bg-slate-800">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id} className="bg-slate-800">{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Please provide details about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Operating Hours */}
              <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-400" />
                  Operating Hours
                </h3>
                <div className="space-y-4">
                  {operatingHours.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <div className="text-white font-semibold">{item.department}</div>
                        <div className="text-blue-200 text-sm">{item.hours}</div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-purple-400" />
                  Our Locations
                </h3>
                <div className="space-y-6">
                  {locations.map((location, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <h4 className="text-white font-semibold mb-2">{location.title}</h4>
                      <div className="text-blue-200 text-sm mb-2">
                        <div>{location.address}</div>
                        <div>{location.city}</div>
                      </div>
                      <div className="text-blue-300 text-sm mb-3">{location.phone}</div>
                      <div className="flex flex-wrap gap-2">
                        {location.services.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency & Quick Actions */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-md rounded-2xl border border-red-400/20 p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Emergency</h3>
              <p className="text-red-200 text-sm mb-4">24/7 Emergency Support</p>
              <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors">
                Call Now: 911
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md rounded-2xl border border-green-400/20 p-6 text-center">
              <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
              <p className="text-green-200 text-sm mb-4">Instant assistance available</p>
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors">
                Start Chat
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl border border-blue-400/20 p-6 text-center">
              <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Schedule Call</h3>
              <p className="text-blue-200 text-sm mb-4">Book a convenient time</p>
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors">
                Schedule Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}