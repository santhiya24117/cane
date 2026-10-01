import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MapPin, Clock, Phone, Instagram, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Marquee } from '../components/Marquee';
import { CANE_DISPLAY_PHONE, CANE_WHATSAPP_NUMBER } from '../utils/whatsapp';
import {
  heroSugarcane,
  mangoCane,
  pomegranate,
  fruitBowl,
  caneStalks,
} from '../assets/images';

export const Home: React.FC = () => {
  // CANE Favourites as defined in Section 14
  const favouriteIds = ['natural-cane', 'mango-cane', 'pineapple-cane', 'strawberry-cane', 'green-detox', 'abc-cane'];
  const favourites = favouriteIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  // Cane Specials for teaser
  const caneSpecials = PRODUCTS.filter((p) => p.category === 'cane-specials').slice(0, 3);
  // Cold Pressed teaser
  const coldPressedFeatured = PRODUCTS.filter((p) => p.category === 'cold-pressed').slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F6EDE8] text-[#24131F]">
      {/* 1. HERO SECTION (Deep Plum #24131F) */}
      <section className="relative bg-[#24131F] text-[#FFF9F5] pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Subtle background ambient light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E86A78]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              {/* Large editorial typography */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[0.95] text-[#FFF9F5] uppercase">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    Fresh.
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[#E86A78]"
                  >
                    Pressed.
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    CANE.
                  </motion.span>
                </span>
              </h1>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="text-sm sm:text-base text-[#FFF9F5]/80 max-w-xl leading-relaxed font-light"
              >
                Fresh sugarcane, fruit infusions and cold-pressed goodness — made fresh in Kollam. Pure flavours extracted immediately to order with zero artificial additives.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  to="/menu"
                  className="px-7 py-3.5 bg-[#E86A78] hover:bg-[#E86A78]/90 text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm rounded-sm inline-flex items-center gap-2 group"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/menu"
                  className="px-7 py-3.5 bg-transparent border border-[#FFF9F5]/30 hover:border-[#FFF9F5] text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold transition-all duration-200 rounded-sm"
                >
                  Explore Menu
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-[#FFF9F5]/70 border-t border-[#38202F]">
                <div>
                  <span className="font-semibold text-[#FFF9F5]">Open until 12:30 AM</span>
                  <span className="block text-[11px] text-[#FFF9F5]/50">Night owls welcome</span>
                </div>
                <div className="h-6 w-px bg-[#38202F]" />
                <div>
                  <span className="font-semibold text-[#FFF9F5]">4.7 ★ on Google</span>
                  <span className="block text-[11px] text-[#FFF9F5]/50">18 local reviews</span>
                </div>
                <div className="h-6 w-px bg-[#38202F]" />
                <div>
                  <span className="font-semibold text-[#FFF9F5]">Dine-in · Takeaway · Delivery</span>
                  <span className="block text-[11px] text-[#FFF9F5]/50">Direct WhatsApp dispatch</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#38202F] bg-[#38202F]">
                <img
                  src={heroSugarcane}
                  alt="Natural Cane Juice at CANE Kollam"
                  className="w-full aspect-[4/5] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24131F] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#24131F]/90 backdrop-blur-md border border-[#FFF9F5]/10 rounded-lg">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#E86A78] uppercase font-semibold text-[10px] tracking-wider block">
                        Freshly Crushed
                      </span>
                      <p className="font-serif text-lg text-[#FFF9F5] mt-0.5">
                        Natural Cane Juice
                      </p>
                    </div>
                    <span className="font-serif text-xl font-bold text-[#FFF9F5] tabular-nums">
                      ₹50
                    </span>
                  </div>
                  <p className="text-[11px] text-[#FFF9F5]/70 mt-1">
                    Pressed with optional fresh mint, ginger, and lemon.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL MARQUEE */}
      <Marquee
        theme="pink"
        items={[
          'FRESH DAILY',
          'PRESSED TO ORDER',
          'PURE FLAVOUR',
          'KOLLAM BEACH ROAD',
          'NATURAL CANE',
          'COLD PRESSED ELIXIRS',
        ]}
      />

      {/* 3. BRAND STATEMENT (Transition to Soft Blush) */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E86A78]">
              The Craft of CANE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.05] tracking-tight text-[#24131F] uppercase">
              From the Cane<br />
              <span className="text-[#78636D]">to Your Glass.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#78636D] leading-relaxed">
              Fresh sugarcane and fruit-forward drinks prepared to order for a refreshing everyday experience. Located right by Beach Road in Kollam, CANE reimagines traditional juice craftsmanship through modern cold-press techniques and premium raw pairings.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <Link
                to="/about"
                className="text-xs uppercase tracking-widest font-semibold text-[#24131F] hover:text-[#E86A78] flex items-center gap-2 group transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#24131F]/10 shadow-lg">
              <img
                src={caneStalks}
                alt="Artisanal freshly cut sugarcane stalks and lime at CANE Kollam"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRAND VALUES (4 Minimal Blocks) */}
      <section className="py-16 bg-[#FFF9F5] border-y border-[#24131F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#E86A78]">01</span>
              <h3 className="font-serif text-xl text-[#24131F] uppercase tracking-wide">
                Fresh Daily
              </h3>
              <p className="text-xs text-[#78636D] leading-relaxed">
                Prepared fresh for every single order. Never held overnight or batch-diluted.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#E86A78]">02</span>
              <h3 className="font-serif text-xl text-[#24131F] uppercase tracking-wide">
                Quality Ingredients
              </h3>
              <p className="text-xs text-[#78636D] leading-relaxed">
                Fresh whole fruits, organic ginger, field mint, and carefully selected raw canes.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#E86A78]">03</span>
              <h3 className="font-serif text-xl text-[#24131F] uppercase tracking-wide">
                Made to Order
              </h3>
              <p className="text-xs text-[#78636D] leading-relaxed">
                Crushed and pressed on demand right before your eyes or immediately before dispatch.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#E86A78]">04</span>
              <h3 className="font-serif text-xl text-[#24131F] uppercase tracking-wide">
                Refreshing by Design
              </h3>
              <p className="text-xs text-[#78636D] leading-relaxed">
                Simple botanical combinations and bold natural flavours without artificial sweeteners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS: THE CANE FAVOURITES */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E86A78]">
              Most Loved In Kollam
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-tight text-[#24131F] mt-1">
              The CANE Favourites
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-xs uppercase tracking-widest font-semibold text-[#24131F] hover:text-[#E86A78] flex items-center gap-1.5 transition-colors"
          >
            <span>View All 20+ Drinks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favourites.map((product) => (
            <ProductCard key={product.id} product={product} variant="light" />
          ))}
        </div>
      </section>

      {/* 6. EDITORIAL PRODUCT FEATURE: MANGO CANE SPOTLIGHT */}
      <section className="py-20 bg-[#FFF9F5] border-y border-[#24131F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden border border-[#24131F]/10 shadow-lg bg-[#F6EDE8]">
                <img
                  src={mangoCane}
                  alt="Mango Cane Artisanal Beverage"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-4 bg-[#24131F] text-[#FFF9F5] rounded-xl shadow-xl border border-[#38202F]">
                <span className="text-[10px] uppercase tracking-widest text-[#F4A261] font-semibold block">
                  Signature Recipe
                </span>
                <p className="font-serif text-lg text-[#FFF9F5]">
                  Alphonso Pulp & Pure Cane
                </p>
                <p className="text-xs text-[#FFF9F5]/70 mt-0.5">
                  Cup ₹120 · 500 ML ₹210
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E86A78]">
                Editorial Spotlight
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-tight text-[#24131F]">
                The Mango Cane Harmony
              </h2>
              <p className="text-xs sm:text-sm text-[#78636D] leading-relaxed">
                By infusing sun-ripened Alphonso mango with freshly extracted sugarcane juice, we achieve an unmatched texture: rich and velvety yet crisp, light, and thirst-quenching. Never pasteurised, never diluted.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/menu?category=cane-specials"
                  className="px-6 py-3 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm inline-flex items-center gap-2"
                >
                  <span>Order Mango Cane</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/menu"
                  className="px-6 py-3 border border-[#24131F]/20 hover:border-[#24131F] text-[#24131F] text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm"
                >
                  Explore All Specials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DISCOVER THE CANE DESTINATIONS (Gateway connecting directly to Menu, About, Cold Pressed, Contact, Order Now) */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E86A78]">
            Navigate the Brand
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-tight text-[#24131F]">
            The CANE Experience
          </h2>
          <p className="text-xs sm:text-sm text-[#78636D] leading-relaxed">
            Discover our complete range of freshly crushed drinks, artisanal cold-pressed juices, brand philosophy, and seaside Beach Road location.
          </p>
        </div>

        {/* 5 Distinct Editorial Gateway Cards connecting to all pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: THE MENU */}
          <Link
            to="/menu"
            className="group p-8 bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl flex flex-col justify-between hover:border-[#E86A78] hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#78636D] mb-4">
                <span className="font-mono font-semibold text-[#E86A78]">01</span>
                <span className="uppercase tracking-wider">7 Categories</span>
              </div>
              <h3 className="font-serif text-2xl uppercase text-[#24131F] group-hover:text-[#E86A78] transition-colors">
                The Menu
              </h3>
              <p className="text-xs text-[#78636D] mt-2 leading-relaxed">
                Explore pure sugarcane, fruit fusions, cane specials, health boosts, and refreshing fruit bowls made fresh to order.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#24131F] group-hover:text-[#E86A78] transition-colors">
              <span>Browse Full Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: COLD PRESSED */}
          <Link
            to="/cold-pressed"
            className="group p-8 bg-[#24131F] text-[#FFF9F5] border border-[#38202F] rounded-2xl flex flex-col justify-between hover:border-[#E86A78] hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#FFF9F5]/60 mb-4">
                <span className="font-mono font-semibold text-[#B8C98A]">02</span>
                <span className="uppercase tracking-wider">Hydraulic Raw</span>
              </div>
              <h3 className="font-serif text-2xl uppercase text-[#FFF9F5] group-hover:text-[#E86A78] transition-colors">
                Cold Pressed
              </h3>
              <p className="text-xs text-[#FFF9F5]/70 mt-2 leading-relaxed">
                Pressed fresh without heat degradation. Pomegranate Lux, Green Detox, Apple Bliss, and nutrient-dense raw elixirs.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E86A78] transition-colors">
              <span>View Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: ABOUT OUR CRAFT */}
          <Link
            to="/about"
            className="group p-8 bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl flex flex-col justify-between hover:border-[#E86A78] hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#78636D] mb-4">
                <span className="font-mono font-semibold text-[#E86A78]">03</span>
                <span className="uppercase tracking-wider">Pure Botanical</span>
              </div>
              <h3 className="font-serif text-2xl uppercase text-[#24131F] group-hover:text-[#E86A78] transition-colors">
                About CANE
              </h3>
              <p className="text-xs text-[#78636D] mt-2 leading-relaxed">
                Learn why we crush exclusively to order, our commitment to natural sweetness, and our story on Beach Road in Kollam.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#24131F] group-hover:text-[#E86A78] transition-colors">
              <span>Read Brand Story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 4: VISIT & CONTACT */}
          <Link
            to="/contact"
            className="group p-8 bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl flex flex-col justify-between hover:border-[#E86A78] hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#78636D] mb-4">
                <span className="font-mono font-semibold text-[#E86A78]">04</span>
                <span className="uppercase tracking-wider">Beach Road, Kollam</span>
              </div>
              <h3 className="font-serif text-2xl uppercase text-[#24131F] group-hover:text-[#E86A78] transition-colors">
                Visit & Contact
              </h3>
              <p className="text-xs text-[#78636D] mt-2 leading-relaxed">
                Pallithottam, Thamarakulam. Open daily until 12:30 AM. Call 08086320007, get directions, or check dine-in seating.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#24131F] group-hover:text-[#E86A78] transition-colors">
              <span>Location & Hours</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 5: ORDER NOW / WHATSAPP DISPATCH */}
          <div className="md:col-span-2 lg:col-span-2 p-8 bg-[#38202F] text-[#FFF9F5] border border-[#24131F] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-[#F4A261] font-semibold">
                05 · Direct Concierge
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl uppercase text-[#FFF9F5]">
                Order for Dine-in, Takeaway or Delivery
              </h3>
              <p className="text-xs text-[#FFF9F5]/70 max-w-md leading-relaxed">
                Add drinks to your bag or click to dispatch directly on WhatsApp to 08086320007 with your preferred pickup time or delivery address.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/menu"
                className="px-6 py-3.5 bg-[#E86A78] hover:bg-[#E86A78]/90 text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors text-center"
              >
                Order Online
              </Link>
              <a
                href={`https://wa.me/${CANE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#FFF9F5] text-[#24131F] hover:bg-[#FFF9F5]/90 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors text-center"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL SPOTLIGHT: CANE SPECIALS */}
      <section className="py-24 bg-[#38202F] text-[#FFF9F5] border-y border-[#24131F]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F4A261]">
                Exotic Infusions
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif uppercase leading-tight text-[#FFF9F5]">
                Cane Specials & Tropical Blends
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF9F5]/75 leading-relaxed">
                We combine the mellow natural sweetness of cold sugarcane with ripe seasonal fruits like sweet Alfonso mango, farm strawberries, and rich avocado.
              </p>
              <div className="pt-2">
                <Link
                  to="/menu?category=cane-specials"
                  className="px-6 py-3 bg-[#F4A261] hover:bg-[#F4A261]/90 text-[#24131F] text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm inline-flex items-center gap-2"
                >
                  <span>Explore Cane Specials</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caneSpecials.map((product) => (
                <ProductCard key={product.id} product={product} variant="dark" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. COLD PRESSED TEASER (Deep Plum Background with Ivory Typography) */}
      <section className="py-24 sm:py-32 bg-[#24131F] text-[#FFF9F5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E86A78]">
                Hydraulic Cold Pressing
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif uppercase text-[#FFF9F5] mt-1">
                Cold Pressed
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF9F5]/70 mt-2 max-w-lg">
                Pressed fresh. Served bright. Pure vitality extracted without heat or high-speed blades to preserve essential living enzymes.
              </p>
            </div>
            <Link
              to="/cold-pressed"
              className="text-xs uppercase tracking-widest font-semibold text-[#E86A78] hover:text-[#FFF9F5] flex items-center gap-2 transition-colors"
            >
              <span>Explore Cold Pressed Range</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {coldPressedFeatured.map((product) => (
              <ProductCard key={product.id} product={product} variant="dark" />
            ))}
          </div>
        </div>
      </section>

      {/* 10. FRUIT & HEALTH SECTION (Fruit Bowls & Health Boosts) */}
      <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E86A78]">
              Whole Nutrition
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-tight text-[#24131F]">
              Hand-Crafted Fruit Bowls & Health Boosts
            </h2>
            <p className="text-xs sm:text-sm text-[#78636D] leading-relaxed">
              Complementing our liquid elixirs, CANE prepares artfully arranged fruit bowls with dragonfruit, kiwi, assorted seasonal berries, and chia seeds. Pair with our ABC (Apple, Beetroot, Carrot) and Beetroot cane boosts for complete clean energy.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/menu?category=fruit-bowls"
                className="px-6 py-3 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm inline-flex items-center gap-2"
              >
                <span>View Fruit Bowls</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/menu?category=health-boosts"
                className="px-6 py-3 border border-[#24131F]/20 hover:border-[#24131F] text-[#24131F] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
              >
                Health Boosts
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#24131F]/10 shadow-lg">
              <img
                src={fruitBowl}
                alt="Tropical fruit bowl medley at CANE"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#24131F]/85 backdrop-blur-xs text-[#FFF9F5] rounded-lg text-xs flex justify-between items-center">
                <span>Tropical Sunrise & Chia Bowls</span>
                <span className="font-serif text-[#E86A78] font-bold">From ₹180</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FULL-WIDTH ORDER NOW CTA BANNER */}
      <section className="py-20 bg-[#24131F] text-[#FFF9F5] border-y border-[#38202F]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E86A78]">
            Kollam Beach Road Express
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-tight text-[#FFF9F5]">
            Ready to Taste Pure Cane?
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF9F5]/75 max-w-xl mx-auto leading-relaxed">
            Order your freshly pressed cane juices and cold-pressed bottles now for express takeaway or direct doorstep delivery in Kollam.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="px-8 py-4 bg-[#E86A78] hover:bg-[#E86A78]/90 text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold transition-all duration-200 rounded-sm shadow-md inline-flex items-center gap-2"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cold-pressed"
              className="px-8 py-4 border border-[#FFF9F5]/30 hover:border-[#FFF9F5] text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold transition-all duration-200 rounded-sm"
            >
              Cold Pressed Range
            </Link>
            <a
              href={`https://wa.me/${CANE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#B8C98A] text-[#24131F] hover:bg-[#B8C98A]/90 text-xs uppercase tracking-widest font-semibold transition-all duration-200 rounded-sm inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. VISIT & SERVICE DETAILS (Kollam Beach Road) */}
      <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E86A78]">
                Visit Us in Kollam
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif uppercase text-[#24131F]">
                Beach Road Hospitality
              </h2>
              <p className="text-xs sm:text-sm text-[#78636D] leading-relaxed">
                Whether you are finishing an evening stroll along Kollam Beach or seeking a healthy daytime refresher, stop by for a fresh cup or place an order via WhatsApp for quick takeaway and delivery.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#24131F]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E86A78] shrink-0 mt-0.5" />
                  <p>Beach Rd, Pallithottam, Thamarakulam, Kollam, Kerala 691001</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#B8C98A] shrink-0" />
                  <p>Open daily until 12:30 AM</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E86A78] shrink-0" />
                  <p>08086320007</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/menu"
                  className="px-6 py-3 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm inline-flex items-center gap-2"
                >
                  <span>Start Your Order</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${CANE_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[#24131F]/30 hover:border-[#24131F] text-[#24131F] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#F6EDE8] rounded-xl border border-[#24131F]/8">
                <h4 className="font-serif text-lg text-[#24131F] mb-1">
                  Three Flexible Services
                </h4>
                <ul className="text-xs text-[#78636D] space-y-2 mt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8C98A]" />
                    <span><strong>Dine-in:</strong> Relax and enjoy fresh glasses right by the beach.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8C98A]" />
                    <span><strong>Takeaway:</strong> Pre-ordered bottles packed ready for pickup.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8C98A]" />
                    <span><strong>Delivery:</strong> Delivered directly to your home or office in Kollam.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM SECTION (Section 47: FOLLOW THE FRESHNESS) */}
      <section className="py-20 bg-[#F6EDE8] border-t border-[#24131F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E86A78]">
            Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif uppercase tracking-tight text-[#24131F]">
            Follow the Freshness
          </h2>
          <p className="text-xs sm:text-sm text-[#78636D] max-w-md mx-auto">
            Stay tuned for seasonal fruit arrivals, cold-press specials, and daily vibes from Beach Road.
          </p>
          <div>
            <a
              href="https://www.instagram.com/cane.juices?stkn=MXN2N2Jyb2phZGU3aw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm"
            >
              <Instagram className="w-4 h-4 text-[#E86A78]" />
              <span>Follow @cane.juices on Instagram</span>
            </a>
          </div>

          {/* Clean Curated Visual Grid Placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className="aspect-square rounded-lg overflow-hidden border border-[#24131F]/10">
              <img
                src={heroSugarcane}
                alt="Fresh Cane"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden border border-[#24131F]/10">
              <img
                src={mangoCane}
                alt="Mango Cane"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden border border-[#24131F]/10">
              <img
                src={pomegranate}
                alt="Pomegranate Lux"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden border border-[#24131F]/10">
              <img
                src={fruitBowl}
                alt="Fruit Bowl"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
