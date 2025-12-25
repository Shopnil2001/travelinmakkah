'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import api from '@/lib/api';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/products/categories') // Create an API route that calls getUniqueProductCategories
        ]);
        setProducts(prodRes.data);
        setCategories(['All', ...catRes.data]);
      } catch (err) {
        console.error("Error loading shop:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1); // Reset to page 1 on filter
  };

  if (loading) return <div className="p-20 text-center font-serif text-emerald-700">Loading Shop...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-serif text-[#2d4f43] mb-6">Featured Product</h1>
        
        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat 
                ? 'bg-[#00a651] text-white border-[#00a651]' 
                : 'bg-zinc-50 text-gray-600 border-gray-100 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div key={product._id} className="group relative bg-white rounded-3xl p-4 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Image & Discount Badge */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-4 bg-zinc-100">
                <div className="absolute top-3 left-3 z-10 bg-[#00a651] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  10% off
                </div>
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Price & Rating Row */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#00a651] font-bold">৳ {product.price}</span>
                  <span className="text-gray-300 text-xs line-through">৳ {product.price + 100}</span>
                </div>
                <div className="flex items-center gap-1 text-[#f1c40f]">
                  <Star size={12} fill="currentColor" />
                  <span className="text-gray-400 text-[10px] font-medium">(23)</span>
                </div>
              </div>

              {/* Title & Cart */}
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-[#2d4f43] text-sm font-medium leading-tight h-10 overflow-hidden">
                  {product.name}
                </h3>
                <a 
                  href={product.affiliateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-50 text-[#00a651] rounded-lg hover:bg-[#00a651] hover:text-white transition-colors"
                >
                  <ShoppingCart size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-16">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border rounded-xl disabled:opacity-30"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === i + 1 
                  ? 'bg-[#00a651] text-white' 
                  : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 border rounded-xl disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;