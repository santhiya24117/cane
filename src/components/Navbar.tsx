import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, Phone, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isDarkHero = location.pathname === '/' || location.pathname === '/cold-pressed';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#FFF9F5]/90 backdrop-blur-md shadow-xs border-b border-[#24131F]/10 text-[#24131F]'
            : isDarkHero
            ? 'py-5 bg-transparent text-[#FFF9F5]'
            : 'py-5 bg-transparent text-[#24131F]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element Brand Zone */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-serif tracking-wider uppercase focus-visible:outline-hidden"
            aria-label="CANE Home"
          >
            CANE
          </Link>

          {/* Zone 2: 5 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium">
            <Link
              to="/"
              className={`transition-colors py-1 hover:text-[#E86A78] ${
                location.pathname === '/' ? 'text-[#E86A78] border-b-2 border-[#E86A78]' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`transition-colors py-1 hover:text-[#E86A78] ${
                location.pathname === '/menu' ? 'text-[#E86A78] border-b-2 border-[#E86A78]' : ''
              }`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`transition-colors py-1 hover:text-[#E86A78] ${
                location.pathname === '/about' ? 'text-[#E86A78] border-b-2 border-[#E86A78]' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/cold-pressed"
              className={`transition-colors py-1 hover:text-[#E86A78] ${
                location.pathname === '/cold-pressed' ? 'text-[#E86A78] border-b-2 border-[#E86A78]' : ''
              }`}
            >
              Cold Pressed
            </Link>
            <Link
              to="/contact"
              className={`transition-colors py-1 hover:text-[#E86A78] ${
                location.pathname === '/contact' ? 'text-[#E86A78] border-b-2 border-[#E86A78]' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/menu"
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                isScrolled
                  ? 'bg-[#24131F] text-[#FFF9F5] hover:bg-[#38202F]'
                  : isDarkHero
                  ? 'bg-[#E86A78] text-[#FFF9F5] hover:bg-[#E86A78]/90'
                  : 'bg-[#24131F] text-[#FFF9F5] hover:bg-[#38202F]'
              }`}
            >
              Order Now
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-colors relative ${
                isScrolled
                  ? 'text-[#24131F] hover:text-[#E86A78]'
                  : isDarkHero
                  ? 'text-[#FFF9F5] hover:text-[#E86A78]'
                  : 'text-[#24131F] hover:text-[#E86A78]'
              }`}
              aria-label={`Open shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Cart</span>
              <span className="tabular-nums font-mono text-[11px] px-1.5 py-0.5 rounded-sm bg-[#E86A78] text-[#FFF9F5] font-semibold">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 transition-colors ${
                isScrolled || !isDarkHero ? 'text-[#24131F]' : 'text-[#FFF9F5]'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#24131F] text-[#FFF9F5] flex flex-col justify-between pt-24 pb-8 px-6 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 text-xl font-serif">
            <Link
              to="/"
              className="py-2 border-b border-[#38202F] flex items-center justify-between text-[#FFF9F5]"
            >
              <span>Home</span>
              <ArrowUpRight className="w-5 h-5 text-[#E86A78]" />
            </Link>
            <Link
              to="/menu"
              className="py-2 border-b border-[#38202F] flex items-center justify-between text-[#FFF9F5]"
            >
              <span>The Menu</span>
              <ArrowUpRight className="w-5 h-5 text-[#E86A78]" />
            </Link>
            <Link
              to="/about"
              className="py-2 border-b border-[#38202F] flex items-center justify-between text-[#FFF9F5]"
            >
              <span>About CANE</span>
              <ArrowUpRight className="w-5 h-5 text-[#E86A78]" />
            </Link>
            <Link
              to="/cold-pressed"
              className="py-2 border-b border-[#38202F] flex items-center justify-between text-[#FFF9F5]"
            >
              <span>Cold Pressed</span>
              <ArrowUpRight className="w-5 h-5 text-[#E86A78]" />
            </Link>
            <Link
              to="/contact"
              className="py-2 border-b border-[#38202F] flex items-center justify-between text-[#FFF9F5]"
            >
              <span>Contact & Visit</span>
              <ArrowUpRight className="w-5 h-5 text-[#E86A78]" />
            </Link>
          </nav>

          <div className="space-y-4 pt-6">
            <div className="text-xs text-[#FFF9F5]/70 space-y-1">
              <p>Beach Rd, Pallithottam, Kollam</p>
              <p>Open daily until 12:30 AM</p>
              <p className="flex items-center gap-1.5 pt-1 text-[#FFF9F5]">
                <Phone className="w-3.5 h-3.5 text-[#E86A78]" /> 08086320007
              </p>
            </div>
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 bg-[#E86A78] text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold"
            >
              Explore Full Menu
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
