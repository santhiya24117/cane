import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryCharge,
    total,
    orderType,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleExploreMenu = () => {
    setIsCartOpen(false);
    navigate('/menu');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#24131F]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#FFF9F5] text-[#24131F] shadow-2xl flex flex-col justify-between h-full border-l border-[#24131F]/10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#24131F]/10 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-serif uppercase tracking-wider text-[#24131F]">
                Your Cart
              </h2>
              <span className="text-xs font-mono font-medium text-[#78636D]">
                ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#78636D] hover:text-[#24131F] transition-colors rounded-sm"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List / Empty state */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[#24131F]/8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#F6EDE8] flex items-center justify-center text-[#78636D] mb-5">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#24131F]">
                  YOUR CART IS EMPTY
                </h3>
                <p className="text-xs text-[#78636D] mt-2 max-w-xs">
                  Something fresh is waiting. Explore our sugarcane and cold-pressed drinks freshly made in Kollam.
                </p>
                <button
                  type="button"
                  onClick={handleExploreMenu}
                  className="mt-6 px-6 py-2.5 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Item Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-[#24131F]/5 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#24131F] font-medium leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#78636D] hover:text-[#E86A78] p-0.5 transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#78636D] mt-0.5 space-x-1">
                        <span className="font-medium text-[#24131F]">{item.size.name}</span>
                        {item.addOns.length > 0 && (
                          <span>· {item.addOns.join(', ')}</span>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#24131F]/15 rounded-xs bg-[#FFF9F5]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#F6EDE8] text-[#24131F] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-[#24131F]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#F6EDE8] text-[#24131F] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-serif font-bold text-[#E86A78] tabular-nums">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#F6EDE8] border-t border-[#24131F]/10 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#78636D]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-mono font-medium text-[#24131F]">
                    ₹{subtotal}
                  </span>
                </div>

                {orderType === 'delivery' ? (
                  <div className="flex justify-between text-[#78636D]">
                    <span>Delivery Charge (Kollam)</span>
                    <span className="tabular-nums font-mono font-medium text-[#24131F]">
                      ₹{deliveryCharge}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[#78636D]">
                    <span>Service ({orderType})</span>
                    <span className="tabular-nums font-mono font-medium text-[#B8C98A]">
                      Free
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base font-serif font-bold text-[#24131F] pt-2 border-t border-[#24131F]/10">
                  <span>Total</span>
                  <span className="tabular-nums text-[#E86A78]">
                    ₹{total}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-xs text-[#78636D] hover:text-[#24131F] uppercase tracking-wider font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
