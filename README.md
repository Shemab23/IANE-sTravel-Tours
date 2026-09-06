# IAN'S Travel & Tours — Website

A premium, light-themed marketing website and functional MVP for **IAN'S TRAVEL & TOURS**, a Rwanda-based travel agency helping individuals, families, businesses, and organizations with flights, tours, hotels, visa assistance, travel insurance, and airport transfers across Rwanda, East Africa, and beyond.

**Slogan:** *Conquer the world with us!*

---

## ✨ Overview

This is a single-page, cinematic scrollytelling website designed to take visitors through a journey: **Dream → Explore → Plan → Trust → Enquire → Travel.** It includes a fully working public experience (enquiry forms, WhatsApp/call/email actions, destination and tour showcases) and a discreet, password-protected admin panel for managing site content — currently running on mock/local data, structured to plug into a real backend later.

## 🚀 Features

### Public Website
- Cinematic split hero with an auto-scrolling service gallery (transfers, tours, flights)
- Services overview (Flights, Tours, Hotels, Visa Assistance, Travel Insurance Assistance, Airport Transfers)
- Working **flight enquiry** form with confirmation state and WhatsApp handoff
- Immersive **destinations** section (Rwanda, East Africa, Dubai, and beyond)
- Dedicated **Rwanda experience** showcase (Kigali, Volcanoes, gorilla trekking, Akagera, Lake Kivu, Nyungwe)
- **Tours** section (group, private, custom, family, corporate trips)
- "How It Works" step-by-step process
- **Testimonials** carousel (real, admin-approved reviews only — no fabricated content)
- Final conversion section with WhatsApp-first CTA and quote request
- Fully working **WhatsApp, phone (`tel:`), and email (`mailto:`)** actions with pre-filled messages
- No customer accounts, logins, or registrations required anywhere on the public site

### Admin Panel (MVP)
- Discreet, unlabeled access point (not exposed in public navigation, not indexed)
- Simple password gate → private dashboard at a non-public route
- Manage flight enquiries, quote requests, contact enquiries, and their statuses
- Manage tours, destinations, and testimonials (add/edit/delete, mark as featured)
- Section-by-section website content editor (headlines, copy, images, add/remove cards)
- **MVP note:** admin edits currently show a confirmation alert and log the intended change locally — nothing persists to the live site yet. The data layer is structured for a straightforward migration to a real backend (e.g., Firebase Auth + Firestore).

## 🧱 Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS**
- **GSAP / ScrollTrigger** (or Framer Motion) for scroll-driven motion
- Local/mock data modules + `localStorage` for demo persistence (no backend yet)

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components (cards, buttons, sections)
├── data/           # Mock data modules (services, tours, destinations, testimonials, enquiries)
├── forms/          # Enquiry, quote, and contact form logic
├── admin/          # Admin dashboard, content editor, auth gate
├── nav/            # Navigation and admin entry trigger
├── utils/          # Shared helpers (WhatsApp link builder, validation, etc.)
└── pages/          # Route-level pages (public site, /manage admin route)
```

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-org>/ians-travel-tours.git
cd ians-travel-tours

# Install dependencies
npm install

# Run the development server
npm run dev
```

## ⚠️ Notes & Limitations (MVP Stage)

- **No backend yet.** All content, enquiries, and admin edits use local/mock data.
- **Admin authentication is client-side only** — a convenience gate for the MVP, **not production-grade security**. Server-side authentication (restricted to the designated administrator identity) must be added before production launch.
- All business information (contact details, testimonials, pricing, availability) reflects real, verified data only — no fabricated statistics, reviews, or guarantees anywhere on the site.

## 🗺️ Roadmap

- [ ] Connect Firebase Authentication (admin-only access)
- [ ] Connect Firestore (or chosen backend) for enquiries, tours, destinations, testimonials, and content
- [ ] Wire the admin content editor to persist real changes
- [ ] Add email/SMS notifications for new enquiries
- [ ] Analytics and performance monitoring

## 📄 License

Private/proprietary — all rights reserved by IAN'S Travel & Tours.
