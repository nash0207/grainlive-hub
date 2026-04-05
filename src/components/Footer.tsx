import { Wheat, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-grain-earth text-grain-cream/80 pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-grain-cream">GrainDispatch</span>
          </div>
          <p className="text-sm leading-relaxed">
            Your trusted rice logistics partner — from farm to table with full transparency and live tracking.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-grain-cream mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/shop" className="hover:text-grain-gold transition-colors">Shop Rice</Link>
            <Link to="/track" className="hover:text-grain-gold transition-colors">Track Order</Link>
            <Link to="/about" className="hover:text-grain-gold transition-colors">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-grain-cream mb-4">Portals</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/login" className="hover:text-grain-gold transition-colors">Buyer Login</Link>
            <Link to="/driver" className="hover:text-grain-gold transition-colors">Driver Portal</Link>
            <Link to="/admin" className="hover:text-grain-gold transition-colors">Owner Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-grain-cream mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-grain-gold" /> Manila, Philippines</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-grain-gold" /> +63 917 123 4567</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-grain-gold" /> hello@graindispatch.ph</div>
          </div>
        </div>
      </div>
      <div className="border-t border-grain-cream/10 pt-6 text-center text-xs text-grain-cream/50">
        © 2026 GrainDispatch. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
