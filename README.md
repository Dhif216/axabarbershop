# AXA Barbershop - Online Booking System

A modern, bilingual barbershop booking system built with Next.js, React, and TypeScript. Features real-time availability checking, automatic email notifications, admin dashboard, and multi-language support (English/Finnish).

## Quick Start

**Install & Run:**
\\\ash
npm install
npm run dev
\\\

Open http://localhost:3000

## Configuration

Create \.env.local\ with:
\\\env
RESEND_API_KEY=your_api_key
ADMIN_PASSWORD=your_password
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\\\

Initialize database:
\\\ash
npx prisma migrate dev
\\\

## Production Build

\\\ash
npm run build
npm start
\\\

## Deploy to Vercel

1. Push to GitHub
2. Connect repo at https://vercel.com
3. Add environment variables
4. Deploy

## Features

-  Real-time calendar booking
-  Automated email confirmations
-  Bilingual (English/Finnish)
-  Admin dashboard
-  Analytics & revenue tracking
-  Secure authentication

## Tech Stack

- **Framework:** Next.js 15.5.9
- **Database:** SQLite + Prisma
- **Styling:** Tailwind CSS
- **Email:** Resend API
- **i18n:** i18next

## Support

info@axabarbershop.fi

---

Version 1.0.0 | Production Ready
