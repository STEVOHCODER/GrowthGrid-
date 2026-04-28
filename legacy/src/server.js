const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;
const siteUrl = process.env.SITE_URL || `http://localhost:${port}`;
const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";
const hasDatabase = Boolean(process.env.DATABASE_URL);
const pool = hasDatabase
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : null;
const memoryBooks = [];
const featureCards = [
  { title: "Merge PDFs", desc: "Combine multiple files instantly without losing quality." },
  { title: "Split PDFs", desc: "Extract exact pages and share smaller documents fast." },
  { title: "AI Table Extraction", desc: "Pull clean table data from scanned reports." },
  { title: "Image to PDF", desc: "Convert JPG and PNG to polished PDFs in one click." },
  { title: "Compress PDFs", desc: "Reduce file size for email and mobile sharing." },
  { title: "Secure Sharing", desc: "Password-protect sensitive documents before sending." }
];
const testimonials = [
  { name: "Aline M.", role: "Operations Lead", quote: "We cut document turnaround time by more than half in two weeks." },
  { name: "David K.", role: "Freelance Consultant", quote: "The guides are practical and helped me automate repetitive PDF work." },
  { name: "Sarah N.", role: "Startup Founder", quote: "Clean interface, fast tools, and no learning curve for my team." }
];
const faqs = [
  { q: "Are these tools free to start?", a: "Yes. You can start with core tools and scale as your needs grow." },
  { q: "Will my files stay private?", a: "Yes. We recommend temporary processing and secure sharing workflows." },
  { q: "Can I use this on mobile?", a: "Yes. The interface is fully responsive for phone, tablet, and desktop." },
  { q: "Do you publish learning guides?", a: "Yes. The blog and playbook sections are updated with SEO-focused tutorials." }
];
const blogPosts = [
  {
    slug: "how-to-merge-pdfs-without-losing-quality",
    title: "How to Merge PDFs Without Losing Quality",
    excerpt: "Step-by-step workflow to combine documents while preserving layout and image sharpness.",
    date: "2026-04-27",
    content: [
      "Start with source files that already use readable resolution and consistent page size.",
      "Before merging, remove duplicate pages and optimize images to reduce output errors.",
      "After merge, review page breaks, headers, and footer continuity before sharing."
    ]
  },
  {
    slug: "best-free-pdf-tools-in-2026",
    title: "Best Free PDF Tools in 2026",
    excerpt: "A practical breakdown of free PDF workflows for freelancers and small teams.",
    date: "2026-04-25",
    content: [
      "Use merge and split tools as your baseline stack before adding advanced automation.",
      "For recurring workflows, template your document steps and save naming conventions.",
      "Track processing speed and output quality to choose the right toolset."
    ]
  },
  {
    slug: "how-to-extract-tables-from-pdfs",
    title: "How to Extract Tables from PDFs",
    excerpt: "Reliable methods for pulling clean table data into spreadsheets.",
    date: "2026-04-23",
    content: [
      "Use OCR only when source files are scanned and unreadable by standard text parsing.",
      "Validate extracted columns manually on the first run to prevent data drift.",
      "Create a reusable mapping checklist for recurring report formats."
    ]
  }
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("trust proxy", 1);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public"), { maxAge: "1d" }));

app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  res.locals.siteUrl = siteUrl.replace(/\/$/, "");
  res.locals.adsenseClient = process.env.ADSENSE_CLIENT || "";
  next();
});

function toParagraphs(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseBook(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    bookTitle: row.book_title,
    author: row.author,
    category: row.category,
    date: row.published_on,
    problemHook: row.problem_hook || "This playbook addresses a practical execution problem.",
    intro: row.intro || [],
    coreConcept: row.core_concept || [],
    authorQuote: row.author_quote || "",
    application2026: row.application_2026 || [],
    caseStudy: row.case_study || [],
    conclusion: row.conclusion || []
  };
}

function seedMemory() {
  if (memoryBooks.length) return;
  memoryBooks.push(
    {
      id: 1,
      slug: "automate-your-freelance-business-using-deal-framework",
      title: "How to Automate Your Freelance Business Using Tim Ferriss's DEAL Framework",
      bookTitle: "The 4-Hour Workweek",
      author: "Tim Ferriss",
      category: "Freelancing",
      date: "2026-04-26",
      problemHook: "Many freelancers lose growth because admin tasks consume prime focus hours.",
      intro: ["If your day is full of email replies, revisions, and follow-up messages, your business is running you instead of serving you. This playbook shows how to apply the DEAL framework to reduce repetitive work and reclaim focused execution time."],
      coreConcept: ["DEAL means Definition, Elimination, Automation, and Liberation. The idea is simple: define what matters, remove unnecessary activities, automate repetitive workflows, and free yourself to focus on high-leverage work."],
      authorQuote: "Being busy is a form of laziness - lazy thinking and indiscriminate action.",
      application2026: ["Start by listing every recurring weekly task in your freelance workflow.", "Mark each task as revenue-driving, support, or noise.", "Eliminate low-value tasks that do not improve delivery quality or lead generation.", "Automate client onboarding with structured forms and auto-responders.", "Use AI assistants to generate first drafts for proposals, follow-ups, and reporting.", "Batch communication twice daily to protect deep execution windows."],
      caseStudy: ["A solo designer handling eight active clients cut admin workload from 18 hours to 7 hours weekly by applying this framework. She used templates, a project intake form, and automated reminders. Delivery speed improved, and client satisfaction scores increased due to clearer response windows."],
      conclusion: ["You do not need a team to scale operations. You need a repeatable system that protects attention and automates low-value workload."]
    }
  );
}

async function ensureDb() {
  if (!hasDatabase) {
    seedMemory();
    return;
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      book_title TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      problem_hook TEXT NOT NULL,
      intro TEXT[] NOT NULL,
      core_concept TEXT[] NOT NULL,
      author_quote TEXT NOT NULL,
      application_2026 TEXT[] NOT NULL,
      case_study TEXT[] NOT NULL,
      conclusion TEXT[] NOT NULL,
      published_on DATE NOT NULL DEFAULT CURRENT_DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS title TEXT");
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS problem_hook TEXT");
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS intro TEXT[]");
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS core_concept TEXT[]");
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS author_quote TEXT");
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS application_2026 TEXT[]");
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS case_study TEXT[]");
  await pool.query("ALTER TABLE books ADD COLUMN IF NOT EXISTS conclusion TEXT[]");
  await pool.query("UPDATE books SET title = COALESCE(title, book_title)");
  await pool.query("UPDATE books SET problem_hook = COALESCE(problem_hook, 'This playbook addresses a practical execution problem.')");
  await pool.query("UPDATE books SET intro = COALESCE(intro, ARRAY['Intro pending'])");
  await pool.query("UPDATE books SET core_concept = COALESCE(core_concept, ARRAY['Core concept pending'])");
  await pool.query("UPDATE books SET author_quote = COALESCE(author_quote, 'Quote pending')");
  await pool.query("UPDATE books SET application_2026 = COALESCE(application_2026, ARRAY['Application steps pending'])");
  await pool.query("UPDATE books SET case_study = COALESCE(case_study, ARRAY['Case study pending'])");
  await pool.query("UPDATE books SET conclusion = COALESCE(conclusion, ARRAY['Conclusion pending'])");
}

async function getBooks(search) {
  if (!hasDatabase) {
    const list = [...memoryBooks].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    if (!search) return list;
    const needle = search.toLowerCase();
    return list.filter((b) =>
      [b.title, b.bookTitle, b.author, b.category, b.problemHook].join(" ").toLowerCase().includes(needle)
    );
  }
  if (!search) {
    const { rows } = await pool.query("SELECT * FROM books ORDER BY published_on DESC, created_at DESC");
    return rows.map(parseBook);
  }
  const { rows } = await pool.query(
    `SELECT * FROM books
     WHERE title ILIKE $1 OR book_title ILIKE $1 OR author ILIKE $1 OR category ILIKE $1 OR problem_hook ILIKE $1
     ORDER BY published_on DESC, created_at DESC`,
    [`%${search}%`]
  );
  return rows.map(parseBook);
}

function requireAdmin(req, res, next) {
  if (req.query.key === adminPassword || req.body.key === adminPassword) return next();
  return res.status(401).render("admin-login");
}

app.get("/", async (req, res) => {
  const q = String(req.query.q || "").trim();
  const books = await getBooks(q);
  res.render("home", {
    books,
    query: q,
    bookCount: books.length,
    featureCards,
    testimonials,
    faqs,
    blogPosts
  });
});

app.get("/book/:slug", async (req, res) => {
  const books = await getBooks("");
  const book = books.find((item) => item.slug === req.params.slug);
  if (!book) return res.status(404).render("404");
  res.render("book", { book });
});

app.get("/admin", requireAdmin, async (req, res) => {
  const books = await getBooks("");
  res.render("admin", { books, key: req.query.key || "" });
});

app.post("/admin/books", requireAdmin, async (req, res) => {
  const title = req.body.title;
  const slug = slugify(title);
  const payload = {
    slug,
    title,
    bookTitle: req.body.bookTitle,
    author: req.body.author,
    category: req.body.category,
    problemHook: req.body.problemHook,
    intro: toParagraphs(req.body.intro),
    coreConcept: toParagraphs(req.body.coreConcept),
    authorQuote: req.body.authorQuote,
    application2026: toParagraphs(req.body.application2026),
    caseStudy: toParagraphs(req.body.caseStudy),
    conclusion: toParagraphs(req.body.conclusion),
    date: req.body.publishedOn || new Date().toISOString().slice(0, 10)
  };

  if (!hasDatabase) {
    memoryBooks.push({ id: memoryBooks.length + 1, ...payload });
  } else {
    await pool.query(
      `INSERT INTO books
      (slug, title, book_title, author, category, problem_hook, intro, core_concept, author_quote, application_2026, case_study, conclusion, published_on)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        payload.slug,
        payload.title,
        payload.bookTitle,
        payload.author,
        payload.category,
        payload.problemHook,
        payload.intro,
        payload.coreConcept,
        payload.authorQuote,
        payload.application2026,
        payload.caseStudy,
        payload.conclusion,
        payload.date
      ]
    );
  }
  res.redirect(`/admin?key=${encodeURIComponent(req.body.key)}`);
});

app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/privacy-policy", (req, res) => res.render("privacy"));
app.get("/terms", (req, res) => res.render("terms"));
app.get("/blog", (req, res) => res.render("blog-index", { blogPosts }));
app.get("/blog/:slug", (req, res) => {
  const post = blogPosts.find((item) => item.slug === req.params.slug);
  if (!post) return res.status(404).render("404");
  return res.render("blog-post", { post });
});
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *\nAllow: /\nSitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml\n`);
});

app.get("/sitemap.xml", async (req, res) => {
  const books = await getBooks("");
  const urls = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/blog",
    ...blogPosts.map((p) => `/blog/${p.slug}`),
    ...books.map((b) => `/book/${b.slug}`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `<url><loc>${siteUrl.replace(/\/$/, "")}${url}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
  res.type("application/xml");
  res.send(xml);
});

app.use((req, res) => res.status(404).render("404"));

ensureDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Startup error", err);
    process.exit(1);
  });
