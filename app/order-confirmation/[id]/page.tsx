'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, MapPin, CreditCard, Calendar, Truck, ArrowRight } from 'lucide-react';
import { useOrderStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { getOrderById } = useOrderStore();
  const [order, setOrder] = useState(useOrderStore.getState().getOrderById(params.id));

  useEffect(() => {
    const currentOrder = getOrderById(params.id);
    if (!currentOrder) {
      router.push('/');
      return;
    }
    setOrder(currentOrder);
  }, [params.id, getOrderById, router]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 relative">
            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
            {/* Confetti Animation */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45 * (Math.PI / 180)) * 100,
                  y: Math.sin(i * 45 * (Math.PI / 180)) * 100,
                }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className={`absolute w-3 h-3 rounded-full ${
                  i % 4 === 0
                    ? 'bg-yellow-400'
                    : i % 4 === 1
                    ? 'bg-pink-400'
                    : i % 4 === 2
                    ? 'bg-blue-400'
                    : 'bg-green-400'
                }`}
              />
            ))}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 mb-3"
          >
            Order Confirmed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600"
          >
            Thank you for shopping with KidsFashion!
          </motion.p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Order Info Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-primary-100 text-sm mb-1">Order Number</p>
                <p className="text-2xl font-bold">#{order.id.slice(-8).toUpperCase()}</p>
              </div>
              <Package className="w-12 h-12 text-primary-200" />
            </div>
            {order.trackingNumber && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <p className="text-primary-100 text-xs mb-1">Tracking Number</p>
                <p className="text-white font-mono text-sm">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-600" />
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-primary-600 mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              Delivery Address
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
              <p className="text-sm text-gray-600 mt-2">{order.shippingAddress.street}</p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p className="text-sm text-gray-600">{order.shippingAddress.zipCode}</p>
              <p className="text-sm text-gray-600 mt-2">{order.shippingAddress.phone}</p>
              <p className="text-sm text-gray-600">{order.shippingAddress.email}</p>
            </div>
          </div>

          {/* Payment & Delivery Info */}
          <div className="p-6 border-b grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-600" />
                Payment Method
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900 capitalize">
                  {order.paymentMethod?.replace('-', ' ') || 'Card Payment'}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Payment Confirmed
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                Estimated Delivery
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900">
                  {order.estimatedDelivery
                    ? new Date(order.estimatedDelivery).toLocaleDateString('en-NG', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Within 5-7 business days'}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">{formatPrice(order.tax)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <span className="font-bold text-primary-600 text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 grid md:grid-cols-2 gap-4"
        >
          <Link
            href={`/orders/${order.id}`}
            className="flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-medium hover:bg-primary-700 transition"
          >
            <Truck className="w-5 h-5" />
            Track Order
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Email Confirmation Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to{' '}
            <span className="font-medium text-gray-900">{order.shippingAddress.email}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
