import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ShieldCheck, Zap, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ColdPressed: React.FC = () => {
  const coldPressedProducts = PRODUCTS.filter((p) => p.category === 'cold-pressed');

  return (
    <div className="min-h-screen bg-[#24131F] text-[#FFF9F5] pt-28 sm:pt-36 pb-24">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E86A78] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Raw Cold Pressing Technology</span>
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif uppercase tracking-tight text-[#FFF9F5] leading-[0.95]">
            Cold Pressed
          </h1>
          <p className="text-lg sm:text-xl font-serif italic text-[#E86A78]">
            Pressed fresh. Served bright.
          </p>
          <p className="text-xs sm:text-sm text-[#FFF9F5]/75 leading-relaxed font-light pt-2 max-w-2xl">
            Our cold-pressed juices are pressed without heat or fast-spinning metal blades. Using hydraulic extraction, we keep the living nutrients, enzymes, and delicate botanical flavours completely intact.
          </p>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[#38202F] mt-10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#38202F] text-[#E86A78] shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#FFF9F5]">
                Zero Heat Degradation
              </h4>
              <p className="text-[11px] text-[#FFF9F5]/60 mt-1 leading-relaxed">
                Raw extraction maintains maximum enzyme activity and vibrant colour.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#38202F] text-[#B8C98A] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#FFF9F5]">
                100% Whole Botanicals
              </h4>
              <p className="text-[11px] text-[#FFF9F5]/60 mt-1 leading-relaxed">
                Pure pomegranate arils, crisp green apples, whole carrots, and herbs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#38202F] text-[#F4A261] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#FFF9F5]">
                No Added Water or Sugar
              </h4>
              <p className="text-[11px] text-[#FFF9F5]/60 mt-1 leading-relaxed">
                Pure unadulterated fruit and root essence in every single glass bottle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coldPressedProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="dark" />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 bg-[#38202F] border border-[#FFF9F5]/10 rounded-xl text-center space-y-4">
          <h3 className="font-serif text-2xl text-[#FFF9F5]">
            Custom Cleanses & Bulk Orders
          </h3>
          <p className="text-xs text-[#FFF9F5]/70 max-w-lg mx-auto">
            Planning a multi-day cleanse or corporate morning delivery in Kollam? Message us on WhatsApp for fresh glass-bottled packages prepared each morning.
          </p>
          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex px-6 py-3 bg-[#E86A78] hover:bg-[#E86A78]/90 text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm"
            >
              Order from Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
