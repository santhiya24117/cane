import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2, ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { CANE_DISPLAY_PHONE, CANE_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const OrderSuccess: React.FC = () => {
  const [waUrl, setWaUrl] = useState<string>('');
  const [orderSummary, setOrderSummary] = useState<any>(null);

  useEffect(() => {
    try {
      const savedUrl = sessionStorage.getItem('cane_last_order_wa_url');
      const savedSummary = sessionStorage.getItem('cane_last_order_summary');
      if (savedUrl) setWaUrl(savedUrl);
      if (savedSummary) setOrderSummary(JSON.parse(savedSummary));
    } catch {
      // storage unavailable
    }
  }, []);

  const fallbackUrl = `https://wa.me/${CANE_WHATSAPP_NUMBER}`;
  const targetUrl = waUrl || fallbackUrl;

  return (
    <div className="min-h-screen bg-[#F6EDE8] text-[#24131F] pt-28 sm:pt-36 pb-24 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-5 sm:px-8">
        <div className="bg-[#FFF9F5] border border-[#24131F]/10 rounded-2xl p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#B8C98A]/20 text-[#B8C98A] flex items-center justify-center mx-auto border border-[#B8C98A]/40">
            <CheckCircle2 className="w-8 h-8 text-[#24131F]" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#E86A78] font-semibold block mb-1">
              Final Step
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif uppercase tracking-tight text-[#24131F]">
              Order Details Ready
            </h1>
            <p className="text-xs sm:text-sm text-[#78636D] mt-2 max-w-md mx-auto leading-relaxed">
              Your order details have been prepared in WhatsApp.
              Please send the message to CANE to complete your order.
            </p>
          </div>

          {/* Quick summary box if available */}
          {orderSummary && (
            <div className="p-4 bg-[#F6EDE8] rounded-xl text-left border border-[#24131F]/8 text-xs text-[#24131F] space-y-2">
              <div className="flex justify-between font-semibold border-b border-[#24131F]/10 pb-2">
                <span>Customer: {orderSummary.fullName}</span>
                <span className="capitalize">{orderSummary.orderType}</span>
              </div>
              <p className="text-[#78636D]">
                Total Amount: <strong className="text-[#E86A78] font-serif text-sm">₹{orderSummary.total}</strong>
              </p>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#24131F] hover:bg-[#E86A78] text-[#FFF9F5] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center justify-center gap-2.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-[#B8C98A]" />
              <span>Open WhatsApp</span>
            </a>

            <Link
              to="/menu"
              className="w-full sm:w-auto px-6 py-3.5 border border-[#24131F]/20 hover:border-[#24131F] text-[#24131F] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
            >
              Back to Menu
            </Link>
          </div>

          {/* Information Notice */}
          <div className="pt-6 border-t border-[#24131F]/8 text-xs text-[#78636D] space-y-2">
            <p className="flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B8C98A]" />
              <span>Open until 12:30 AM · Beach Rd, Pallithottam, Kollam</span>
            </p>
            <p className="flex items-center justify-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E86A78]" />
              <span>Need help? Call {CANE_DISPLAY_PHONE}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
