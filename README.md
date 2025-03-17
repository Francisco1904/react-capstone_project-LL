# Front-End Capstone Project Documentation

## 📌 Project Overview

**Project Name:** "Little Lemon Restaurant App"

## ✨ Description

This project was built using **React.js** to showcase my skills as a **Junior Front-End Developer**. It highlights best practices in UI/UX design, component-based architecture, scalability, and maintainability.

### Key Features

- Intuitive navigation and user-friendly interface
- Dynamic state management using React Context API
- Responsive design optimized for both desktop and mobile devices
- Modular and reusable components for scalability
- Integration with modern tools like Vite and Tailwind CSS
- Deployed on Vercel for seamless accessibility
- Demonstrates best practices in UI/UX design and component-based architecture
- Highlights maintainability and scalability for modern web applications

## 📑 Table of Contents

1. [Installation Guide](#-installation-guide)
2. [Project Architecture](#-project-architecture)
3. [Challenges & Solutions](#-challenges--solutions)
4. [Deployment](#-deployment)
5. [License](#-license)
6. [Contact Information](#-contact-information)
7. [Acknowledgments](#-acknowledgments)
8. [Additional Resources](#-additional-resources)

---

## 🔧 Installation Guide

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **Git** (for cloning the repository)
- **React.js** (v19.0.0 or higher)

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/Francisco1904/little-lemon-app-full.git
   cd little-lemon-app-full
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173/` to view the application.

---

## 🏗️ Project Architecture

### Tech Stack

- **Frontend:** React.js, React Router, Tailwind CSS
- **State Management:** React Context API
- **Version Control:** Git & GitHub
- **Build Tool:** Vite (or Webpack, if applicable)
- **Deployment Platform:** Vercel (or Netlify, if applicable)

### Architecture Overview

The project follows a **component-based architecture** to ensure modularity and reusability. Each feature is broken down into smaller, manageable components, making the application scalable and maintainable.

### Key Design Patterns

1. **Container-Presenter Pattern:** Separation of logic (container) and UI (presenter) for better maintainability.
2. **Custom Hooks:** Encapsulation of reusable logic to simplify component code.
3. **Atomic Design Principles:** Components are categorized into atoms, molecules, and organisms for a structured hierarchy.

### Folder Structure

```
├── src
│   ├── components  # Reusable UI components
│   ├── pages       # Different views/screens
│   ├── assets      # Images and static files
│   ├── hooks       # Custom React hooks
│   ├── utils       # Utility functions
│   ├── context     # Context API for state management
│   ├── App.js      # Main application entry point
│   ├── index.js    # React DOM rendering

```

---

## 🔥 Challenges & Solutions

### Roadblocks Faced & Fixes:

1. **Issue: Navigation bar width mismatch with content**
   - ✅ **Solution:** Applied CSS flexbox adjustments and ensured consistent max-width across components.
2. **Issue: Component state not updating correctly**
   - ✅ **Solution:** Used controlled components and React's `useState` hook to manage state effectively.
3. **Issue: Git conflicts during collaborative work**
   - ✅ **Solution:** Implemented proper Git branching strategies and resolved merge conflicts.

---

## 🌎 Deployment

### Steps to Deploy on Vercel (or Netlify, if used)

1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy using Vercel CLI:
   ```sh
   vercel deploy
   ```
3. Obtain the deployment URL and verify the live project.

---

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute this project as per the terms of the license.

---

## 📬 Contact Information

- **GitHub:** [Francisco1904](https://github.com/Francisco1904)
- **LinkedIn:** [Your LinkedIn Profile]
- **Email:** [franciscopontes94@gmail.com](mailto:franciscopontes94@gmail.com)

---

## ⭐ Acknowledgments

- Special thanks to **[Mentors, Resources, or Communities]** for guidance.
- Inspiration from [any references you used].

---

## 🔗 Additional Resources

- [Figma Design Prototype](#)
- [Live Demo](#)
- [Project Case Study (if applicable)](#)
