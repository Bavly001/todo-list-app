# 📝 Doit - Modern TodoList Web Application

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A modern, responsive, feature-rich productivity single-page application built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**.

> 🔗 **Backend Repository:** Fully integrated with the REST API backend located at [Bavly001/todo-list-app-BE](https://github.com/Bavly001/todo-list-app-BE).

---

## ✨ Features

- 🎯 **Smart Task Views:** Organize daily workflows into **Today**, **Upcoming**, **Inbox**, and custom **Project** categories with real-time badges.
- 📅 **Interactive Due Date Picker:** Flexible task scheduling with automatic chronological ordering.
- 📁 **Custom Project Management:** Group related tasks into dedicated projects with full CRUD capabilities.
- 🏆 **Activity Log & Completion Archive:** Historical completion tracking with detailed completion timestamps.
- 🎨 **Dynamic Theme Personalization:**
  - Full **Dark Mode** & **Light Mode** toggle.
  - 8 customizable accent color themes (Blue, Cyan, Teal, Green, Lime, Orange, Pink, Purple) persisted across sessions.
- 🔒 **Secure JWT Authentication:** Token-based authentication with automatic interceptors, token cleanup on expiration, and protected route guards.
- 📱 **Adaptive Responsive Design:** Seamlessly transitions from mobile navigation drawer to desktop widescreen layout.
- 💫 **Smooth Micro-Interactions:** Polished transitions and animations powered by **Framer Motion**.
- 💬 **Integrated Feedback Channel:** In-app Contact & Feedback submission.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Component-based UI architecture |
| **TypeScript 5** | Strict type safety, interfaces, and maintainability |
| **Vite 5** | Next-generation fast frontend tooling and bundling |
| **Tailwind CSS** | Utility-first styling with custom dark-mode classes |
| **Redux Toolkit** | Global state management for authentication, modals, and theme |
| **TanStack Query** | Server-state caching, optimistic updates, and background synchronization |
| **Framer Motion** | Declarative page and modal animation transitions |
| **Axios** | HTTP client with request and response interceptors |
| **Formik & Yup** | Robust form validation schemas |
| **React Icons** | Feather & FontAwesome icon sets |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/Bavly001/todo-list-app.git
cd todo-list-app

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# URL pointing to your backend REST API
VITE_API_URL=http://localhost:5000/api/
```
*(When deploying to production, point this to your deployed backend URL, e.g. `https://todo-list-app-be-1kbj.onrender.com/api/`)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🐳 Docker Setup

Run the frontend container directly:

```bash
docker build -t doit-frontend .
docker run -p 3001:3001 doit-frontend
```

Or orchestrate the full stack (Frontend + Backend + MySQL) from the root repository:
```bash
docker compose up --build
```

---

## 👥 Demo Trial Accounts

You can test the application using the following pre-configured credentials:

| Email | Password | Account Type |
| :--- | :--- | :--- |
| `user@doit.com` | `user@password` | Primary Trial User (Pre-populated with tasks) |
| `admin@doit.com` | `admin@password` | Clean Admin User |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
