'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Building2, Smartphone, Banknote, Check, Loader2, AlertCircle } from 'lucide-react';
import { PaymentMethod } from '@/types';
import { formatPrice } from '@/lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: (paymentMethod: PaymentMethod) => void;
}

export default function PaymentModal({ isOpen, onClose, amount, onPaymentSuccess }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Debit/Credit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, Verve',
    },
    {
      id: 'bank-transfer' as PaymentMethod,
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank transfer',
    },
    {
      id: 'ussd' as PaymentMethod,
      name: 'USSD',
      icon: Smartphone,
      description: 'Dial *737# to pay',
    },
    {
      id: 'pay-on-delivery' as PaymentMethod,
      name: 'Pay on Delivery',
      icon: Banknote,
      description: 'Cash payment at delivery',
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    setIsError(false);

    // Simulate payment processing
    setTimeout(() => {
      // Randomly simulate success/failure for demo (95% success rate)
      const isSuccessful = Math.random() > 0.05;

      if (isSuccessful) {
        setIsSuccess(true);
        setTimeout(() => {
          onPaymentSuccess(selectedMethod);
          handleClose();
        }, 2000);
      } else {
        setIsError(true);
        setIsProcessing(false);
      }
    }, 3000);
  };

  const handleClose = () => {
    setIsProcessing(false);
    setIsSuccess(false);
    setIsError(false);
    setSelectedMethod('card');
    setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Success State */}
              {isSuccess && (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4"
                  >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Your order has been confirmed</p>
                </div>
              )}

              {/* Payment Form */}
              {!isSuccess && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
                      <p className="text-sm text-gray-500 mt-1">Total: {formatPrice(amount)}</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="p-6 space-y-3">
                    <p className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</p>
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition ${
                            selectedMethod === method.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            selectedMethod === method.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                          {selectedMethod === method.id && (
                            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Card Details Form */}
                  {selectedMethod === 'card' && (
                    <div className="px-6 pb-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          maxLength={19}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            maxLength={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* USSD Instructions */}
                  {selectedMethod === 'ussd' && (
                    <div className="px-6 pb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-blue-900 mb-2">Dial: *737*000#</p>
                        <p className="text-xs text-blue-700">
                          Follow the prompts to complete your payment. Your order will be confirmed automatically.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Instructions */}
                  {selectedMethod === 'bank-transfer' && (
                    <div className="px-6 pb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium text-blue-900">Bank Details:</p>
                        <p className="text-xs text-blue-700">Bank: KidsFashion Bank</p>
                        <p className="text-xs text-blue-700">Account: 0123456789</p>
                        <p className="text-xs text-blue-700">Amount: {formatPrice(amount)}</p>
                      </div>
                    </div>
                  )}

                  {/* Pay on Delivery Info */}
                  {selectedMethod === 'pay-on-delivery' && (
                    <div className="px-6 pb-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-yellow-900 mb-2">Pay with Cash</p>
                        <p className="text-xs text-yellow-700">
                          Pay {formatPrice(amount)} in cash when your order is delivered. Please have exact amount ready.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {isError && (
                    <div className="px-6 pb-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900">Payment Failed</p>
                          <p className="text-xs text-red-700 mt-1">
                            Please check your details and try again.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-primary-600 text-white py-4 rounded-xl font-medium hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Pay {formatPrice(amount)}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security Badge */}
                  <div className="px-6 pb-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Secured by KidsFashion Payment Gateway</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
