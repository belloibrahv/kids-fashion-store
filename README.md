# KidsFashion - E-Commerce Platform

A modern, full-featured e-commerce platform for kids' clothing built with Next.js, TypeScript, TailwindCSS, and Framer Motion.

## 🌟 Features

### 🛍️ Shopping Experience
- **Product Catalog**: 30+ carefully curated kids' clothing items
- **Advanced Filtering**: Filter by category, age group, size, color, price, and gender
- **Product Details**: Interactive image galleries, size/color selectors
- **Smart Search**: Quick product search functionality
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop

### 🎨 User Interface
- **Modern Design**: Vibrant, playful colors with professional aesthetics
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Intuitive Navigation**: Easy-to-use menu with mobile-friendly hamburger menu
- **Christmas Promotions**: Special seasonal offers and banners

### 🛒 Shopping Cart & Checkout
- **Full Cart Management**: Add, remove, update quantities
- **Persistent Storage**: Cart data saved using Zustand with localStorage
- **Checkout Flow**: Complete address and payment form
- **Order Simulation**: Realistic checkout process

### 📦 Order Tracking
- **Real-time Status**: Track order from confirmation to delivery
- **Status Updates**: 5-stage tracking system
- **Demo Mode**: Simulate order progression
- **Delivery Estimates**: Tracking numbers and estimated delivery dates

### 👥 Team Section
- **Animated Slider**: Beautiful 3D carousel showcasing team members
- **Auto-play**: Automatic rotation every 5 seconds
- **Interactive**: Click to view specific team members

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kids-fashion-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
kids-fashion-store/
├── app/                      # Next.js App Router pages
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout page
│   ├── orders/              # Order tracking pages
│   ├── products/            # Product listing and details
│   ├── team/                # Team member showcase
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── header.tsx           # Navigation header
│   ├── footer.tsx           # Footer component
│   └── product-card.tsx     # Product display card
├── data/                    # Mock data
│   ├── products.ts          # Product catalog
│   ├── team.ts              # Team members
│   └── promotions.ts        # Promotional banners
├── lib/                     # Utilities and stores
│   ├── store.ts             # Zustand state management
│   └── utils.ts             # Helper functions
├── types/                   # TypeScript type definitions
│   └── index.ts             # All type exports
└── public/                  # Static assets
```

## 🎯 Key Features Explained

### State Management
The app uses Zustand for lightweight, efficient state management:
- **Cart Store**: Manages shopping cart items with persistence
- **Order Store**: Tracks order history
- **Search Store**: Handles search queries

### Data Persistence
Cart and order data are automatically saved to localStorage, so users don't lose their data on page refresh.

### Animations
Framer Motion provides:
- Page transitions
- Hover effects
- Scroll animations
- 3D carousel effects
- Loading states

### Responsive Design
The entire application is fully responsive with:
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Collapsible mobile menu

## 🚀 Deployment

### Deploy to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Select "Node" as the environment
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

3. **Environment Variables**
   No environment variables are required for the basic setup.

4. **Deploy**
   Render will automatically build and deploy your application.

### Alternative Deployment Options

- **Vercel** (Recommended for Next.js)
  ```bash
  npm install -g vercel
  vercel
  ```

- **Netlify**
  - Connect your GitHub repository
  - Build command: `npm run build`
  - Publish directory: `.next`

## 🎨 Customization

### Update Team Members
Edit `data/team.ts` to add your actual team member information:
```typescript
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Your Name',
    role: 'Your Role',
    image: 'your-image-url',
    bio: 'Your bio',
  },
  // ... more members
];
```

### Add More Products
Add products in `data/products.ts`:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Description',
  price: 29.99,
  images: ['image-url'],
  category: 'dresses',
  // ... more fields
}
```

### Customize Colors
Update the Tailwind config in `tailwind.config.ts` to change the color scheme.

## 📱 Features by Page

### Homepage
- Hero section with animated gradient
- Christmas promotion banner
- Featured products
- New arrivals
- Sale items
- Newsletter signup

### Products Page
- Advanced filtering sidebar
- Sort options
- Grid/list view
- Active filter badges
- Pagination ready

### Product Detail Page
- Image gallery with thumbnails
- Size and color selection
- Quantity selector
- Add to cart with validation
- Product features
- Stock status

### Cart Page
- View all items
- Update quantities
- Remove items
- Order summary with tax and shipping
- Continue shopping link

### Checkout Page
- Shipping address form
- Payment information form
- Order summary
- Secure payment simulation

### Order Tracking
- 5-stage tracking system
- Tracking number display
- Estimated delivery date
- Order item details
- Contact support options
- Demo mode for testing

### Team Page
- 3D animated carousel
- Auto-play slider
- Individual team member showcase
- Grid view of all members
- Hover animations

## 🤝 Contributing

This project was created by Group 2 as an educational project. Feel free to fork and customize for your own use!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from top kids' clothing e-commerce sites
- Icons from Lucide
- Images from Unsplash
- Built with love by Group 2

---

**Built with ❤️ by Group 2**
