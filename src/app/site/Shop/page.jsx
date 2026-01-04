'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Package, Sparkles } from 'lucide-react';
import api from '@/lib/api';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await api.get('/products');
        const productsData = prodRes.data;
        setProducts(productsData);

        const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.error("Error loading shop:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  // Ensure URL has protocol
  const getAffiliateUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1E3A5F]/20 border-t-[#1E3A5F] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#1E3A5F] font-medium">Loading Products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-islamic opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/5 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#C9A962]" />
              <span className="text-sm font-medium text-[#1E3A5F]">Curated Collection</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#2D3339] mb-4">
              Sacred <span className="text-[#C9A962]">Essentials</span>
            </h1>

            {/* Gold Accent Line */}
            <div className="w-20 h-1 bg-gradient-to-r from-[#C9A962] to-[#D4BC82] mx-auto rounded-full mb-6" />

            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-10">
              Discover our handpicked selection of premium products for your spiritual journey.
              Quality essentials to accompany your pilgrimage.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#1E3A5F] text-white shadow-lg shadow-[#1E3A5F]/20'
                      : 'bg-white text-[#4A5158] border border-[#E8E3DA] hover:border-[#1E3A5F]/30 hover:bg-white/80'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {currentProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Package className="w-16 h-16 text-[#D4CEC3] mx-auto mb-4" />
              <h3 className="text-xl font-display text-[#4A5158]">No products found</h3>
              <p className="text-[#6B7280] mt-2">Try selecting a different category</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E3DA]/50 shadow-sm hover:shadow-xl hover:shadow-[#1E3A5F]/5 transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-[#F5F3F0]">
                    {/* Discount Badge */}
{/*                    
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center px-3 py-1 bg-[#C9A962] text-white text-xs font-semibold rounded-full shadow-lg">
                        10% OFF
                      </span>
                    </div>
*/}
                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer">
                        <Star className="w-4 h-4 text-[#C9A962]" />
                      </div>
                    </div>

                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    {product.category && (
                      <span className="text-xs font-medium text-[#C9A962] uppercase tracking-wider">
                        {product.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-[#2D3339] font-display text-lg font-medium mt-1 mb-2 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < 4 ? 'text-[#C9A962] fill-[#C9A962]' : 'text-[#E8E3DA] fill-[#E8E3DA]'}`}
                        />
                      ))}
                      <span className="text-xs text-[#6B7280] ml-1">(23)</span>
                    </div>

                    {/* Price & Cart */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E3DA]/50">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-semibold text-[#1E3A5F]">
                          ৳{product.price}
                        </span>
                        <span className="text-sm text-[#6B7280] line-through">
                          ৳{product.price + 100}
                        </span>
                      </div>

                      <a
                        href={getAffiliateUrl(product.affiliateUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#1E3A5F] text-white rounded-xl flex items-center justify-center hover:bg-[#2A4A73] transition-colors duration-300 shadow-md hover:shadow-lg"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mt-16"
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-10 h-10 rounded-xl border border-[#E8E3DA] flex items-center justify-center text-[#4A5158] hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#4A5158] disabled:hover:border-[#E8E3DA] transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'bg-[#1E3A5F] text-white shadow-lg shadow-[#1E3A5F]/20'
                        : 'text-[#4A5158] hover:bg-[#E8E3DA]/50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-10 h-10 rounded-xl border border-[#E8E3DA] flex items-center justify-center text-[#4A5158] hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#4A5158] disabled:hover:border-[#E8E3DA] transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Results Count */}
          <p className="text-center text-sm text-[#6B7280] mt-6">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
