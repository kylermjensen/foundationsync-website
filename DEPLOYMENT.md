# FoundationSync - Deployment Guide

Your landing page is ready to deploy to **foundationsync.com**.

## Step 1: Push to GitHub

```bash
git add index.html styles.css script.js CNAME DEPLOYMENT.md
git commit -m "Add FoundationSync landing page

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **main** branch
4. Click **Save**
5. GitHub will detect the CNAME file automatically

## Step 3: Configure DNS at Your Domain Registrar

Log in to where you bought foundationsync.com (Namecheap, GoDaddy, Google Domains, etc.) and add these DNS records:

### For apex domain (foundationsync.com):

Add these **A records**:
```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153
```

### For www subdomain (www.foundationsync.com):

Add this **CNAME record**:
```
Type: CNAME
Host: www
Value: [your-github-username].github.io
```

**Note:** Replace `[your-github-username]` with your actual GitHub username.

## Step 4: Wait for DNS Propagation

- DNS changes take 15 minutes to 48 hours (usually under 1 hour)
- Check status: https://www.whatsmydns.net/#A/foundationsync.com
- Once propagated, your site will be live at https://foundationsync.com

## Step 5: Enable HTTPS (Automatic)

1. Go back to GitHub Pages settings
2. After DNS propagates, **Enforce HTTPS** checkbox will appear
3. Check the box
4. Site will use SSL (https://) within a few minutes

---

## Form Setup (REQUIRED)

The contact form currently logs to console. Choose one option:

### Option 1: Formspree (Recommended - Free tier available)

1. Go to https://formspree.io/
2. Sign up and create a new form
3. Copy your form endpoint (looks like: `https://formspree.io/f/xxxxxx`)
4. Edit `script.js` around line 24, replace the TODO section with:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
});

if (!response.ok) throw new Error('Form submission failed');
```

5. Commit and push the change

### Option 2: Simple Email Link (No coding required)

Replace the entire contact form with a mailto link. Edit `index.html` line 128-180:

```html
<div class="contact-cta">
    <a href="mailto:your@email.com?subject=Free AI Audit Request&body=Name:%0D%0ABusiness:%0D%0AIndustry:%0D%0AEmployees:%0D%0A%0D%0AChallenge:%0D%0A"
       class="cta-button large">
        Email for Free Audit
    </a>
</div>
```

### Option 3: Calendly (Meeting scheduler)

1. Create free Calendly account: https://calendly.com/
2. Set up a meeting type for "Free AI Audit"
3. Replace form with Calendly embed or button

---

## Testing Locally

Before deploying, test locally:

```bash
# Open in browser
open index.html

# Or run local server
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

---

## Next Actions Checklist

- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Configure DNS (A records + CNAME)
- [ ] Wait for DNS propagation
- [ ] Enable HTTPS
- [ ] Set up form handler (Formspree/mailto/Calendly)
- [ ] Test form submissions
- [ ] Test on mobile devices
- [ ] Share link on LinkedIn
- [ ] Add to email signature

---

## Updating Content

After initial deployment, to make changes:

```bash
# Edit files
vim index.html  # or use your editor

# Commit and push
git add .
git commit -m "Update content"
git push

# Changes live in ~1 minute
```

---

## Troubleshooting

### Site not loading
- Check DNS propagation: https://www.whatsmydns.net/#A/foundationsync.com
- Verify CNAME file contains only: `foundationsync.com`
- Wait up to 48 hours for DNS

### HTTPS not working
- Wait for DNS to fully propagate first
- Then check "Enforce HTTPS" in GitHub Pages settings
- Can take a few hours after DNS resolves

### Form not working
- Check browser console for errors (F12 → Console)
- Verify Formspree endpoint is correct
- Test with simple mailto link first

---

## Optional Enhancements

### Add Google Analytics
1. Create GA4 property at https://analytics.google.com/
2. Get measurement ID (G-XXXXXXXXXX)
3. Add to `<head>` in index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Add favicon
1. Create 32x32 PNG icon
2. Save as `favicon.ico`
3. Add to `<head>`: `<link rel="icon" href="favicon.ico">`

### Add OpenGraph tags (for LinkedIn/social sharing)
Add to `<head>` in index.html:

```html
<meta property="og:title" content="FoundationSync | AI Operations Consulting">
<meta property="og:description" content="Free AI operations audits for small businesses. Save 10-20% on labor and operations.">
<meta property="og:url" content="https://foundationsync.com">
<meta property="og:type" content="website">
```

---

**Your site will be live at:** https://foundationsync.com

Questions? Check GitHub Pages docs: https://docs.github.com/en/pages
