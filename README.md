# Finance & Wealth Hub

A high-revenue, SEO-optimized platform built with Astro, React, and Tailwind CSS.

## Features
- **Mortgage Calculator:** Interactive tool for real estate finance.
- **Wealth Forecaster:** Compound interest calculator for long-term growth.
- **Content Hub:** Markdown-driven blog for high-CPM financial articles.
- **AdSense Optimized:** Pre-configured ad slots and layout.

## Tech Stack
- **Framework:** [Astro](https://astro.build)
- **UI:** [React](https://reactjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com)

## Local Development
```bash
npm install
npm run dev
```

## Deployment to Cloudflare Pages
1. Push this repository to GitHub/GitLab.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com).
3. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your repository.
5. Use the following build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Click **Save and Deploy**.
