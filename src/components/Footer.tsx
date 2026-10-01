import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, MapPin, Clock, Star, MessageCircle, ArrowUpRight } from 'lucide-react';
import { CANE_DISPLAY_PHONE, CANE_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#24131F] text-[#FFF9F5] border-t border-[#38202F] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#38202F]">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-serif tracking-wider uppercase block text-[#FFF9F5]">
              CANE
            </Link>
            <p className="font-serif italic text-lg text-[#E86A78]">
              Fresh. Pressed. Cane.
            </p>
            <p className="text-xs text-[#FFF9F5]/70 leading-relaxed max-w-xs">
              Natural sugarcane beverages, exotic fruit fusions, and artisanal cold-pressed juices crafted daily on the coastal shores of Kollam.
            </p>

            {/* Google Rating */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#FFF9F5]/80">
              <div className="flex items-center text-[#F4A261]">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-semibold text-[#FFF9F5]">4.7 / 5</span>
              <span className="text-[#FFF9F5]/50">·</span>
              <span className="text-[#FFF9F5]/60">18 Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E86A78]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF9F5]/80">
              <li>
                <Link to="/" className="hover:text-[#FFF9F5] transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FFF9F5] transition-colors flex items-center gap-1">
                  <span>Full Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFF9F5] transition-colors">
                  About Our Craft
                </Link>
              </li>
              <li>
                <Link to="/cold-pressed" className="hover:text-[#FFF9F5] transition-colors">
                  Cold Pressed Collection
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFF9F5] transition-colors">
                  Visit & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Orders & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E86A78]">
              Services & Order
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF9F5]/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8C98A]" />
                <span>Dine-in · Takeaway · Delivery</span>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FFF9F5] transition-colors">
                  Order Online for Pickup / Delivery
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CANE_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFF9F5] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#B8C98A]" />
                  <span>WhatsApp Concierge</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FFF9F5]/50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cane.juices?stkn=MXN2N2Jyb2phZGU3aw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFF9F5] transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E86A78]" />
                  <span>@cane.juices</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FFF9F5]/50" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E86A78]">
              Location & Hours
            </h4>
            <div className="space-y-2 text-xs text-[#FFF9F5]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E86A78] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Beach Rd, Pallithottam,<br />
                  Thamarakulam, Kollam,<br />
                  Kerala 691001
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#B8C98A] shrink-0" />
                <p>Open daily until 12:30 AM</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#E86A78] shrink-0" />
                <a href={`tel:${CANE_DISPLAY_PHONE}`} className="hover:underline">
                  {CANE_DISPLAY_PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFF9F5]/50 gap-4">
          <p>© 2026 CANE. All rights reserved.</p>
          <p className="tracking-wide">
            Beach Road · Kollam · Kerala
          </p>
        </div>
      </div>
    </footer>
  );
};
