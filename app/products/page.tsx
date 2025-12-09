'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product-card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import { products } from '@/data/products';
import { Category, AgeGroup, Gender, Color } from '@/types';

function ProductsContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const gender = searchParams.get('gender');
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([]);
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>(
    (gender as Gender) || 'all'
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'newest'>('popular');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply quick filter
    if (filter === 'new') {
      filtered = filtered.filter(p => p.newArrival);
    } else if (filter === 'sale') {
      filtered = filtered.filter(p => p.onSale);
    } else if (filter === 'featured') {
      filtered = filtered.filter(p => p.featured);
    }

    // Gender filter
    if (selectedGender !== 'all') {
      filtered = filtered.filter(p => p.gender === selectedGender || p.gender === 'unisex');
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Age group filter
    if (selectedAgeGroups.length > 0) {
      filtered = filtered.filter(p => selectedAgeGroups.includes(p.ageGroup));
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    const seen = new Set<string>();
    filtered = filtered.filter((p) => {
      const key = (p.images && p.images[0] ? p.images[0] : p.name).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return filtered;
  }, [filter, selectedGender, selectedCategories, selectedAgeGroups, selectedColors, priceRange, sortBy]);

  const categories: Category[] = ['dresses', 'tops', 'bottoms', 'outerwear', 'sets', 'sleepwear', 'activewear', 'shoes', 'accessories'];
  const ageGroups: AgeGroup[] = ['newborn', 'infant', 'toddler', 'preschool', 'kids', 'tween'];
  const colors: Color[] = ['red', 'pink', 'blue', 'navy', 'green', 'yellow', 'purple', 'orange', 'white', 'black', 'gray', 'multicolor'];

  const toggleCategory = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleAgeGroup = (age: AgeGroup) => {
    setSelectedAgeGroups(prev =>
      prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]
    );
  };

  const toggleColor = (color: Color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAgeGroups([]);
    setSelectedColors([]);
    setSelectedGender('all');
    setPriceRange([0, 100000]);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {filter === 'new' ? 'New Arrivals' : 
             filter === 'sale' ? 'Sale Items' :
             filter === 'featured' ? 'Featured Products' :
             selectedGender === 'boys' ? "Boys' Clothing" :
             selectedGender === 'girls' ? "Girls' Clothing" :
             'All Products'}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Clear All
                </button>
              </div>

              {/* Gender */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Gender</h3>
                <div className="space-y-2">
                  {(['all', 'girls', 'boys', 'unisex'] as const).map((g) => (
                    <label key={g} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedGender === g}
                        onChange={() => setSelectedGender(g)}
                        className="mr-2"
                      />
                      <span className="capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="mr-2"
                      />
                      <span className="capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Age Group</h3>
                <div className="space-y-2">
                  {ageGroups.map((age) => (
                    <label key={age} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAgeGroups.includes(age)}
                        onChange={() => toggleAgeGroup(age)}
                        className="mr-2"
                      />
                      <span className="capitalize">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColors.includes(color) ? 'border-primary-500 scale-110' : 'border-gray-300'
                      }`}
                      style={{
                        backgroundColor: color === 'multicolor' ? 'linear-gradient(45deg, red, blue)' : color,
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₦{priceRange[0].toLocaleString()}</span>
                  <span>₦{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedAgeGroups.length > 0 || selectedColors.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(cat => (
                  <Badge key={cat} variant="primary" className="gap-1">
                    {cat}
                    <button onClick={() => toggleCategory(cat)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {selectedAgeGroups.map(age => (
                  <Badge key={age} variant="secondary" className="gap-1">
                    {age}
                    <button onClick={() => toggleAgeGroup(age)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {selectedColors.map(color => (
                  <Badge key={color} variant="success" className="gap-1">
                    {color}
                    <button onClick={() => toggleColor(color)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl text-gray-600 mb-4">No products found</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
