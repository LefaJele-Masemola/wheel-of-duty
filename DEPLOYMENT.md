# 🚀 Deployment Guide - Wheel of Duty

## Quick Start (5 minutes)

This guide will get your app live and accessible on **Mac, Windows, iPhone, and Android** with a shareable link.

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)
1. Go to https://github.com/new
2. Enter repository name: `wheel-of-duty`
3. Add description: "Team duty rotation wheel app"
4. Choose **Public** (so anyone can view)
5. Click **Create repository**
6. Copy the repository URL (looks like: `https://github.com/YOUR_USERNAME/wheel-of-duty`)

### Option B: Using GitHub CLI (If installed)
```bash
gh repo create wheel-of-duty --public --source=. --remote=origin --push
```

---

## Step 2: Push Code to GitHub

```bash
cd /Users/lefajele-masemola/Desktop/HL\ APP/team-duty-picker

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/wheel-of-duty

# Push code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

---

## Step 3: Deploy to Vercel (1-click!)

### Option A: Vercel Dashboard (Simplest)
1. Go to https://vercel.com/signup (create free account or sign in with GitHub)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/wheel-of-duty`
5. Click **"Import"**
6. Click **"Deploy"** (settings are auto-detected)
7. Wait 1-2 minutes... ✨ **Done!**

Vercel will give you a live URL like: `https://wheel-of-duty.vercel.app`

### Option B: Vercel CLI (Faster if you prefer terminal)
```bash
npm install -g vercel
vercel login
cd /Users/lefajele-masemola/Desktop/HL\ APP/team-duty-picker
vercel
```

Then follow the prompts and approve the deploy.

---

## ✅ You're Live!

Your app is now:
- ✅ Accessible on **Mac/Windows/iPhone/Android**
- ✅ Updates automatically when you push to GitHub
- ✅ Works offline-first (data saved locally)
- ✅ Free tier includes 100GB bandwidth/month

### Share Your Link
Send this to your team: `https://wheel-of-duty.vercel.app`

---

## 📱 Use on Different Devices

### On Mac/Windows
- Open link in any browser
- Bookmark for quick access
- Can install as app: Chrome → Menu → "Install app"

### On iPhone
- Open link in Safari
- Tap Share → "Add to Home Screen"
- Appears as native app on home screen!

### On Android
- Open link in Chrome
- Tap Menu → "Install app"
- Works offline after first visit

---

## 🔄 Making Updates

### Local Development
```bash
npm run dev
# Make changes, test locally
```

### Deploy Updates
```bash
git add .
git commit -m "Update description or feature"
git push origin main
```
Vercel automatically redeploys! (takes 1-2 minutes)

---

## 📊 Alternative Hosting (If Vercel doesn't work)

### Netlify
1. Go to https://app.netlify.com/signup
2. Connect GitHub repo (same process as Vercel)
3. Choose build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🛡️ Security Notes

- ✅ Your app is **public** (that's the point!)
- ✅ All data is stored **locally** on each person's device
- ✅ No server needed for data
- ✅ No API keys or secrets exposed
- ✅ Free SSL/HTTPS included

---

## 💡 Pro Tips

### Custom Domain (Optional)
- Vercel: Settings → Domains → Add custom domain
- Cost: ~$10/year for domain (via Namecheap, GoDaddy, Google Domains)
- Example: `wheel.yourcompany.com`

### Team Access
- GitHub: Add team members as collaborators
- Everyone can update the code
- Vercel auto-deploys on each push

### Monitor Deployments
- Vercel Dashboard → Deployments tab
- See deployment status and logs
- Rollback to previous version if needed

### Environment Variables
If you add API keys later:
1. Create `.env.local` (git ignores it)
2. Add to Vercel: Settings → Environment Variables
3. Add to `.vercelignore` for excluded files

---

## ❓ Troubleshooting

### "Build failed"
- Check `npm run build` works locally: `npm run build`
- View Vercel build logs for details
- Common: Missing dependencies → `npm install` and push

### "White screen on deployment"
- Check browser console for errors (F12)
- Verify Node.js version compatible
- Try clearing cache: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### "Data not saving"
- Check browser localStorage is enabled
- Try incognito/private window
- Check browser DevTools → Application → LocalStorage

### "Why does it say 'Coming Soon'?"
- DNS propagation takes 24-48 hours for custom domains
- Vercel's default domain works immediately

---

## 🎉 Success Checklist

- [ ] GitHub repo created and code pushed
- [ ] Vercel account created
- [ ] Project deployed and live
- [ ] Can open app in browser
- [ ] Added to home screen on phone
- [ ] Shared link with team
- [ ] Team tested wheel spin on their devices

---

## 📞 Support

**Stuck?** Check these resources:
- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- React Vite Docs: https://vitejs.dev

Or ask me for help!

---

**Next Steps:**
1. Create GitHub repo
2. Push code: `git push origin main`
3. Deploy to Vercel
4. Share link with team
5. Everyone can use it immediately!

---
