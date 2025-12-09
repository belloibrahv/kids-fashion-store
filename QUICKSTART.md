# 🚀 Quick Start Guide - KidsFashion

## Get Started in 3 Steps

### 1️⃣ Install & Run

```bash
cd /Users/kudiratbello/Tasued/group-2/kids-fashion-store
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🎯 What to Update Before Deploying

### 1. Team Members (Important!)
Edit `data/team.ts` with actual group member information:

```typescript
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Your Actual Name',        // ← Update this
    role: 'Your Actual Role',        // ← Update this
    image: 'your-image-url',         // ← Update this (optional)
    bio: 'Your actual bio',          // ← Update this (optional)
  },
  // ... repeat for all 6 members
];
```

### 2. Update Metadata (Optional)
Edit `app/layout.tsx` - Lines 8-11:

```typescript
export const metadata: Metadata = {
  title: 'Your Store Name - Quality Kids Clothing',  // ← Customize
  description: 'Your custom description',            // ← Customize
  keywords: 'your, custom, keywords',                // ← Customize
};
```

---

## 🌐 Deploy to Production

### Option A: Vercel (Easiest - 2 minutes)

```bash
npm install -g vercel
vercel
```

Done! Your site is live at `https://your-project.vercel.app`

### Option B: Render (Free Hosting)

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/kids-fashion-store.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Click "Deploy"
   
   Live at: `https://kids-fashion-store.onrender.com`

---

## 📋 Feature Checklist

Test these features after deployment:

- [ ] Homepage loads with animations
- [ ] Browse all products (`/products`)
- [ ] Filter by category, age, color
- [ ] View product details
- [ ] Add items to cart
- [ ] Cart persists on page refresh
- [ ] Checkout flow works
- [ ] Order tracking displays correctly
- [ ] Team page carousel animates
- [ ] Mobile responsive (test on phone)
- [ ] Christmas promotion banner shows

---

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.ts` - Primary/Secondary colors

### Add More Products
Edit `data/products.ts` - Copy existing product format

### Update Promotions
Edit `data/promotions.ts` - Modify Christmas deals

---

## 📱 Test On Mobile

1. Find your local IP: `ifconfig | grep inet`
2. On your phone, visit: `http://YOUR_IP:3000`
3. Test cart, checkout, and navigation

---

## 🆘 Troubleshooting

**Problem:** Build fails  
**Solution:** `rm -rf node_modules package-lock.json && npm install`

**Problem:** Cart not saving  
**Solution:** Check browser localStorage is enabled

**Problem:** Images not loading  
**Solution:** Check internet connection (images from Unsplash)

---

## 📚 Documentation

- **Full Documentation:** `README.md`
- **Deployment Guide:** `DEPLOYMENT.md`
- **Project Summary:** `PROJECT_SUMMARY.md`

---

## 🎉 You're Ready!

Your professional e-commerce platform is complete with:
✅ 30+ products  
✅ Full shopping cart  
✅ Order tracking  
✅ Team showcase  
✅ Responsive design  
✅ Smooth animations  

**Run `npm run dev` and start exploring!** 🚀
