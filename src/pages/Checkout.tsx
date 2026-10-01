import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { OrderType } from '../types';
import { generateWhatsAppMessage, buildWhatsAppUrl, CANE_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { ArrowLeft, Check, ShoppingBag, MessageCircle, AlertCircle } from 'lucide-react';

interface FormErrors {
  fullName?: string;
  mobile?: string;
  houseFlat?: string;
  streetArea?: string;
  city?: string;
  pinCode?: string;
}

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    deliveryCharge,
    total,
    orderType,
    setOrderType,
    checkoutForm,
    updateCheckoutForm,
    clearCart,
  } = useCart();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!checkoutForm.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanMobile = checkoutForm.mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (orderType === 'delivery') {
      if (!checkoutForm.houseFlat.trim()) {
        newErrors.houseFlat = 'Please enter house/flat/building number.';
      }
      if (!checkoutForm.streetArea.trim()) {
        newErrors.streetArea = 'Please enter your street or area in Kollam.';
      }
      if (!checkoutForm.city.trim()) {
        newErrors.city = 'Please enter your city.';
      }
      if (!checkoutForm.pinCode.trim() || checkoutForm.pinCode.length < 6) {
        newErrors.pinCode = 'Please enter a valid 6-digit PIN code.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (validateForm()) {
      setIsReviewOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmWhatsApp = () => {
    const message = generateWhatsAppMessage(
      cart,
      subtotal,
      deliveryCharge,
      total,
      checkoutForm
    );

    const waUrl = buildWhatsAppUrl(message);

    // Save temporary summary to sessionStorage for OrderSuccess page
    try {
      sessionStorage.setItem('cane_last_order_wa_url', waUrl);
      sessionStorage.setItem('cane_last_order_summary', JSON.stringify({
        items: cart,
        total,
        orderType,
        fullName: checkoutForm.fullName,
        mobile: checkoutForm.mobile,
      }));
    } catch {
      // storage unavailable
    }

    // Open WhatsApp in new window/tab
    window.open(waUrl, '_blank');

    // Clear cart and redirect to order success page
    clearCart();
    navigate('/order-success');
  };

  if (cart.length === 0 && !isReviewOpen) {
    return (
      <div className="min-h-screen bg-[#F6EDE8] text-[#24131F] pt-36 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF9F5] flex items-center justify-center text-[#78636D] mx-auto mb-4 border border-[#24131F]/10">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-3xl uppercase text-[#24131F]">
            Your Cart is Empty
          </h1>
          <p className="text-xs text-[#78636D] mt-2 leading-relaxed">
            Please add your favourite fresh sugarcane juices or cold-pressed elixirs before proceeding to checkout.
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-block px-7 py-3 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6EDE8] text-[#24131F] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#78636D] hover:text-[#24131F] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Menu</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E86A78]">
            Direct Concierge
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif uppercase tracking-tight text-[#24131F] mt-1">
            {isReviewOpen ? 'Review Your Order' : 'Complete Your Order'}
          </h1>
          <p className="text-xs sm:text-sm text-[#78636D] mt-1.5 font-light">
            {isReviewOpen
              ? 'Please review your selections and delivery details before dispatching on WhatsApp.'
              : 'Choose your preferred order type and provide your contact details for instant WhatsApp order preparation.'}
          </p>
        </div>

        {/* REVIEW STEP (Section 37) */}
        {isReviewOpen ? (
          <div className="max-w-3xl bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-serif uppercase text-[#24131F] pb-3 border-b border-[#24131F]/10">
                Order Review
              </h2>

              <div className="divide-y divide-[#24131F]/8 mt-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-[#24131F]">{item.name}</p>
                      <p className="text-[#78636D] text-[11px]">
                        {item.size.name} × {item.quantity}
                        {item.addOns.length > 0 && ` (+ ${item.addOns.join(', ')})`}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-sm text-[#24131F] tabular-nums">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-[#24131F]/10 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#78636D]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-mono text-[#24131F]">₹{subtotal}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-[#78636D]">
                    <span>Delivery Charge (Kollam)</span>
                    <span className="tabular-nums font-mono text-[#24131F]">₹{deliveryCharge}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-[#24131F] pt-2 border-t border-[#24131F]/10">
                  <span>Total Payable</span>
                  <span className="tabular-nums text-[#E86A78]">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Customer & Delivery Summary */}
            <div className="p-5 bg-[#F6EDE8] rounded-xl border border-[#24131F]/8 space-y-3 text-xs">
              <h3 className="font-serif uppercase text-sm text-[#24131F] tracking-wide">
                Dispatch Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#24131F]">
                <div>
                  <span className="text-[#78636D] block text-[11px]">Customer Name:</span>
                  <strong>{checkoutForm.fullName}</strong>
                </div>
                <div>
                  <span className="text-[#78636D] block text-[11px]">Mobile Number:</span>
                  <strong>{checkoutForm.mobile}</strong>
                </div>
                <div>
                  <span className="text-[#78636D] block text-[11px]">Order Type:</span>
                  <strong className="capitalize">{checkoutForm.orderType}</strong>
                </div>

                {orderType === 'takeaway' && (
                  <div>
                    <span className="text-[#78636D] block text-[11px]">Pickup Time:</span>
                    <strong>{checkoutForm.preferredPickupTime || 'As soon as possible'}</strong>
                  </div>
                )}

                {orderType === 'dine-in' && (
                  <>
                    <div>
                      <span className="text-[#78636D] block text-[11px]">Table / Seating:</span>
                      <strong>{checkoutForm.tableDetails || 'Walk-in'}</strong>
                    </div>
                    <div>
                      <span className="text-[#78636D] block text-[11px]">Preferred Time:</span>
                      <strong>{checkoutForm.preferredDineInTime || 'Now'}</strong>
                    </div>
                  </>
                )}

                {orderType === 'delivery' && (
                  <div className="sm:col-span-2">
                    <span className="text-[#78636D] block text-[11px]">Delivery Address:</span>
                    <strong>
                      {checkoutForm.houseFlat}, {checkoutForm.streetArea}
                      {checkoutForm.landmark && `, near ${checkoutForm.landmark}`}, {checkoutForm.city} — {checkoutForm.pinCode}
                    </strong>
                    <span className="text-[#78636D] block text-[11px] mt-1">
                      Time: {checkoutForm.preferredDeliveryTime || 'Standard'}
                    </span>
                  </div>
                )}

                {checkoutForm.specialInstructions && (
                  <div className="sm:col-span-2 pt-2 border-t border-[#24131F]/10">
                    <span className="text-[#78636D] block text-[11px]">Special Instructions:</span>
                    <p className="italic">{checkoutForm.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Confirmation Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#24131F]/20 hover:border-[#24131F] text-[#24131F] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
              >
                Edit Order
              </button>

              <button
                type="button"
                onClick={handleConfirmWhatsApp}
                className="w-full sm:flex-1 px-8 py-3.5 bg-[#24131F] hover:bg-[#E86A78] text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center justify-center gap-2.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#B8C98A]" />
                <span>Confirm & Order on WhatsApp</span>
              </button>
            </div>
          </div>
        ) : (
          /* TWO-COLUMN CHECKOUT FORM */
          <form onSubmit={handleProceedToReview} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Customer Details & Flows (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8 bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl p-6 sm:p-8">
              {/* Order Type Selector */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#24131F] block mb-3">
                  1. Select Order Type *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['delivery', 'takeaway', 'dine-in'] as OrderType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`py-3 px-3 text-center rounded-md border text-xs font-semibold uppercase tracking-wider transition-all ${
                        orderType === type
                          ? 'bg-[#24131F] text-[#FFF9F5] border-[#24131F]'
                          : 'bg-[#FFF9F5] text-[#78636D] border-[#24131F]/15 hover:border-[#24131F]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact Information (Required for all) */}
              <div className="space-y-4 pt-4 border-t border-[#24131F]/10">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#24131F] block">
                  2. Customer Information *
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={checkoutForm.fullName}
                    onChange={(e) => updateCheckoutForm({ fullName: e.target.value })}
                    placeholder="e.g. Santhiya"
                    className={`w-full px-3.5 py-2.5 bg-[#FFF9F5] border rounded-md text-xs text-[#24131F] placeholder:text-[#78636D]/60 focus:outline-hidden transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-[#24131F]/20 focus:border-[#E86A78]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={checkoutForm.mobile}
                    onChange={(e) => updateCheckoutForm({ mobile: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-3.5 py-2.5 bg-[#FFF9F5] border rounded-md text-xs text-[#24131F] placeholder:text-[#78636D]/60 focus:outline-hidden transition-colors ${
                      errors.mobile ? 'border-red-500' : 'border-[#24131F]/20 focus:border-[#E86A78]'
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobile}
                    </p>
                  )}
                </div>
              </div>

              {/* Specific Flow 1: Takeaway Flow (Section 32) */}
              {orderType === 'takeaway' && (
                <div className="space-y-4 pt-4 border-t border-[#24131F]/10">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#24131F] block">
                    3. Takeaway Preferences
                  </label>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                      Preferred Pickup Time *
                    </label>
                    <input
                      type="text"
                      value={checkoutForm.preferredPickupTime}
                      onChange={(e) => updateCheckoutForm({ preferredPickupTime: e.target.value })}
                      placeholder="e.g. In 20 minutes / 7:30 PM"
                      className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#24131F]/20 rounded-md text-xs text-[#24131F] focus:border-[#E86A78] focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Specific Flow 2: Dine-in Flow (Section 33) */}
              {orderType === 'dine-in' && (
                <div className="space-y-4 pt-4 border-t border-[#24131F]/10">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#24131F] block">
                    3. Dine-in Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        Table Number / Seating
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.tableDetails}
                        onChange={(e) => updateCheckoutForm({ tableDetails: e.target.value })}
                        placeholder="e.g. Table 4 / Outdoor Bench"
                        className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#24131F]/20 rounded-md text-xs text-[#24131F] focus:border-[#E86A78] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        Preferred Time
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.preferredDineInTime}
                        onChange={(e) => updateCheckoutForm({ preferredDineInTime: e.target.value })}
                        placeholder="e.g. Now / 8:00 PM"
                        className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#24131F]/20 rounded-md text-xs text-[#24131F] focus:border-[#E86A78] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Specific Flow 3: Delivery Flow (Section 34) */}
              {orderType === 'delivery' && (
                <div className="space-y-4 pt-4 border-t border-[#24131F]/10">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#24131F] block">
                    3. Delivery Address (Kollam Area) *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        House / Flat / Building No. *
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.houseFlat}
                        onChange={(e) => updateCheckoutForm({ houseFlat: e.target.value })}
                        placeholder="e.g. Villa 14 / Apartment 3B"
                        className={`w-full px-3.5 py-2.5 bg-[#FFF9F5] border rounded-md text-xs text-[#24131F] focus:outline-hidden ${
                          errors.houseFlat ? 'border-red-500' : 'border-[#24131F]/20 focus:border-[#E86A78]'
                        }`}
                      />
                      {errors.houseFlat && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.houseFlat}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        Street / Area *
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.streetArea}
                        onChange={(e) => updateCheckoutForm({ streetArea: e.target.value })}
                        placeholder="e.g. Beach Road, Pallithottam"
                        className={`w-full px-3.5 py-2.5 bg-[#FFF9F5] border rounded-md text-xs text-[#24131F] focus:outline-hidden ${
                          errors.streetArea ? 'border-red-500' : 'border-[#24131F]/20 focus:border-[#E86A78]'
                        }`}
                      />
                      {errors.streetArea && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.streetArea}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.landmark}
                        onChange={(e) => updateCheckoutForm({ landmark: e.target.value })}
                        placeholder="e.g. Near Light House"
                        className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#24131F]/20 rounded-md text-xs text-[#24131F] focus:border-[#E86A78] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.city}
                        onChange={(e) => updateCheckoutForm({ city: e.target.value })}
                        placeholder="Kollam"
                        className={`w-full px-3.5 py-2.5 bg-[#FFF9F5] border rounded-md text-xs text-[#24131F] focus:outline-hidden ${
                          errors.city ? 'border-red-500' : 'border-[#24131F]/20 focus:border-[#E86A78]'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.pinCode}
                        onChange={(e) => updateCheckoutForm({ pinCode: e.target.value })}
                        placeholder="691001"
                        maxLength={6}
                        className={`w-full px-3.5 py-2.5 bg-[#FFF9F5] border rounded-md text-xs text-[#24131F] focus:outline-hidden ${
                          errors.pinCode ? 'border-red-500' : 'border-[#24131F]/20 focus:border-[#E86A78]'
                        }`}
                      />
                      {errors.pinCode && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.pinCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                        Preferred Delivery Time *
                      </label>
                      <input
                        type="text"
                        value={checkoutForm.preferredDeliveryTime}
                        onChange={(e) => updateCheckoutForm({ preferredDeliveryTime: e.target.value })}
                        placeholder="e.g. 7:30 PM / As soon as possible"
                        className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#24131F]/20 rounded-md text-xs text-[#24131F] focus:border-[#E86A78] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Special Instructions (Common) */}
              <div className="pt-4 border-t border-[#24131F]/10">
                <label className="block text-[11px] font-semibold text-[#24131F] uppercase tracking-wider mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={checkoutForm.specialInstructions}
                  onChange={(e) => updateCheckoutForm({ specialInstructions: e.target.value })}
                  placeholder="e.g. Please pack separately, extra mint, less ice."
                  className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#24131F]/20 rounded-md text-xs text-[#24131F] placeholder:text-[#78636D]/60 focus:border-[#E86A78] focus:outline-hidden resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#24131F] hover:bg-[#E86A78] text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Review</span>
                <Check className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Order Summary (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
              <h3 className="font-serif text-xl uppercase text-[#24131F] pb-3 border-b border-[#24131F]/10">
                Order Summary
              </h3>

              <div className="divide-y divide-[#24131F]/8 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-semibold text-[#24131F]">{item.name}</h4>
                      <p className="text-[11px] text-[#78636D]">
                        {item.size.name} × {item.quantity}
                        {item.addOns.length > 0 && ` (+ ${item.addOns.join(', ')})`}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-sm text-[#24131F] tabular-nums">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#24131F]/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#78636D]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-mono text-[#24131F]">₹{subtotal}</span>
                </div>

                {orderType === 'delivery' ? (
                  <div className="flex justify-between text-[#78636D]">
                    <span>Delivery Charge (Kollam)</span>
                    <span className="tabular-nums font-mono text-[#24131F]">₹{deliveryCharge}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[#78636D]">
                    <span>Service ({orderType})</span>
                    <span className="tabular-nums font-mono text-[#B8C98A]">Free</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-serif font-bold text-[#24131F] pt-2 border-t border-[#24131F]/10">
                  <span>Total</span>
                  <span className="tabular-nums text-[#E86A78]">₹{total}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F6EDE8] rounded-lg border border-[#24131F]/6 text-[11px] text-[#78636D] space-y-1">
                <p className="font-semibold text-[#24131F]">
                  WhatsApp Direct Verification
                </p>
                <p>
                  Upon clicking confirm, your WhatsApp will automatically open with all items, address details, and totals formatted for immediate preparation at CANE.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
