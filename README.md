<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9,17,32&height=220&section=header&text=Ayush%20Supath%20Portfolio&fontSize=48&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Full%20Stack%20Developer%20%7C%20React%20%2B%20TypeScript%20%2B%20Vite%20%2B%20Tailwind&descAlignY=58&descSize=18" />

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Portfolio-blueviolet?style=for-the-badge)](https://ayushsupath.vercel.app)
[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite%205-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%203-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router 7](https://img.shields.io/badge/React%20Router%207-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)

<br/>

![GitHub stars](https://img.shields.io/github/stars/ayushsupath/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/ayushsupath/portfolio?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/ayushsupath/portfolio?color=green)
![License](https://img.shields.io/github/license/ayushsupath/portfolio?color=blue)

</div>

---

## ✨ Overview

This is a **cinematic, high-fidelity personal portfolio website** meticulously crafted from the ground up to showcase engineering expertise, design-focused development, and competitive programming statistics. It moves away from standard templates to provide an immersive, glassmorphism-themed interactive workspace that highlights real-world metrics, design details, and client engagement systems.

> *"A developer portfolio should be more than a static resume—it should feel like an interactive application that validates your capabilities in real-time."*

---

## 🚀 Key Features

### 📊 Real-Time Integrations & Metrics
- **Dynamic GitHub Insights:** Fetches public repositories, stargazers, followers, and constructs a visual contribution activity calendar for the past 4 years using the GitHub API.
- **Dynamic LeetCode Stats Dashboard:** Connects directly to the LeetCode API wrapper to render live ranking, total solved questions, percentage breakdowns (Easy, Medium, Hard radial rings), global reputation, and submission heatmaps.

### 🎨 Premium UI/UX & Layout
- **3D Cinematic Hero:** A dynamic, layered landing experience with smooth depth effects and glassmorphism styling.
- **Bento Grid Showcase:** A modern grid design showcasing selected works with interactive hover-reveal states, CSS grayscale-to-color transition, and neon underline details.
- **Cinematic Navbar & Modal Portals:** Floating blur navigation header and a custom overlay Contact Modal for friction-free messaging.

### 💰 Client Engagement & ROI Tooling
- **Interactive ROI Calculator:** Built-in pricing estimator featuring dynamic sliders that let potential clients drag and evaluate projected development values and service packages (Starter, Growth, Enterprise).

---

## 🛠️ Tech Stack

```
📦 Portfolio Architecture
 ├── ⚛️ React 18          — UI Library
 ├── 🔷 TypeScript        — Type Safety
 ├── ⚡ Vite 5             — Dev Server & Build Tool
 ├── 🎨 Tailwind CSS 3    — Styling Utility
 ├── 🧭 React Router 7    — Routing & Page Transitions
 ├── 📈 Lucide React      — Vector Icons
 └── 🌐 External APIs     — GitHub REST API & LeetCode Wrapper API
```

---

## 📂 Project Structure

```
src/
├── main.tsx                # Application Entry point
├── App.tsx                 # Routing & Root Configuration
├── index.css               # Styling System & Layout Tokens
├── vite-env.d.ts           # Vite Global Type Definitions
│
├── pages/                  # Top-Level Layout Pages
│   ├── Home.tsx            # Hero Landing Page
│   ├── About.tsx           # Developer Persona & Bio
│   ├── Experience.tsx      # Corporate & Freelance History
│   ├── Skills.tsx          # Specialized Skill Grids
│   ├── Projects.tsx        # Portfolio Project Showcases
│   ├── Education.tsx       # Academic Records
│   ├── Certifications.tsx  # Verifiable Achievements & Certs
│   └── Contact.tsx         # Embedded Inquiries Section
│
└── components/             # Reusable UI Modules
    ├── CinematicNavbar.tsx # Floating Navigation Component
    ├── SimpleFooter.tsx    # Clean Base Footer
    ├── EditorialFooter.tsx # Structured Media Footer
    ├── Layout.tsx          # Page Wrapper with Navigation/Footer
    ├── ErrorBoundary.tsx   # React Fallback Error Handler
    ├── BentoGrid.tsx       # Modern Portfolio Showcase Grid
    ├── Hero3D.tsx          # Cinematic 3D Hero Section
    ├── GitHubStats.tsx     # Star, Repository, & Contribution Heatmap Card
    ├── LeetCodeStats.tsx   # Problem Breakdown & Solution Tracker
    ├── PricingCalculator.tsx # Client-facing Tier & ROI Estimation Slider
    └── ContactModal.tsx    # Modal Portal for Quick Messages
```

---

## ⚡ Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/ayushsupath/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server locally
```bash
npm run dev
```
Navigate to [http://localhost:5173](http://localhost:5173) in your browser to view the application. 🎉

### 4. Compile for production
```bash
npm run build
```

### 5. Preview production build locally
```bash
npm run preview
```

---

## 🔧 Personal Customization Guide

To tailor this portfolio to your own profile and stats, update the configuration points below:

### 1. Update LeetCode Username
Open [src/components/LeetCodeStats.tsx](file:///d:/Ayush_Portfolio/portfolio/src/components/LeetCodeStats.tsx) and edit:
```typescript
const username = 'your-leetcode-username'; // Line 30
```

### 2. Update GitHub Username
Open [src/components/GitHubStats.tsx](file:///d:/Ayush_Portfolio/portfolio/src/components/GitHubStats.tsx) and edit:
```typescript
const gitHubUsername = 'your-github-username'; // Line 15
```

### 3. Update Projects list in Bento Grid
Edit the projects array inside [src/components/BentoGrid.tsx](file:///d:/Ayush_Portfolio/portfolio/src/components/BentoGrid.tsx#L1-L34) to list your own products.

### 4. Custom Personal Information
Update files under `src/pages/` (`About.tsx`, `Experience.tsx`, `Skills.tsx`, `Education.tsx`, `Certifications.tsx`) to supply your personal bio, skill levels, experiences, and academic achievements.

---

## 🌐 Deployment

This application is ready to deploy out-of-the-box on **Vercel**, **Netlify**, or **GitHub Pages**. 

For immediate hosting on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ayushsupath/portfolio)

---

## 📫 Connect with Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ayushsupath)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ayushsupath)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ayushsupath@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-blueviolet?style=for-the-badge&logo=vercel&logoColor=white)](https://ayushsupath.vercel.app)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9,17,32&height=100&section=footer&animation=twinkling" />

**If you liked this project, don't forget to give it a ⭐! It helps showcase the repository.**

![Visitor Count](https://komarev.com/ghpvc/?username=ayushsupath&color=blueviolet&style=for-the-badge&label=Profile+Views)

</div>
