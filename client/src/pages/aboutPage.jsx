import React, { useState, useEffect } from 'react';
import { Plane, Award, Users, Globe, Clock, Shield, Star, Heart, ArrowRight, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Users, number: '50M+', label: 'Happy Travelers', description: 'Annual passengers served with excellence' },
    { icon: Globe, number: '200+', label: 'Global Destinations', description: 'Connecting you to the world' },
    { icon: Award, number: '25+', label: 'Industry Awards', description: 'Recognition for outstanding service' },
    { icon: Star, number: '4.9', label: 'Customer Rating', description: 'Consistently exceptional reviews' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your security and well-being are our top priorities, with cutting-edge safety protocols and world-class security measures.'
    },
    {
      icon: Heart,
      title: 'Exceptional Service',
      description: 'We go above and beyond to ensure every moment of your journey is comfortable, seamless, and memorable.'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Meeting and exceeding international aviation standards while maintaining our commitment to sustainability.'
    },
    {
      icon: Clock,
      title: 'Efficiency',
      description: 'Streamlined processes and innovative technology to minimize wait times and maximize your travel experience.'
    }
  ];

  const milestones = [
    { year: '1985', title: 'Foundation', description: 'SkyLux Airport opens with a vision to redefine air travel' },
    { year: '1995', title: 'International Hub', description: 'Expansion to become a major international gateway' },
    { year: '2005', title: 'Digital Innovation', description: 'Pioneer in digital booking and smart airport technology' },
    { year: '2015', title: 'Luxury Redefined', description: 'Introduction of premium lounges and concierge services' },
    { year: '2025', title: 'Future Ready', description: 'Leading sustainable aviation with carbon-neutral operations' }
  ];

  const features = [
    'State-of-the-art terminals with modern amenities',
    'Premium lounges with spa and wellness facilities',
    'Fast-track security and immigration services',
    'World-class shopping and dining experiences',
    'Smart parking with real-time availability',
    '24/7 multilingual customer support',
    'Sustainable and eco-friendly operations',
    'Advanced baggage handling systems'
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
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Plane className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              SkyLux Airport
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Where luxury meets efficiency in the sky. Experience the pinnacle of modern aviation 
              with unparalleled service, cutting-edge technology, and world-class amenities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 text-center">
                <div className="mb-6">
                  <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-blue-300 mb-2">{stat.label}</div>
                  <div className="text-sm text-blue-200">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Our Story
              </h2>
              <div className="space-y-6 text-blue-200 text-lg leading-relaxed">
                <p>
                  Founded with a vision to revolutionize air travel, SkyLux Airport has been at the 
                  forefront of aviation excellence for nearly four decades. What began as a modest 
                  regional hub has evolved into one of the world's most prestigious and technologically 
                  advanced airports.
                </p>
                <p>
                  Our commitment to luxury, efficiency, and sustainability has earned us recognition 
                  as a leader in the aviation industry. From our state-of-the-art terminals to our 
                  world-class customer service, every aspect of SkyLux Airport is designed to exceed 
                  your expectations.
                </p>
                <p>
                  Today, we continue to push the boundaries of what's possible in air travel, 
                  combining cutting-edge technology with the warmth of human hospitality to create 
                  experiences that our passengers treasure long after they've reached their destination.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                    <Globe className="w-16 h-16 text-blue-400" />
                  </div>
                  <div className="h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                    <Award className="w-12 h-12 text-purple-400" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                    <Users className="w-12 h-12 text-cyan-400" />
                  </div>
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-blue-200 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Our Journey
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-2xl font-bold text-blue-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{milestone.title}</h3>
                      <p className="text-blue-200">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-4 border-slate-900 flex-shrink-0"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Why Choose SkyLux
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-blue-200 group-hover:text-white transition-colors">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/20">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Experience SkyLux?
            </h2>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Join millions of satisfied travelers who have made SkyLux Airport their gateway to the world. 
              Book your next journey with us and discover the difference luxury makes.
            </p>
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}