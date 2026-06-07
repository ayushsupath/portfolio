# Ayush Supath Portfolio

A modern personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS. It showcases Ayush's full-stack development skills, GitHub statistics, projects, experience, education, and contact information in a clean, responsive design.

## Features

- Responsive portfolio layout for desktop and mobile
- 3D hero section and cinematic UI styling
- GitHub statistics card with live repository, star, and follower data fetched from GitHub API
- Dedicated pages for About, Skills, Experience, Education, Certifications, Projects, and Contact
- Smooth navigation with React Router
- Tailwind CSS styling with animated hover states and gradients

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React icons

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the development server URL shown in your terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

- `src/main.tsx` - App entry point
- `src/App.tsx` - Root component and routes
- `src/pages/` - Page components for Home, About, Projects, Skills, Experience, Education, Certifications, Contact
- `src/components/` - Shared UI components such as layout, navbar, footer, GitHub stats, and calculator
- `src/index.css` - Base styling and Tailwind imports

## Notes

- The GitHub stats component now loads actual user data from GitHub's public API.
- If you want to update the username, change it in `src/components/GitHubStats.tsx`.

## License

This project is open source and available for personal or portfolio use.
