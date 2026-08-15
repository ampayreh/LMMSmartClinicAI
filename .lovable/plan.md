
# Lynda Michelle Medical Centre — Website Plan

## Overview
A professional, mobile-first single-page scrolling website for a community healthcare provider in Budo-Kimbejja, Uganda. Warm, welcoming design with deep teal and gold accents.

## Design & Branding
- **Primary color**: Deep teal (#0D7377)
- **Accent color**: Warm gold/amber (#D4A843)
- **Backgrounds**: Clean white with subtle warm gradients
- **Typography**: Modern sans-serif (Inter)
- **Feel**: Warm, community-centered, professional but approachable
- **Animations**: Subtle fade-in on scroll effects

## Layout & Navigation
- **Sticky header** with logo/business name and smooth-scroll navigation links
- **Mobile hamburger menu** that slides in
- **Floating WhatsApp button** (links to wa.me/256702322356)

## Sections (top to bottom)

### 1. Hero
- Headline: "Compassionate Healthcare for Every Family"
- Subheadline about serving Budo-Kimbejja since 2019
- Two CTA buttons: "Contact Us" and "Our Services" (smooth scroll)
- Warm gradient background with subtle abstract medical pattern (CSS-only)

### 2. About Us
- Description of the centre, licensing, and Marie Stopes partnership
- "Our Vision" sub-section about planned hospital expansion
- Clean layout with teal accent highlights

### 3. Services
- Responsive card grid (2 columns desktop, 1 column mobile)
- 8 service cards with Lucide icons: Outpatient Care, Maternal Health, Lab & Diagnostics, Immunization, Pharmacy, Minor Surgery, Community Health Education, Home-Based Care
- Each card has title, icon, and brief description

### 4. Why Choose Us
- 4 feature cards: Licensed Professionals, Community Focused, Comprehensive Care, Trusted Partnerships
- Icon + title + short description per card

### 5. Our Future
- Aspirational section about hospital expansion
- Forward-looking tone with warm gradient background

### 6. Contact
- Location, P.O. Box, phone, email, operating hours
- Embedded Google Map (iframe showing Budo-Kimbejja area)
- Simple contact form: Name, Phone, Message + "Send Message" button (client-side only, with validation)

### 7. Footer
- Business name and tagline
- Quick links to each section
- Contact details
- © 2026 copyright notice

## Technical Details
- Mobile-first responsive design
- Smooth scroll behavior
- Intersection Observer for fade-in animations
- WhatsApp floating action button
- Accessible: semantic HTML, proper contrast ratios, ARIA labels
- No external images — all visuals via CSS gradients, patterns, and Lucide icons
- Contact form with Zod validation (front-end only, no backend)
