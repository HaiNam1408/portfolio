# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters / HR**: skim quickly to judge experience, stack and fit, then grab the CV.
- **Tech leads / developers**: judge engineering quality; follow links to GitHub repos and live demos.
- **General freelance clients**: individuals or businesses looking for someone to build a website or app; they need confidence and an easy way to get in touch.

## Product Purpose

Personal portfolio of Phạm Hải Nam, a software engineer based in Đà Nẵng, Vietnam (Software Engineer at Kozocom Vietnam since 03/2025, previously Backend Developer at KDHM Solutions 01/2024–11/2024). Success means a visitor understands what Nam builds within seconds and takes one action: download the CV, open a project, or send a message.

## Positioning

A software engineer specializing in scalable backend systems and AI-driven products: real-time AI meeting analytics (Work Buddy AI, for a Japanese enterprise client), multilingual speech recognition (KzComtor: domain-term accuracy 60% to 90%), RAG document processing (Docmind AI: summarization time cut 70%), and secure marketplace backends (SellGame). Strong academic record: valedictorian, GPA 3.81/4.0.

## Operating Context

- Single-page site: Data page (hero), Experience, Projects, Skills & Credentials, Contact, Footer.
- Built-in AI assistant (Gemini) that answers questions about Nam from `src/assets/data.json`.
- Contact form sends mail via EmailJS.
- Bilingual EN / VI via react-i18next; light pages (default) and a dark "cover" theme, `?theme=dark` forces dark.
- Desktop: fixed left cover rail (nav, language, theme). Tablet: top strip with section links. Phone: top strip plus bottom section tabs; the AI assistant opens from the top strip on phones and from a floating button on larger screens.

## Capabilities and Constraints

- Stack: React 19 + TypeScript + Vite, Tailwind CSS 3, framer-motion, lucide-react.
- Must keep: AI chatbot, EmailJS contact form, EN/VI switch, light/dark theme, CV download (`/files/CV_Software_Engineer.pdf`).
- Content source of truth: `src/content/career.ts` (CV content, EN/VI), `src/assets/data.json` (projects + chatbot knowledge) and `src/locales/*/items/common.json` (UI strings).
- Open: the downloadable CV at `public/files/CV_Software_Engineer.pdf` is an older version and must be replaced by the user with the latest PDF.

## Brand Commitments

- Name shown as "Phạm Hải Nam"; wordmark "Hainam."
- Avatar photo at `public/images/avatar.jpg`.

## Evidence on Hand

- Projects with screenshots in `public/images/` (Gomi Tokyo, Kimono Rental Aki, Smart AI Translate, Interlux, Games Market, Tattoo app), with live and GitHub links in data.json.
- Tech logos in `public/svg/`.
- CV PDF in `public/files/`.
- Latest CV (Nov 2026) is the source for experience, metrics (60%→90% domain-term accuracy, −70% summarization time), skills and education (Dong A University, GPA 3.81/4.0, valedictorian at entrance and graduation, TOEIC 860).
- Older honors (UNIHACK 2023 top 10, KOREATECH 2023) are kept only in chatbot data, not on the page. No testimonials or client logos exist; do not fabricate any.

## Product Principles

1. Lead with real work: projects and concrete engineering results outrank adjectives.
2. Make the backend strength visible, not just claimed.
3. One clear next step per screen: CV, project, or message.
4. Fast to skim for recruiters, deep enough for a tech lead to verify.
5. Everything works in both languages and both themes.
