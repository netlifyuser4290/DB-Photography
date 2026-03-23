# Photographer Portfolio Website

A clean, modern portfolio website for photographers with an admin panel to add and remove photos. Built with **Next.js**, **Tailwind CSS**, and **Supabase** — designed for **free hosting**.

## Features

- **Public gallery** – Displays your best work in a responsive grid
- **Add photos** – Upload photos with title, description, and category
- **Remove photos** – Delete photos from the portfolio
- **Admin panel** – Protected with login (username/password)
- **Content protection** – Discourages screenshots, right-click, and drag on images
- **Free hosting** – Deploy on Vercel + Supabase (both free tiers)

---

## Quick Start

### 1. Install Node.js

Download and install [Node.js](https://nodejs.org/) (LTS version) if you don’t have it.

### 2. Clone or open the project

```bash
cd "d:\db-photography\commit with dhruvil\dbstudio"
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up Supabase (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Create a new project (choose a region, set a password).
3. In **Project Settings → API**, copy:
   - Project URL
   - anon/public key

4. Run the SQL in `supabase/schema.sql`:
   - Open **SQL Editor** in the Supabase dashboard
   - Paste the contents of `supabase/schema.sql`
   - Run the script

5. Create a Storage bucket:
   - Go to **Storage** in the sidebar
   - Click **New bucket**
   - Name: `photos`
   - Make it **Public**
   - Create the bucket

6. Add Storage policies (Storage → photos → Policies):
   - **Allow public read**: `SELECT` for everyone
   - **Allow upload**: `INSERT` (you can restrict with auth later)
   - **Allow delete**: `DELETE` for your use case

### 5. Configure environment

Copy the example env file and add your keys:

```bash
copy .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin login (default: dhruv / dbphotography)
ADMIN_USER=dhruv
ADMIN_PASSWORD=dbphotography
ADMIN_SESSION_SECRET=your-random-secret-for-production
```

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the gallery. For the admin panel, go to [http://localhost:3000/admin](http://localhost:3000/admin) and log in with **dhruv** / **dbphotography**.

---

## Deploy for Free (Vercel)

1. Push your code to **GitHub** (create a repo and push).

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.

3. **Import** your repository and click **Deploy**.

4. Before deploying, add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_USER`, `ADMIN_PASSWORD` (or keep defaults)
   - `ADMIN_SESSION_SECRET` (use a strong random string in production)

5. Deploy. Your site will be live at `https://your-project.vercel.app`.

---

## Free Hosting Stack

| Service   | Free Tier           | Usage                          |
|----------|----------------------|--------------------------------|
| Vercel   | 100GB bandwidth      | Hosts the Next.js app          |
| Supabase | 1GB storage, 500MB DB| Database + image storage       |

---

## Project Structure

```
├── src/
│   ├── app/           # Next.js App Router pages
│   │   ├── page.tsx   # Public gallery
│   │   └── admin/     # Admin panel
│   ├── components/    # Reusable components
│   └── lib/           # Supabase client
├── supabase/
│   └── schema.sql     # Database schema
└── README.md
```

---

## Admin Login

- **URL:** `/admin` (redirects to `/admin/login` if not logged in)
- **Default credentials:** username `dhruv`, password `dbphotography`
- Change via `ADMIN_USER` and `ADMIN_PASSWORD` in `.env.local`
- For production, set a strong `ADMIN_SESSION_SECRET`

## Content Protection

The site discourages screenshots and copying:

- **Permissions-Policy** blocks the browser Screen Capture API
- Right-click and drag disabled on images
- Images use `user-select: none` and `-webkit-user-drag: none`

**Note:** Full prevention is not possible. OS-level screenshots, cameras, and screen recorders can still capture content.

---

## License

MIT
