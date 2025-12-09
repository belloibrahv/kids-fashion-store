# Deployment Guide - KidsFashion E-Commerce

## Quick Start - Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🚀 Deploy to Render (Recommended)

### Step 1: Prepare Your Code

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: Kids Fashion E-commerce Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kids-fashion-store.git
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Create a Render Account:**
   - Go to [render.com](https://render.com)
   - Sign up using GitHub

2. **Create a New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `kids-fashion-store`

3. **Configure the Service:**
   - **Name:** `kids-fashion-store` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (sufficient for this project)

4. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for the build to complete
   - Your app will be live at: `https://kids-fashion-store.onrender.com`

### Render Configuration (Automatic)

The `render.yaml` file in the root directory provides automatic configuration. Render will detect it and use these settings.

## 🌐 Deploy to Vercel (Alternative - Fastest)

Vercel is optimized for Next.js and offers the easiest deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to new project
# - Select defaults
# - Deploy!
```

Or use the Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Click "Deploy" (no configuration needed!)

**Your site will be live at:** `https://kids-fashion-store.vercel.app`

## 📦 Deploy to Netlify

1. **Push to GitHub** (if not already done)

2. **Deploy via Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** (leave empty)

4. **Deploy!**

## 🐳 Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t kids-fashion-store .
docker run -p 3000:3000 kids-fashion-store
```

## ⚙️ Environment Variables

This project doesn't require any environment variables for basic functionality. If you add external APIs later, create a `.env.local` file:

```env
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

## 🔧 Build Optimization

### Improve Build Performance

1. **Enable SWC minification** (default in Next.js 15+)
2. **Optimize images** - Already using Next.js Image component
3. **Code splitting** - Automatic with Next.js

### Production Checklist

- [ ] Update team member data in `data/team.ts`
- [ ] Replace placeholder images with real images
- [ ] Test all features in production mode: `npm run build && npm start`
- [ ] Check mobile responsiveness
- [ ] Test cart persistence
- [ ] Verify order tracking flow
- [ ] Test all payment forms (they're simulated)
- [ ] Update metadata in `app/layout.tsx`
- [ ] Add Google Analytics (optional)
- [ ] Set up error monitoring (optional: Sentry)

## 📊 Performance Tips

1. **Image Optimization:**
   - All images use Next.js Image component
   - Automatic lazy loading
   - Responsive images

2. **Code Splitting:**
   - Automatic route-based splitting
   - Dynamic imports for heavy components

3. **Caching:**
   - Cart and orders cached in localStorage
   - Static pages cached by default

## 🐛 Troubleshooting

### Build Fails

**Problem:** Build fails with TailwindCSS error
**Solution:** 
```bash
npm install -D tailwindcss@^3.4.1 postcss autoprefixer
```

**Problem:** Module not found errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Problem:** Images not loading
**Solution:** Check `next.config.mjs` - ensure image domains are whitelisted

**Problem:** Cart not persisting
**Solution:** Check browser localStorage - ensure it's not disabled

### Deployment Issues

**Problem:** 404 on page routes
**Solution:** Ensure `output: 'standalone'` is NOT in `next.config.mjs` for standard deployments

**Problem:** Build times out
**Solution:** Increase build timeout in your hosting provider settings

## 📈 Post-Deployment

### Monitor Your Site

1. **Render Dashboard:** Check logs and metrics
2. **Vercel Analytics:** Built-in analytics (free)
3. **Google Analytics:** Add tracking code

### Update Your Site

```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push

# Automatic deployment triggered!
```

## 🎯 Next Steps

1. **Custom Domain:**
   - Purchase a domain (e.g., GoDaddy, Namecheap)
   - Add to Render/Vercel settings
   - Update DNS records

2. **SSL Certificate:**
   - Automatic with Render/Vercel
   - Free Let's Encrypt certificate

3. **Analytics:**
   - Google Analytics
   - Vercel Analytics
   - Plausible (privacy-friendly)

4. **Monitoring:**
   - Sentry for error tracking
   - LogRocket for session replay
   - Uptime monitoring (UptimeRobot)

## 🆘 Support

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)

## 📝 License

MIT License - Feel free to use this project for your own purposes!

---

**Built with ❤️ by Group 2**
