'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Home, AlertCircle, MessageSquare } from 'lucide-react';
import { useOrderStore } from '@/lib/store';
import { formatPrice, formatDate } from '@/lib/utils';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';

export default function OrderTrackingPage() {
  const params = useParams();
  const { getOrderById, updateOrderStatus } = useOrderStore();
  const order = getOrderById(params.id as string);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
    { status: 'processing', label: 'Processing', icon: Package },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: Home },
  ];

  const currentStepIndex = statusSteps.findIndex((step) => step.status === order.status);

  const simulateNextStatus = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < statusSteps.length) {
      updateOrderStatus(order.id, statusSteps[nextIndex].status as any);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      case 'shipped':
      case 'out-for-delivery':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Order Details</h1>
              <p className="text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <Badge variant={getStatusColor(order.status)} className="text-lg px-4 py-2">
              {order.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Timeline */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>

                {order.trackingNumber && (
                  <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="text-lg font-mono font-bold text-primary-600">{order.trackingNumber}</p>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-gray-600 mt-2">
                        Estimated Delivery: {formatDate(order.estimatedDelivery)}
                      </p>
                    )}
                  </div>
                )}

                {/* Progress Steps */}
                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const isComplete = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={step.status}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        {/* Icon */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isComplete
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          } ${isCurrent && 'ring-4 ring-green-200'}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <h3 className={`font-semibold text-lg ${isComplete ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </h3>
                          {isComplete && (
                            <p className="text-sm text-gray-600 mt-1">
                              {formatDate(order.updatedAt)}
                            </p>
                          )}
                        </div>

                        {/* Line */}
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`absolute left-6 top-12 w-0.5 h-16 ${
                              isComplete ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                            style={{ marginTop: '3rem' }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Simulate Button (for demo) */}
                {currentStepIndex < statusSteps.length - 1 && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-3">
                      <strong>Demo Mode:</strong> Simulate order progression
                    </p>
                    <Button onClick={simulateNextStatus} size="sm">
                      Move to Next Status
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Order Items */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 pb-4 border-b last:border-0"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Size: {item.selectedSize} | Color: {item.selectedColor}
                        </p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">{formatPrice(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">{formatPrice(order.tax)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="pt-2">{order.shippingAddress.phone}</p>
                  <p>{order.shippingAddress.email}</p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <div className="p-6 space-y-3">
                <Button className="w-full gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact Support
                </Button>
                {order.status === 'delivered' && (
                  <>
                    <Button variant="outline" className="w-full">
                      Confirm Receipt
                    </Button>
                    <Button variant="outline" className="w-full">
                      Report Issue
                    </Button>
                  </>
                )}
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
