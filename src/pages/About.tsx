import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Marquee } from '../components/Marquee';
import { caneStalks } from '../assets/images';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6EDE8] text-[#24131F] pt-28 sm:pt-36 pb-24">
      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-16">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E86A78]">
          The Philosophy
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif uppercase tracking-tight text-[#24131F] mt-2 leading-[0.95]">
          Pure Cane.<br />
          <span className="text-[#78636D]">Fresh Every Day.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#78636D] mt-4 font-light max-w-2xl leading-relaxed">
          At CANE, we believe everyday refreshment should be natural, immediate, and free from industrial syrups. Located right on Beach Road in Kollam, Kerala, we extract pure cane and whole fruits to order.
        </p>
      </div>

      {/* Large Visual Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-20">
        <div className="relative rounded-2xl overflow-hidden border border-[#24131F]/10 shadow-xl">
          <img
            src={caneStalks}
            alt="Organic sugarcane stalks and fresh craft at CANE Kollam"
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24131F]/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-[#FFF9F5] max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#E86A78] font-semibold">
              Kollam Beach Road
            </span>
            <p className="font-serif text-xl sm:text-2xl mt-1">
              Freshly pressed sugarcane stalks paired with whole fruits and aromatic herbs.
            </p>
          </div>
        </div>
      </div>

      <Marquee theme="dark" separator="·" />

      {/* Story & Craftsmanship Blocks */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="font-serif text-2xl sm:text-3xl uppercase text-[#24131F]">
              Fresh Preparation
            </h2>
            <span className="text-xs uppercase tracking-wider text-[#E86A78] font-semibold mt-1 block">
              Made in the moment
            </span>
          </div>
          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-[#78636D] leading-relaxed">
            <p>
              Sugarcane juice is at its absolute peak in the minutes right after crushing. That is why CANE operates with zero pre-bottling of cane: when you order a Natural Cane with mint and ginger or a tropical mango blend, the stalk goes through the cold press right then and there.
            </p>
            <p>
              The result is a clean, naturally frothy, ice-cold drink that retains the delicate minerals, plant chlorophyll, and refreshing sweetness that nature intended.
            </p>
          </div>
        </div>

        <div className="h-px bg-[#24131F]/10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="font-serif text-2xl sm:text-3xl uppercase text-[#24131F]">
              Fruit Combinations
            </h2>
            <span className="text-xs uppercase tracking-wider text-[#E86A78] font-semibold mt-1 block">
              Artisanal fusions
            </span>
          </div>
          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-[#78636D] leading-relaxed">
            <p>
              Beyond the traditional sugarcane experience, our menu explores unexpected fusions. Ripe Alphonso mango, creamy avocado, crisp kiwi, and tropical passion fruit pair harmoniously with natural cane sweetness, creating full-bodied beverages that delight both classic juice lovers and modern palates.
            </p>
            <p>
              For those seeking pure botanical vitality, our cold-pressed range provides nutrient-dense elixirs like Pomegranate Lux, Green Detox, and ABC with zero added sugar or dilution.
            </p>
          </div>
        </div>

        <div className="h-px bg-[#24131F]/10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="font-serif text-2xl sm:text-3xl uppercase text-[#24131F]">
              Local Community
            </h2>
            <span className="text-xs uppercase tracking-wider text-[#E86A78] font-semibold mt-1 block">
              Kollam Beach Road
            </span>
          </div>
          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-[#78636D] leading-relaxed">
            <p>
              Situated at Beach Rd, Pallithottam, Thamarakulam in Kollam, CANE has grown into a coastal favorite for locals and beach visitors alike. Staying open until 12:30 AM every night, we welcome friends winding down after dinner, families on late-night seaside drives, and daytime fitness enthusiasts.
            </p>
            <div className="flex items-center gap-6 pt-3 text-xs text-[#24131F]">
              <div className="flex items-center gap-1.5 font-semibold">
                <Star className="w-4 h-4 fill-current text-[#F4A261]" />
                <span>4.7 / 5 from 18 Google Reviews</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-[#B8C98A]" />
                <span>Open until 12:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-10">
        <div className="bg-[#24131F] text-[#FFF9F5] rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="font-serif text-3xl sm:text-4xl uppercase text-[#FFF9F5]">
            Taste the Difference Today
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF9F5]/70 max-w-md mx-auto">
            Order for delivery to your doorstep in Kollam or pick up your chilled bottles on Beach Road.
          </p>
          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E86A78] hover:bg-[#E86A78]/90 text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
