# 🏪 Saveur & Co. — Fine Foods Marketplace

A premium artisanal foods e-commerce platform with role-based access control, built with React, TypeScript, Vite, and Tailwind CSS.

![Saveur & Co.](https://img.shields.io/badge/Saveur%20%26%20Co.-Premium%20Foods-92400e?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🛍️ Customer Features
- **Animated Login/Signup** with beautiful transitions
- **Product Catalog** with real food photography
- **Shopping Cart** with quantity management
- **Checkout** with coupon codes (SAVEUR10, WELCOME15)
- **Mobile Money (MoMo)** payment support for Ghana 🇬🇭
  - MTN Mobile Money
  - Vodafone Cash
  - AirtelTigo Money
- **Order Tracking** with timeline visualization
- **Wishlist/Favorites** (persisted in localStorage)
- **Address Book** management
- **Payment Methods** management
- **Order Cancellation** flow
- **Loyalty Points** system
- **Reorder** functionality

### 🚴 Delivery Agent Features
- **Live Delivery Map** with animated routes
- **Job Acceptance** and status tracking
- **Earnings Dashboard** with weekly charts
- **Online/Offline** toggle
- **Payout History**

### 👑 Admin Features
- **Dashboard Analytics** with revenue charts
- **Product Management** (CRUD operations)
- **Order Management** with status updates
- **Customer Management** with search/sort
- **Inventory Alerts** for low stock
- **Store Settings** configuration

### 📄 Static Pages
- About Us
- Contact Us
- FAQ
- Shipping & Returns
- Terms of Service
- Privacy Policy

## 🎨 Design Highlights

- **Warm, refined aesthetic** with amber/orange color palette
- **Real food photography** for all products
- **Smooth animations** powered by Framer Motion
- **Fully responsive** design (mobile, tablet, desktop)
- **Accessibility** compliant with ARIA labels
- **Newsletter signup** in footer
- **Social media** integration
- **Back to top** button
- **Breadcrumbs** navigation

## 🚀 Deployment

### Option 1: Vercel (Recommended)

**Fastest and easiest deployment:**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/saveur-co.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"
   - Done! Your site is live at `your-project.vercel.app`

3. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your domain (e.g., `saveurco.com`)
   - Follow DNS configuration instructions

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Connect your repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Drag & Drop Alternative:**
   - Run `npm run build` locally
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder
   - Instant deployment!

### Option 3: Cloudflare Pages

1. **Push to GitHub** (same as above)

2. **Deploy on Cloudflare:**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Sign up and connect GitHub
   - Create new project
   - Build settings:
     - **Build command:** `npm run build`
     - **Output directory:** `dist`
   - Deploy!

### Option 4: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/saveur-co/', // Your repo name
     // ... rest of config
   })
   ```

3. **Add scripts to package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch → `gh-pages` branch
   - Your site will be at `https://YOUR_USERNAME.github.io/saveur-co/`

### Option 5: Custom Server (VPS/DigitalOcean/AWS)

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Upload to server:**
   ```bash
   # Using SCP
   scp -r dist/* user@your-server:/var/www/html/
   
   # Or using rsync
   rsync -avz dist/ user@your-server:/var/www/html/
   ```

3. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name saveurco.com www.saveurco.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /assets {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **Enable HTTPS with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d saveurco.com -d www.saveurco.com
   ```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/saveur-co.git
   cd saveur-co
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Demo Credentials

### Customer
- **Email:** customer@saveurco.com
- **Password:** customer123

### Delivery Agent
- **Email:** delivery@saveurco.com
- **Password:** delivery123

### Admin
- **Email:** admin@saveurco.com
- **Password:** admin123

## 📱 Payment Methods

### Credit/Debit Cards
- Visa
- Mastercard
- American Express

### Mobile Money (Ghana 🇬🇭)
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money

## 🎯 Coupon Codes

- `SAVEUR10` - 10% off
- `WELCOME15` - 15% off (new customers)

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation (if added)

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email hello@saveurco.com or join our Slack channel.

## 🙏 Acknowledgments

- Product images generated with AI
- Icons from Font Awesome
- Animations powered by Framer Motion
- Inspired by premium food marketplaces worldwide

---

**Made with ❤️ for food lovers everywhere**
