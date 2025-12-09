'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield, ChevronLeft } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCartStore } from '@/lib/store';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Size, Color } from '@/types';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const fallback =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%23f97316' offset='0'/><stop stop-color='%23ec4899' offset='1'/></linearGradient></defs><rect width='800' height='800' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='32' font-family='sans-serif'>Kids Fashion</text></svg>";
  const [mainSrc, setMainSrc] = useState<string>(product ? product.images[0] : fallback);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  useEffect(() => {
    if (product) {
      setMainSrc(product.images[selectedImage]);
    }
  }, [selectedImage, product]);


  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-6">
          <ChevronLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4"
            >
              <Image
                src={mainSrc}
                alt={product.name}
                fill
                unoptimized
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setMainSrc(fallback)}
                className="object-cover"
              />
              {product.onSale && discount > 0 && (
                <Badge variant="danger" className="absolute top-4 left-4 text-lg px-4 py-2">
                  -{discount}% OFF
                </Badge>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary-500 scale-105' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      unoptimized
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Title & Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.newArrival && <Badge variant="success">New Arrival</Badge>}
              {product.featured && <Badge variant="warning">Featured</Badge>}
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="primary">{product.ageGroup}</Badge>
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.onSale && (
                <p className="text-green-600 font-medium mt-2">Save {formatPrice(product.originalPrice! - product.price)}!</p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Select Size:</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Select Color:</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium capitalize transition-all ${
                      selectedColor === color
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize || !selectedColor}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-primary-500" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-primary-500" />
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">30-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary-500" />
                <div>
                  <p className="font-semibold text-sm">Quality Assured</p>
                  <p className="text-xs text-gray-600">Premium materials</p>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mt-6">
              {product.inStock ? (
                <p className="text-green-600 font-medium">✓ In Stock - Ships within 24 hours</p>
              ) : (
                <p className="text-red-600 font-medium">✗ Out of Stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
