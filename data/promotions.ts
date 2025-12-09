import { Promotion } from '@/types';

export const promotions: Promotion[] = [
  {
    id: '1',
    title: '🎄 Christmas Special - 30% OFF',
    description: 'Celebrate the season with huge savings on festive outfits! Shop holiday dresses, cozy pajamas, and winter essentials.',
    discount: 30,
    code: 'XMAS30',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200',
    validUntil: new Date('2024-12-25'),
  },
  {
    id: '2',
    title: '❄️ Winter Wardrobe Sale',
    description: 'Get your little ones ready for winter! Save big on jackets, sweaters, and cold-weather accessories.',
    discount: 25,
    code: 'WINTER25',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    validUntil: new Date('2025-02-28'),
  },
  {
    id: '3',
    title: '🎁 New Year, New Wardrobe',
    description: 'Start 2025 fresh! Extra 20% off on all new arrivals. Free shipping on orders over $50.',
    discount: 20,
    code: 'NEWYEAR20',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    validUntil: new Date('2025-01-15'),
  },
  {
    id: '4',
    title: '🌟 First Order Special',
    description: 'Welcome to our store! Enjoy 15% off your first purchase. Sign up for exclusive deals and early access to sales.',
    discount: 15,
    code: 'FIRST15',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    validUntil: new Date('2025-12-31'),
  },
];
