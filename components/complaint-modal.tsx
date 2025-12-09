'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, PackageX, Clock, ShoppingBag, Box, HelpCircle, Send, CheckCircle } from 'lucide-react';
import { ComplaintType } from '@/types';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onSubmit: (type: ComplaintType, description: string) => void;
}

export default function ComplaintModal({ isOpen, onClose, orderId, onSubmit }: ComplaintModalProps) {
  const [selectedType, setSelectedType] = useState<ComplaintType>('other');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const complaintTypes = [
    {
      id: 'wrong-item' as ComplaintType,
      name: 'Wrong Item Delivered',
      icon: PackageX,
      description: 'Received a different product than ordered',
    },
    {
      id: 'damaged-item' as ComplaintType,
      name: 'Damaged Item',
      icon: AlertTriangle,
      description: 'Product arrived damaged or defective',
    },
    {
      id: 'late-delivery' as ComplaintType,
      name: 'Late Delivery',
      icon: Clock,
      description: 'Order delivered after expected date',
    },
    {
      id: 'quality-issue' as ComplaintType,
      name: 'Quality Issue',
      icon: ShoppingBag,
      description: 'Product quality doesn\'t match description',
    },
    {
      id: 'missing-item' as ComplaintType,
      name: 'Missing Item',
      icon: Box,
      description: 'Some items are missing from the order',
    },
    {
      id: 'other' as ComplaintType,
      name: 'Other Issue',
      icon: HelpCircle,
      description: 'Other problem with the order',
    },
  ];

  const handleSubmit = () => {
    if (!description.trim()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmit(selectedType, description);

      // Close modal after showing success
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setSelectedType('other');
    setDescription('');
    setIsSubmitting(false);
    setIsSuccess(false);
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
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                    <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h3>
                  <p className="text-gray-600">Our team will review your complaint and get back to you within 24 hours.</p>
                </div>
              )}

              {/* Complaint Form */}
              {!isSuccess && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Report an Issue</h2>
                      <p className="text-sm text-gray-500 mt-1">Order #{orderId.slice(-8).toUpperCase()}</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Complaint Types */}
                  <div className="p-6">
                    <p className="text-sm font-medium text-gray-700 mb-4">What's the issue?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {complaintTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 transition text-left ${
                              selectedType === type.id
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg flex-shrink-0 ${
                                selectedType === type.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm">{type.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
                            </div>
                            {selectedType === type.id && (
                              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-6 pb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe the issue in detail *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide as much detail as possible. Include product names, sizes, colors, and any other relevant information..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">Minimum 20 characters ({description.length}/20)</p>
                  </div>

                  {/* Info Box */}
                  <div className="px-6 pb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">What happens next?</p>
                        <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc list-inside">
                          <li>Our support team will review your complaint</li>
                          <li>We'll contact you within 24 hours</li>
                          <li>Solutions may include replacement, refund, or compensation</li>
                          <li>Track complaint status in your order details</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || description.length < 20}
                      className="w-full bg-red-600 text-white py-4 rounded-xl font-medium hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting Complaint...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Complaint
                        </>
                      )}
                    </button>
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
