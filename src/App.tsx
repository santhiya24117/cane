import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';

// Pages
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { ColdPressed } from './pages/ColdPressed';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <ScrollProgress />
        <CustomCursor />
        
        <div className="flex flex-col min-h-screen bg-[#F6EDE8] text-[#24131F]">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cold-pressed" element={<ColdPressed />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />

          {/* Interactive Modals and Slide-Overs */}
          <CartDrawer />
          <ProductModal />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
