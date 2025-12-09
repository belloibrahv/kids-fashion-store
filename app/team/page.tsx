'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { teamMembers } from '@/data/team';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function TeamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = teamMembers.length - 1;
      if (nextIndex >= teamMembers.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-4">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span className="font-semibold text-primary-600">Meet Our Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            The Creative Minds Behind{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              KidsFashion
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A talented group of students passionate about creating exceptional e-commerce experiences
          </p>
        </motion.div>

        {/* Main Slider */}
        <div className="relative h-[600px] flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 0.5 },
              }}
              className="absolute w-full max-w-4xl"
            >
              <Card hover className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 to-secondary-200"
                  >
                    {currentMember.image && (
                      <Image
                        src={currentMember.image}
                        alt={currentMember.name}
                        fill
                        className="object-cover"
                      />
                    )}
                    {!currentMember.image && (
                      <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white">
                        {currentMember.name.charAt(0)}
                      </div>
                    )}
                  </motion.div>

                  {/* Info */}
                  <div className="flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        {currentMember.role}
                      </div>
                      <h2 className="text-4xl font-bold mb-4">{currentMember.name}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {currentMember.bio || 'Contributing to building an amazing e-commerce platform with cutting-edge technologies and best practices.'}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-primary-600">100%</div>
                          <div className="text-xs text-gray-600">Dedication</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-secondary-600">⭐⭐⭐⭐⭐</div>
                          <div className="text-xs text-gray-600">Skills</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-accent-600">🚀</div>
                          <div className="text-xs text-gray-600">Innovation</div>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="flex gap-2">
                        {teamMembers.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setDirection(index > currentIndex ? 1 : -1);
                              setCurrentIndex(index);
                            }}
                            className={`h-1.5 rounded-full transition-all ${
                              index === currentIndex
                                ? 'bg-primary-500 w-12'
                                : 'bg-gray-300 w-6 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* All Team Members Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">All Team Members</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, index) => (
              <motion.button
                key={member.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`text-center p-4 rounded-xl transition-all ${
                  index === currentIndex
                    ? 'bg-white shadow-lg ring-2 ring-primary-500'
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-primary-200 to-secondary-200">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  {!member.image && (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <p className="font-semibold text-sm mb-1">{member.name}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{member.role}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          🎨
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-10 text-6xl opacity-20"
        >
          💻
        </motion.div>
      </div>
    </div>
  );
}
