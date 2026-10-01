import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductSize } from '../types';

export const ProductModal: React.FC = () => {
  const { modalProduct, closeProductModal, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (modalProduct) {
      setSelectedSize(modalProduct.sizes[0] || null);
      setSelectedAddOns([]);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [modalProduct]);

  if (!modalProduct) return null;

  const handleAddOnToggle = (addOnName: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnName) ? prev.filter((a) => a !== addOnName) : [...prev, addOnName]
    );
  };

  const currentPrice = selectedSize ? selectedSize.price * quantity : 0;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(modalProduct, selectedSize, selectedAddOns, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeProductModal();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#24131F]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FFF9F5] text-[#24131F] rounded-xl overflow-hidden shadow-2xl border border-[#24131F]/10 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-3 right-3 z-10 p-2 bg-[#24131F]/80 text-[#FFF9F5] hover:bg-[#24131F] rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative bg-[#24131F]/5 overflow-hidden">
          <img
            src={modalProduct.image}
            alt={modalProduct.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {modalProduct.accentNote && (
            <div className="absolute top-4 left-4 bg-[#24131F] text-[#FFF9F5] text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">
              {modalProduct.accentNote}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#78636D] font-semibold">
                {modalProduct.categoryName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#24131F] mt-1">
                {modalProduct.name}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#78636D] leading-relaxed">
              {modalProduct.description}
            </p>

            {/* Ingredients list if present */}
            {modalProduct.ingredients && modalProduct.ingredients.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#24131F] font-semibold block mb-1">
                  Ingredients:
                </span>
                <p className="text-xs text-[#78636D]">
                  {modalProduct.ingredients.join(' · ')}
                </p>
              </div>
            )}

            {/* Size Variants */}
            <div className="pt-3 border-t border-[#24131F]/10">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#24131F] block mb-2">
                Select Size:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {modalProduct.sizes.map((size) => (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-left border rounded-md transition-all flex flex-col justify-between ${
                      selectedSize?.name === size.name
                        ? 'border-[#E86A78] bg-[#F6EDE8] text-[#24131F]'
                        : 'border-[#24131F]/15 hover:border-[#24131F]/40 text-[#78636D]'
                    }`}
                  >
                    <span className="text-xs font-semibold">{size.name}</span>
                    <span className="text-sm font-serif font-bold text-[#E86A78] tabular-nums mt-0.5">
                      ₹{size.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Add-Ons (e.g. Lemon, Ginger, Mint) */}
            {modalProduct.addOns && modalProduct.addOns.length > 0 && (
              <div className="pt-3 border-t border-[#24131F]/10">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#24131F] block mb-2">
                  Complimentary Add-ons:
                </label>
                <div className="flex flex-wrap gap-2">
                  {modalProduct.addOns.map((addOn) => {
                    const isChecked = selectedAddOns.includes(addOn.name);
                    return (
                      <button
                        key={addOn.id}
                        type="button"
                        onClick={() => handleAddOnToggle(addOn.name)}
                        className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-[#24131F] text-[#FFF9F5] border-[#24131F]'
                            : 'bg-[#FFF9F5] text-[#78636D] border-[#24131F]/20 hover:border-[#24131F]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-[#B8C98A]" />}
                        <span>{addOn.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart Bottom Bar */}
          <div className="pt-6 border-t border-[#24131F]/10 mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#78636D]">
                Quantity
              </span>
              <div className="flex items-center border border-[#24131F]/20 rounded-md bg-[#FFF9F5]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-[#F6EDE8] text-[#24131F] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums text-[#24131F]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-[#F6EDE8] text-[#24131F] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={!selectedSize}
              onClick={handleAddToCart}
              className={`w-full py-3 px-5 text-xs uppercase tracking-widest font-semibold transition-all duration-200 rounded-sm flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-[#B8C98A] text-[#24131F]'
                  : 'bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart ✓</span>
                </>
              ) : (
                <>
                  <span>Add to Cart</span>
                  <span className="opacity-50">·</span>
                  <span className="tabular-nums font-mono text-sm font-bold">
                    ₹{currentPrice}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
