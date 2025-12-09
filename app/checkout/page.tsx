'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import { useCartStore, useOrderStore } from '@/lib/store';
import { formatPrice, generateOrderId, generateTrackingNumber, getEstimatedDeliveryDate } from '@/lib/utils';
import { ShippingAddress } from '@/types';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Card from '@/components/ui/card';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const total = getCartTotal();
  const shipping = total > 50 ? 0 : 5.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const order = {
      id: generateOrderId(),
      items,
      subtotal: total,
      shipping,
      tax,
      total: grandTotal,
      shippingAddress,
      status: 'confirmed' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      trackingNumber: generateTrackingNumber(),
      estimatedDelivery: getEstimatedDeliveryDate(5),
    };

    addOrder(order);
    clearCart();
    
    router.push(`/orders/${order.id}`);
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    />
                    <Input
                      label="Street Address"
                      required
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="md:col-span-2"
                    />
                    <Input
                      label="City"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    />
                    <Input
                      label="State"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    />
                    <Input
                      label="ZIP Code"
                      required
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                    />
                    <Input
                      label="Country"
                      required
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    />
                  </div>
                </div>
              </Card>

              {/* Payment */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-6 h-6 text-primary-500" />
                    <h2 className="text-2xl font-bold">Payment Information</h2>
                    <Lock className="w-4 h-4 text-gray-400 ml-auto" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      required
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      className="md:col-span-2"
                    />
                    <Input
                      label="Cardholder Name"
                      required
                      value={cardDetails.cardName}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                      className="md:col-span-2"
                    />
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      required
                      value={cardDetails.expiryDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      required
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  {/* Items */}
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                        className="flex gap-3"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product.name}</p>
                          <p className="text-xs text-gray-600">
                            {item.selectedSize} | {item.selectedColor}
                          </p>
                          <p className="text-sm">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 border-t pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="font-semibold">{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
