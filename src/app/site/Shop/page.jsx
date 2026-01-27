'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Package, Sparkles, ArrowUpRight } from 'lucide-react';
import api from '@/lib/api';
import { CategoryIcon } from '../../../../components/CategoryIcons';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState([
    { id: 'All', label: 'All', icon: 'grid', isSpecial: true },
    { id: 'Others', label: 'Others', icon: 'compass', isSpecial: true },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Get dynamic category names (excluding All and Others)
  const getDynamicCategoryNames = () => {
    return categories
      .filter((c) => !c.isSpecial)
      .map((c) => c.label.toLowerCase());
  };

  // Filter products based on active category
  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      return products;
    }

    if (activeCategory === 'Others') {
      const dynamicNames = getDynamicCategoryNames();
      return products.filter((product) => {
        const productCategory = product.category?.toLowerCase() || '';
        return !dynamicNames.includes(productCategory);
      });
    }

    // Filter by selected category name (case-insensitive)
    return products.filter(
      (product) => product.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  };

  // Get count for a specific category
  const getCategoryCount = (category) => {
    if (category.id === 'All') return products.length;

    if (category.id === 'Others') {
      const dynamicNames = getDynamicCategoryNames();
      return products.filter((product) => {
        const productCategory = product.category?.toLowerCase() || '';
        return !dynamicNames.includes(productCategory);
      }).length;
    }

    return products.filter(
      (p) => p.category?.toLowerCase() === category.label.toLowerCase()
    ).length;
  };

  const filteredProducts = getFilteredProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and categories in parallel
        const [prodRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/product-categories').catch(() => ({ data: [] })),
        ]);

        const productsData = prodRes.data;
        setProducts(productsData);

        // Build categories array: All + dynamic categories + Others
        const dynamicCategories = (categoriesRes.data || []).map((cat) => ({
          id: cat.name,
          label: cat.name,
          icon: cat.icon || 'box',
          isSpecial: false,
        }));

        const finalCategories = [
          { id: 'All', label: 'All', icon: 'grid', isSpecial: true },
          ...dynamicCategories,
          { id: 'Others', label: 'Others', icon: 'compass', isSpecial: true },
        ];

        setCategories(finalCategories);
      } catch (err) {
        console.error('Error loading shop:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
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
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
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

            {/* Category Tabs — horizontal scroll on mobile, wrap on desktop */}
            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
              <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 w-max sm:w-auto mx-auto">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                      activeCategory === category.id
                        ? 'bg-[#1E3A5F] text-white shadow-lg shadow-[#1E3A5F]/20'
                        : 'bg-white text-[#4A5158] border border-[#E8E3DA] hover:border-[#1E3A5F]/30 hover:bg-white/80'
                    }`}
                  >
                    <CategoryIcon iconId={category.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{category.label}</span>

                    {/* Count Badge */}
                    <span
                      className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md transition-colors duration-300 ${
                        activeCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-[#E8E3DA] text-[#6B7280]'
                      }`}
                    >
                      {getCategoryCount(category)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Active Category */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#2D3339]">
                {activeCategory === 'All' ? 'All Products' : `${activeCategory} Products`}
              </h2>
              <p className="text-[#6B7280] mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          </div>

          {currentProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Package className="w-16 h-16 text-[#D4CEC3] mx-auto mb-4" />
              <h3 className="text-xl font-display text-[#4A5158]">
                No {activeCategory === 'All' ? '' : activeCategory + ' '}products found
              </h3>
              <p className="text-[#6B7280] mt-2">
                {activeCategory === 'All'
                  ? 'Check back soon for new products'
                  : 'Try selecting a different category'}
              </p>
              {activeCategory !== 'All' && (
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white text-sm font-medium rounded-xl hover:bg-[#2A4A73] transition-colors duration-300"
                >
                  View All Products
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`products-${activeCategory}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E3DA]/50 shadow-sm hover:shadow-md hover:border-[#E8E3DA] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-36 md:w-44 lg:w-52 h-48 sm:h-auto sm:min-h-[8rem] flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#F5F3F0] to-[#EBE7E0]">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col sm:flex-row flex-1 min-w-0">
                      {/* Middle: name + description */}
                      <div className="flex-1 min-w-0 px-4 py-4 sm:px-5 sm:py-5 flex flex-col justify-center">
                        {/* Category */}
                        {product.category && (
                          <span className="inline-flex self-start px-2 py-0.5 text-[10px] font-semibold text-[#C9A962] bg-[#C9A962]/8 rounded-full uppercase tracking-widest mb-1.5">
                            {product.category}
                          </span>
                        )}

                        {/* Product Name — prominent, dark, bold */}
                        <h3 className="text-[#1E3A5F] text-lg sm:text-xl font-extrabold leading-snug group-hover:text-[#2A4A73] transition-colors duration-300">
                          {product.name}
                        </h3>

                        {/* Description — lighter, clearly subordinate */}
                        {product.description && (
                          <p className="text-[#9CA3AF] text-sm sm:text-[15px] leading-relaxed mt-1.5 line-clamp-2 sm:line-clamp-3">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Right: price + button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 px-4 pb-4 sm:px-5 sm:py-5 sm:pl-0 flex-shrink-0 sm:min-w-[9rem]">
                        {/* Price */}
                        <div className="flex items-baseline">
                          <span className="text-xl sm:text-2xl font-bold text-[#1E3A5F] tracking-tight">
                            {Number(product.price).toLocaleString()}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#C9A962] ml-0.5">$</span>
                        </div>

                        {/* Details Button */}
                        <a
                          href={getAffiliateUrl(product.affiliateUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E3A5F] hover:bg-[#2A4A73] rounded-lg transition-all duration-300 whitespace-nowrap"
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </div>
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
          {filteredProducts.length > 0 && (
            <p className="text-center text-sm text-[#6B7280] mt-6">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
