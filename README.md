# Photographer Portfolio Website

A clean, modern portfolio website for photographers with an admin panel to add and remove photos. Built with **Next.js**, **Tailwind CSS**, and **Cloudinary** — designed for **free hosting**.

## Features

- **Public gallery** – Displays your best work in a responsive grid
- **Add photos** – Upload photos with title, description, and category
- **Remove photos** – Delete photos from the portfolio
- **Admin panel** – Protected with login (username/password)
- **Content protection** – Discourages screenshots, right-click, and drag on images
- **Free hosting** – Deploy on Netlify + Cloudinary (both free tiers)

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

### 4. Set up Cloudinary (Free)

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account.
2. From your dashboard, you will need your **Cloud Name**, **API Key**, and **API Secret**.

### 5. Configure environment

Copy the example env file and add your keys:

```bash
copy .env.local.example .env.local
```

Edit `.env.local`:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

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

## Deploy on Netlify

1. Push your code to **GitHub** (create a repo and push).

2. Go to [netlify.com](https://netlify.com) and sign in with GitHub.

3. Click **Add new site** → **Import an existing project** → choose your repo.

4. Netlify auto-detects Next.js. Add these **Environment variables** before deploying:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `ADMIN_USER` (default: dhruv)
   - `ADMIN_PASSWORD` (default: dbphotography)
   - `ADMIN_SESSION_SECRET` (use a strong random string in production)

5. Click **Deploy site**. Your site will be live at `https://your-site-name.netlify.app`.

---

## Free Hosting Stack

| Service   | Free Tier           | Usage                          |
|----------|----------------------|--------------------------------|
| Netlify  | 100GB bandwidth      | Hosts the Next.js app          |
| Cloudinary | Generous free tier   | Image hosting and management |

---

## Project Structure

```
├── src/
│   ├── app/           # Next.js App Router pages
│   │   ├── page.tsx   # Public gallery
│   │   └── admin/     # Admin panel
│   ├── components/    # Reusable components
│   └── lib/           # Cloudinary client
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
