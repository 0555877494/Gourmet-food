# 🚀 Deployment Guide - Saveur & Co.

This guide will help you deploy your Saveur & Co. application to the internet.

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ A GitHub account (free at [github.com](https://github.com))
- ✅ Your code saved locally
- ✅ Node.js installed (to test locally first)

## 🎯 Recommended: Deploy to Vercel (5 Minutes)

Vercel is the easiest and fastest way to deploy. It's free and gives you:
- Automatic HTTPS
- Global CDN (fast worldwide)
- Custom domain support
- Auto-deploys on every git push

### Step-by-Step Instructions

#### 1. Create a GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Saveur & Co."

# Create a new repository on GitHub:
# - Go to https://github.com/new
# - Name it "saveur-co" (or your preferred name)
# - DON'T initialize with README (we already have one)
# - Click "Create repository"

# Connect your local repo to GitHub
git remote add origin https://github.com/YOUR_USERNAME/saveur-co.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 2. Deploy on Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" (use GitHub for fastest signup)

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Find "saveur-co" in your GitHub repositories
   - Click "Import"

3. **Configure Settings:**
   - Vercel auto-detects everything! Just verify:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

5. **Get Your Live URL:**
   - Vercel gives you a URL like: `saveur-co.vercel.app`
   - Click it to see your live site!

#### 3. Add Custom Domain (Optional)

Want `saveurco.com` instead of `saveur-co.vercel.app`?

1. **Buy a domain** (if you don't have one):
   - [Namecheap](https://namecheap.com)
   - [GoDaddy](https://godaddy.com)
   - [Google Domains](https://domains.google)

2. **Add domain to Vercel:**
   - Go to your project on Vercel
   - Click "Settings" → "Domains"
   - Enter your domain (e.g., `saveurco.com`)
   - Vercel shows you DNS records to add

3. **Update DNS at your domain registrar:**
   - Add the records Vercel provides (usually a CNAME or A record)
   - Wait 5-30 minutes for DNS propagation
   - Your site is now live at your custom domain! 🎊

## 🔄 Alternative: Deploy to Netlify

Netlify is also excellent and very similar to Vercel.

### Steps:

1. **Push code to GitHub** (same as Vercel step 1)

2. **Go to Netlify:**
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub

3. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository

4. **Configure:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click "Deploy site"

5. **Done!** Your site is live at `random-name.netlify.app`

### Quick Deploy (No GitHub):

```bash
# Build your app
npm run build

# Go to https://app.netlify.com/drop
# Drag the entire "dist" folder
# Instant deployment!
```

## 🧪 Test Before Deploying

Always test your build locally first:

```bash
# Build the production version
npm run build

# Preview the production build
npm run preview

# Open the URL shown (usually http://localhost:4173)
# Test all features:
# - Login with demo credentials
# - Browse products
# - Add to cart
# - Checkout
# - Test all three roles (customer, delivery, admin)
```

## 📱 Mobile Money Testing

To test MoMo payments:
1. Login as customer
2. Add products to cart
3. Go to checkout
4. Select "Mobile Money"
5. Choose a network (MTN/Vodafone/AirtelTigo)
6. Enter a test phone number (e.g., 241234567)
7. Complete checkout
8. You'll see the MoMo payment prompt screen

## 🔐 Demo Accounts

Test all three roles:

**Customer:**
- Email: `customer@saveurco.com`
- Password: `customer123`

**Delivery Agent:**
- Email: `delivery@saveurco.com`
- Password: `delivery123`

**Admin:**
- Email: `admin@saveurco.com`
- Password: `admin123`

## 🌐 Custom Domain Setup

### Using Vercel:

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. Wait for propagation (5-30 mins)

### Using Netlify:

1. Go to Domain Settings
2. Add custom domain
3. Update DNS at your registrar
4. Enable HTTPS (automatic)

## 📊 Monitoring & Analytics

### Vercel Analytics (Free):
- Go to your project dashboard
- Click "Analytics" tab
- See page views, performance metrics

### Add Google Analytics (Optional):

1. Get your tracking ID from [analytics.google.com](https://analytics.google.com)

2. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Build fails on Vercel/Netlify:
```bash
# Test locally first
npm run build

# Check for errors and fix them
# Then push again
git add .
git commit -m "Fix build errors"
git push
```

### Page not found (404) on refresh:
- Make sure `vercel.json` or `netlify.toml` is in your repo
- These files handle SPA routing

### Images not loading:
- Check that images are in the `public/` folder
- Verify paths in your code start with `/`

### Environment variables needed:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Docs:** https://vitejs.dev

## ✅ Deployment Checklist

Before going live:

- [ ] Tested all features locally with `npm run preview`
- [ ] All demo accounts work
- [ ] Mobile Money payment flow tested
- [ ] All static pages accessible
- [ ] Responsive design works on mobile
- [ ] Favicon displays correctly
- [ ] Meta tags are set for SEO
- [ ] Custom domain configured (if using)
- [ ] HTTPS is enabled (automatic on Vercel/Netlify)
- [ ] Analytics set up (optional)

## 🎉 You're Live!

Congratulations! Your Saveur & Co. marketplace is now live on the internet.

Share your site:
- `https://your-project.vercel.app` (Vercel)
- `https://your-project.netlify.app` (Netlify)
- `https://yourdomain.com` (Custom domain)

---

**Happy selling! 🏪✨**
