'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import Badge from './ui/badge';
import Button from './ui/button';
import Card from './ui/card';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const [imgSrc, setImgSrc] = useState<string>(product.images[0]);
  useEffect(() => {
    setImgSrc(product.images[0]);
  }, [product]);

  const fallback =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%23f97316' offset='0'/><stop stop-color='%23ec4899' offset='1'/></linearGradient></defs><rect width='800' height='800' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='32' font-family='sans-serif'>Kids Fashion</text></svg>";

  return (
    <Card hover className="group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            unoptimized
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgSrc(fallback)}
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.newArrival && <Badge variant="success">New</Badge>}
            {product.onSale && discount > 0 && (
              <Badge variant="danger">-{discount}%</Badge>
            )}
            {product.featured && <Badge variant="warning">Featured</Badge>}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50"
            >
              <Heart className="w-4 h-4 text-gray-700" />
            </motion.button>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="danger" className="text-sm px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-primary-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Category & Age Group */}
        <div className="flex gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <Badge variant="primary" className="text-xs">
            {product.ageGroup}
          </Badge>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart */}
        <Link href={`/products/${product.id}`}>
          <Button
            className="w-full"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? 'View Details' : 'Out of Stock'}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
