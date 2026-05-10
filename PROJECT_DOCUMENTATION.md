# DentAssist AI - Technical Documentation

## 1. Project Overview
**DentAssist AI** is a cutting-edge dental healthcare platform that integrates Voice AI and automated scheduling to modernize the patient-to-clinic experience. It provides instant dental advice via a low-latency voice assistant and a seamless booking system for clinical appointments.

---

## 2. Technology Stack

### Core Frameworks
- **Next.js 15.5.7 (App Router)**: The foundation of the application, providing Server-Side Rendering (SSR) for SEO and optimized Client-Side Rendering for the dashboard.
- **React 19**: Leveraged for modern hook support and performance optimizations in high-fidelity UI components.
- **TypeScript 5**: Ensures type safety across the entire codebase, reducing runtime errors.

### Styling & UI
- **Tailwind CSS v4**: A modern, high-performance styling engine used for building a premium, responsive interface.
- **Lucide React**: For a consistent and scalable iconography system.
- **Framer Motion**: Powering smooth transitions and micro-animations throughout the user interface.

### Backend & Database
- **Prisma 6 (ORM)**: A type-safe Object-Relational Mapper that simplifies database interactions.
- **Neon (PostgreSQL)**: A serverless PostgreSQL database providing high availability and scalability.
- **Clerk**: A robust authentication and user management solution providing secure session handling and user synchronization.

### Third-Party Integrations
- **Vapi AI**: Powers the real-time, low-latency Voice AI Assistant for natural language consultations.
- **Resend**: A developer-first email platform for high-deliverability transactional emails.
- **React Email**: Unified library (v6.0+) for building professional, responsive email templates using React components.

---

## 3. Key Features

### 🎙️ AI Voice Assistant
- **Real-time Consultation**: Low-latency voice interaction powered by Vapi.
- **Dental Triage**: Capable of answering complex dental queries and providing basic advice.
- **Context Awareness**: The AI understands dental terminology and clinic procedures.

### 📅 Smart Appointment Booking
- **Step-by-step Workflow**: Intuitive multi-step process for selecting dentists, time slots, and treatments.
- **Availability Management**: Real-time checking of booked slots via the database.
- **Conflict Resolution**: Prevents double-booking of time slots.

### 🔐 Secure User Management
- **User Dashboard**: Personalized view of upcoming and past appointments.
- **Automatic Sync**: Middleware-driven synchronization between Clerk auth data and the local PostgreSQL database.

### 📧 Automated Notifications
- **Instant Confirmation**: Transactional emails sent immediately after a successful booking.
- **Premium Templates**: Professional, mobile-responsive email designs built with React Email.

---

## 4. Architecture

### Directory Structure
- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components organized by feature (landing, appointments, voice, etc.).
- `src/lib`: Shared utilities, Prisma client instance, and configuration.
- `src/hooks`: Custom React hooks for data fetching (React Query) and state management.
- `prisma/`: Database schema definitions and migration history.

### Database Schema
- **User**: Stores Clerk IDs and patient contact information.
- **Doctor**: Profiles of dentists including specialty and contact details.
- **Appointment**: Junction table linking Users and Doctors with specific dates, times, and treatment notes.

---

## 5. Deployment Guide

### Netlify / Vercel Configuration
The project is optimized for both platforms with the following key settings:
- **Node.js**: Version 20 or higher is required.
- **Build Command**: `prisma generate && prisma migrate deploy && next build`
- **Binary Targets**: The schema is configured with `rhel-openssl-3.0.x` to ensure Prisma compatibility in serverless environments.

### Required Environment Variables
```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."

# AI Integration
NEXT_PUBLIC_VAPI_ASSISTANT_ID="..."
NEXT_PUBLIC_VAPI_API_KEY="..."

# Email Integration
RESEND_API_KEY="..."
RESEND_FROM_EMAIL="..."

# App Config
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

---

## 6. Maintenance & Updates
- **Prisma**: To update the database schema, run `npx prisma migrate dev`.
- **Linting**: Powered by **Biome** for extremely fast linting and formatting (`npm run lint`).
- **Dependencies**: React Email migration is complete; always use the unified `react-email` package for new templates.

---

*Last Updated: May 2026*
