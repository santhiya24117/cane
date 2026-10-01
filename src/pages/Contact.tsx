import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Instagram, Star, Navigation, ArrowUpRight } from 'lucide-react';
import { CANE_DISPLAY_PHONE, CANE_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Contact: React.FC = () => {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Beach+Rd+Pallithottam+Thamarakulam+Kollam+Kerala+691001';

  return (
    <div className="min-h-screen bg-[#F6EDE8] text-[#24131F] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E86A78]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif uppercase tracking-tight text-[#24131F] mt-1">
            Visit & Contact
          </h1>
          <p className="text-sm text-[#78636D] mt-2 font-light max-w-xl">
            Drop by our seaside spot on Beach Road in Kollam or place your order via WhatsApp for quick takeaway and doorstep delivery.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card 1: Core Details */}
          <div className="lg:col-span-7 bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl p-6 sm:p-10 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E86A78] font-semibold block mb-1">
                Kollam Flagship
              </span>
              <h2 className="text-3xl font-serif uppercase text-[#24131F]">
                CANE
              </h2>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#78636D]">
                <div className="flex items-center text-[#F4A261]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-semibold text-[#24131F]">4.7 / 5</span>
                <span>·</span>
                <span>18 Google Reviews</span>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#24131F]/8 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E86A78] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#24131F] uppercase text-xs tracking-wider">
                    Address
                  </h4>
                  <p className="text-[#78636D] mt-1 leading-relaxed">
                    Beach Rd, Pallithottam, Thamarakulam,<br />
                    Kollam, Kerala 691001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Clock className="w-5 h-5 text-[#B8C98A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#24131F] uppercase text-xs tracking-wider">
                    Operating Hours
                  </h4>
                  <p className="text-[#78636D] mt-1">
                    Open daily until <strong>12:30 AM</strong>
                  </p>
                  <p className="text-[11px] text-[#78636D]/70 mt-0.5">
                    Late night fresh juice & cold-pressed refills
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Phone className="w-5 h-5 text-[#E86A78] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#24131F] uppercase text-xs tracking-wider">
                    Phone & WhatsApp
                  </h4>
                  <p className="text-[#78636D] mt-1">
                    {CANE_DISPLAY_PHONE}
                  </p>
                </div>
              </div>
            </div>

            {/* Core Action Buttons as required in Section 46 */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={`tel:${CANE_DISPLAY_PHONE}`}
                className="px-5 py-3 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call CANE</span>
              </a>

              <a
                href={`https://wa.me/${CANE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#B8C98A] text-[#24131F] hover:bg-[#B8C98A]/80 transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm inline-flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-[#24131F]/20 hover:border-[#24131F] text-[#24131F] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm inline-flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#E86A78]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Card 2: Services & Social */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-serif text-xl uppercase text-[#24131F]">
                Available Services
              </h3>
              <div className="space-y-3 text-xs text-[#78636D]">
                <div className="p-3 bg-[#F6EDE8] rounded-md flex items-center justify-between">
                  <span className="font-semibold text-[#24131F]">Dine-in</span>
                  <span className="text-[#B8C98A] font-semibold">Available</span>
                </div>
                <div className="p-3 bg-[#F6EDE8] rounded-md flex items-center justify-between">
                  <span className="font-semibold text-[#24131F]">Takeaway</span>
                  <span className="text-[#B8C98A] font-semibold">Express Pickup</span>
                </div>
                <div className="p-3 bg-[#F6EDE8] rounded-md flex items-center justify-between">
                  <span className="font-semibold text-[#24131F]">Delivery</span>
                  <span className="text-[#B8C98A] font-semibold">Kollam City Area</span>
                </div>
              </div>
            </div>

            <div className="bg-[#24131F] text-[#FFF9F5] border border-[#38202F] rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#E86A78] font-semibold block">
                Instagram Community
              </span>
              <h3 className="font-serif text-2xl uppercase text-[#FFF9F5]">
                @cane.juices
              </h3>
              <p className="text-xs text-[#FFF9F5]/70 leading-relaxed">
                Tag us in your seaside drinks or follow along for seasonal fruit updates and specials.
              </p>
              <a
                href="https://www.instagram.com/cane.juices?stkn=MXN2N2Jyb2phZGU3aw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E86A78] hover:bg-[#E86A78]/90 text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
