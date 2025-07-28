import { Plane, Clock, MapPin, Users, Star, ArrowRight, Menu, X, Phone, Mail, Globe } from 'lucide-react';



export default function Footer()
{
    return (
        <footer className="relative z-10 px-6 py-12  border-t border-white/10 bg-black/20 backdrop-blur-md">
        {/* footer */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SkyPort</span>
              </div>
              <p className="text-blue-200 text-sm">
                Your gateway to the world. Experience the future of air travel with us.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-blue-200">
                <a href="#" className="block hover:text-white transition-colors">Flight Status</a>
                <a href="#" className="block hover:text-white transition-colors">Check-in</a>
                <a href="#" className="block hover:text-white transition-colors">Baggage</a>
                <a href="#" className="block hover:text-white transition-colors">Parking</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-sm text-blue-200">
                <a href="#" className="block hover:text-white transition-colors">Lounges</a>
                <a href="#" className="block hover:text-white transition-colors">Shopping</a>
                <a href="#" className="block hover:text-white transition-colors">Dining</a>
                <a href="#" className="block hover:text-white transition-colors">Hotels</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-blue-200">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@skyport.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Airport Blvd</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-blue-200">
            <p>&copy; 2025 SkyPort International Airport. All rights reserved.</p>
          </div>
        </div>
      </footer>

    )
}