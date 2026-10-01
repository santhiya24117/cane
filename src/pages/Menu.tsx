import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, Sparkles } from 'lucide-react';

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') as ProductCategory | null;

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(
    categoryFromUrl && CATEGORIES.some((c) => c.id === categoryFromUrl)
      ? categoryFromUrl
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (categoryFromUrl && CATEGORIES.some((c) => c.id === categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const handleCategoryChange = (category: ProductCategory | 'all') => {
    setActiveCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.ingredients && product.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6EDE8] text-[#24131F] pt-28 sm:pt-36 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10 text-center sm:text-left">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E86A78]">
          Pure & Botanical
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif uppercase tracking-tight text-[#24131F] mt-1">
          The Menu
        </h1>
        <p className="text-sm text-[#78636D] mt-2 font-light max-w-xl">
          Freshly made. Naturally refreshing. Every single glass is freshly crushed and cold-pressed on order.
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-md relative">
          <Search className="w-4 h-4 text-[#78636D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by beverage, fruit, or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9F5] border border-[#24131F]/15 rounded-md text-xs placeholder:text-[#78636D]/60 focus:outline-hidden focus:border-[#E86A78] transition-colors"
          />
        </div>
      </div>

      {/* Sticky Category Navigation */}
      <div className="sticky top-16 z-20 bg-[#F6EDE8]/95 backdrop-blur-md border-y border-[#24131F]/10 py-3 mb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap py-1">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-all shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#E86A78] text-[#FFF9F5]'
                  : 'bg-[#FFF9F5] text-[#24131F] hover:bg-[#FFF9F5]/80 border border-[#24131F]/10'
              }`}
            >
              All Items ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-all shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-[#E86A78] text-[#FFF9F5]'
                      : 'bg-[#FFF9F5] text-[#24131F] hover:bg-[#FFF9F5]/80 border border-[#24131F]/10'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#FFF9F5] rounded-xl border border-[#24131F]/10 p-8">
            <Sparkles className="w-8 h-8 text-[#78636D] mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#24131F]">No drinks found</h3>
            <p className="text-xs text-[#78636D] mt-2">
              Try adjusting your search query or select another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-5 px-5 py-2 bg-[#24131F] text-[#FFF9F5] text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#E86A78] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="light" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
