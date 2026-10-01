import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  variant?: 'light' | 'dark';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'light' }) => {
  const { addToCart, openProductModal } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const selectedSize: ProductSize = product.sizes[selectedSizeIndex] || product.sizes[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If product has add-ons (like Natural Cane with Lemon/Ginger/Mint), open modal for customisation
    if (product.addOns && product.addOns.length > 0) {
      openProductModal(product);
      return;
    }

    addToCart(product, selectedSize, [], 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const isDark = variant === 'dark';

  return (
    <div
      onClick={() => openProductModal(product)}
      className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between border ${
        isDark
          ? 'bg-[#38202F] border-[#FFF9F5]/10 text-[#FFF9F5] hover:border-[#E86A78]/50'
          : 'bg-[#FFF9F5] border-[#24131F]/8 text-[#24131F] hover:border-[#24131F]/20'
      }`}
    >
      {/* Image Container with 4:3 Aspect Ratio & Subtle Zoom on Hover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#24131F]/5">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Quiet unboxed text tag (no pill badges!) */}
        {product.accentNote && (
          <div className="absolute top-3 left-3 bg-[#24131F]/80 backdrop-blur-xs text-[#FFF9F5] text-[10px] tracking-wider uppercase px-2.5 py-1 font-medium">
            {product.accentNote}
          </div>
        )}

        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-1 bg-[#24131F]/90 text-[#FFF9F5] backdrop-blur-xs rounded-sm">
            Customize
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          {/* Unboxed category label */}
          <div className="text-[11px] tracking-widest uppercase font-semibold text-[#78636D] mb-1">
            {product.categoryName}
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug group-hover:text-[#E86A78] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#78636D] line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Size Selection */}
        <div className="pt-2 border-t border-[#24131F]/6 flex flex-col gap-3">
          {/* Size segmented selector if more than 1 size */}
          {product.sizes.length > 1 && (
            <div
              className="flex items-center gap-1.5 p-1 bg-[#F6EDE8]/60 rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              {product.sizes.map((size, idx) => (
                <button
                  key={size.name}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`flex-1 text-center py-1 text-[11px] font-medium tracking-wider uppercase rounded-xs transition-all ${
                    selectedSizeIndex === idx
                      ? 'bg-[#24131F] text-[#FFF9F5]'
                      : 'text-[#78636D] hover:text-[#24131F]'
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          )}

          {/* Price display and Action Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-medium text-[#78636D]">
                {selectedSize.name}
              </span>
              <span className="text-lg font-serif font-bold text-[#E86A78] tabular-nums">
                ₹{selectedSize.price}
              </span>
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-sm ${
                isAdded
                  ? 'bg-[#B8C98A] text-[#24131F]'
                  : 'bg-[#24131F] text-[#FFF9F5] hover:bg-[#E86A78]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
