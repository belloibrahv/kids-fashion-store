'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Gift, ShoppingBag, Truck, RotateCcw, Star, CreditCard } from 'lucide-react';
import ProductCard from '@/components/product-card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import { getFeaturedProducts, getNewArrivals, getOnSaleProducts } from '@/data/products';
import { promotions } from '@/data/promotions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);
  const saleProducts = getOnSaleProducts().slice(0, 4);
  const christmasPromo = promotions.find(p => p.title.includes('Christmas'));

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="success" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                New Collection 2024
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Dress Your Little Ones in{' '}
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Style & Comfort
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover our enchanting collection of kids' clothing, shoes, and accessories.
                Quality meets affordability for your precious ones!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                  </Button>
                </Link>
                <Link href="/products?filter=sale">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Gift className="w-5 h-5" />
                    View Deals
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 md:h-[500px]">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-0 right-0 w-72 h-72 bg-primary-300 rounded-full opacity-30 blur-3xl"
                />
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-300 rounded-full opacity-30 blur-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 text-4xl opacity-20"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 left-20 text-5xl opacity-20"
        >
          🎈
        </motion.div>
      </section>

      {/* Christmas Promotion Banner */}
      {christmasPromo && (
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="py-12 bg-gradient-to-r from-red-600 to-green-600 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">{christmasPromo.title}</h2>
            <p className="text-xl mb-6">{christmasPromo.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="warning" className="text-lg px-6 py-2">
                Code: {christmasPromo.code}
              </Badge>
              <Link href="/products?filter=sale">
                <Button size="lg" variant="outline" className="bg-white text-red-600 hover:bg-red-50">
                  Shop Christmas Sale
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { Icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { Icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { Icon: Star, title: 'Top Quality', desc: 'Premium materials' },
              { Icon: CreditCard, title: 'Secure Payment', desc: 'Safe & encrypted' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="mb-3 flex justify-center">
                  <feature.Icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="primary" className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1 inline" />
              Featured
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Handpicked for Your Little Stars</h2>
            <p className="text-xl text-gray-600">Our most loved items, carefully selected for quality and style</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link href="/products?filter=featured">
              <Button size="lg" variant="outline">
                View All Featured Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="success" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              Just Arrived
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Fresh Off the Rack</h2>
            <p className="text-xl text-gray-600">Be the first to discover our latest arrivals</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {newArrivals.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link href="/products?filter=new">
              <Button size="lg">
                Explore New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="danger" className="mb-4">
              <Gift className="w-3 h-3 mr-1 inline" />
              Hot Deals
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Don't Miss Out on These Deals!</h2>
            <p className="text-xl text-gray-600">Amazing savings on quality kids' clothing</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {saleProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link href="/products?filter=sale">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Shop All Sale Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Fashion Family!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to get exclusive deals, early access to sales, and styling tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
