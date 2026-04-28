# Content Manager User Guide

This guide explains how to add new financial guides to your website without needing a database or backend.

## 1. The Easy Workflow
Since your website is built with **Astro**, new pages are created automatically whenever you add a file to the codebase.

### Step-by-Step Instructions:
1. Navigate to the folder: `src/content/blog/`
2. Create a new file ending in `.md` (e.g., `my-investment-tips.md`).
3. Add the **Frontmatter** at the very top of the file (see below).
4. Write your content in Markdown format.
5. Save the file and push your changes to your Git repository (GitHub/GitLab).

---

## 2. File Template
Every blog post must start with this header:

```markdown
---
title: "Your Catchy Title Here"
description: "A brief summary for Google and social media."
pubDate: 2026-04-28
---

## Your First Heading
Start writing your content here. You can use **bold text**, *italics*, and [links](https://google.com).

### Subheadings
- Use bullet points for readability.
- It makes your guides more user-friendly.
```

---

## 3. SEO Best Practices
- **Title:** Keep it under 60 characters. Use high-value keywords (e.g., "Wealth," "Mortgage," "Invest").
- **Description:** Keep it between 140-160 characters. This is what people see on Google.
- **Slug:** Your filename becomes the URL. Use lowercase and hyphens (e.g., `how-to-save-money.md`).

## 4. Automatic Features
- **Homepage Update:** The 3 most recent posts will automatically appear on the home page.
- **Library List:** Every post will appear on the `/blog` index page.
- **Sitemap:** The website automatically updates `sitemap.xml` so Google finds your new post within 24-48 hours.
- **Ad Slots:** Two ad units are automatically inserted into every new blog post to generate revenue for you.
