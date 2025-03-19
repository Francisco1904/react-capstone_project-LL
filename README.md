# Front-End Capstone Project Documentation

## 📌 Project Overview

**Project Name:** "Little Lemon Restaurant App"

## ✨ Description

This project was built using **React.js** to showcase my skills as a **Junior Front-End Developer**. It highlights best practices in UI/UX design, component-based architecture, scalability, and maintainability.

### Key Features

- Intuitive navigation and user-friendly interface
- Responsive design with custom breakpoints for mobile, tablet and desktop
- Consistent branded component styling using SCSS with variables and mixins
- Interactive reservation form with validation
- Featured menu items with dynamic card components
- Customer testimonials section with star ratings
- Modular and reusable components (Cards, Hero section, Review cards)
- Clear information architecture with dedicated page routes
- About section highlighting the restaurant's story and owners
- Integration with modern tools like Vite for faster development

## 📑 Table of Contents

1. [Installation Guide](#-installation-guide)
2. [Project Architecture](#-project-architecture)
3. [Styling Architecture](#-styling-architecture)
4. [Challenges & Solutions](#-challenges--solutions)
5. [Deployment](#-deployment)
6. [License](#-license)
7. [Contact Information](#-contact-information)
8. [Acknowledgments](#-acknowledgments)
9. [Additional Resources](#-additional-resources)

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
3. Compile SCSS to CSS:
   ```sh
   npm run scss:build
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173/` to view the application.

---

## 🏗️ Project Architecture

### Tech Stack

- **Frontend:**
  - React.js (v19.0.0)
  - React Router (v7.3.0) for page navigation
  - SCSS for enhanced styling capabilities
  - CSS Custom Properties for theming
- **Build Tool:** Vite (v6.2.0)
- **Version Control:** Git & GitHub
- **Deployment Platform:** Vercel (or Netlify, if applicable)

### Architecture Overview

The project follows a **component-based architecture** with clear separation of concerns:

- **Pages:** Container components that represent full pages in the application
- **Components:** Reusable UI elements that compose the pages
- **Assets:** Static resources like images and logos
- **Styles:** Global and component-specific styling using SCSS
- **Context:** State management for booking functionality

### Key Design Patterns

1. **Component Composition:** Building complex UIs from smaller, focused components
2. **Prop Drilling:** Passing data to child components through props
3. **SCSS Variables & Mixins:** Using SCSS features for consistent styling
4. **Responsive Design:** Mobile-first approach with flexible grid layouts
5. **BEM-style Naming:** For component organization in SCSS

### Folder Structure

```
├── src
│   ├── Components        # Reusable UI components (Header, Footer, Card, etc.)
│   ├── pages             # Page components (HomePage, ReservationsPage, etc.)
│   ├── assets            # Images and static resources
│   ├── context           # Context providers for state management
│   ├── utils             # Utility functions
│   ├── styles            # Styling files
│   │   ├── scss/         # Source SCSS files
│   │   │   ├── _variables.scss  # Design tokens and variables
│   │   │   ├── _mixins.scss     # Reusable patterns and functions
│   │   │   ├── _reset.scss      # CSS reset
│   │   │   ├── components/      # Component-specific styles
│   │   │   ├── pages/           # Page-specific styles
│   │   │   └── main.scss        # Main SCSS file that imports all partials
│   │   └── css/          # Compiled CSS (generated from SCSS)
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
```

---

## 🎨 Styling Architecture

The project uses SCSS for enhanced CSS capabilities and better organization:

### SCSS Structure

```
styles/
├── scss/                  # Source SCSS files
│   ├── _variables.scss    # Design tokens and variables
│   ├── _mixins.scss       # Reusable patterns and functions
│   ├── _reset.scss        # CSS reset/normalize
│   ├── _global.scss       # Global styles
│   ├── _typography.scss   # Text styling
│   ├── _buttons.scss      # Button components
│   ├── components/        # Component-specific styles
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   └── ...etc
│   ├── pages/             # Page-specific styles
│   │   ├── _reservations.scss
│   │   └── ...etc
│   └── main.scss          # Main entry point that imports all partials
├── css/                   # Compiled CSS (don't edit directly)
    └── main.css           # The compiled stylesheet
```

### SCSS Features Used

- **Variables**: Defined in `_variables.scss` for consistent tokens
- **Nesting**: For cleaner, more readable selectors
- **Mixins**: For reusable style patterns
- **Partials**: Split styles into maintainable chunks
- **BEM-style naming**: For component organization

### Development Workflow

Run `npm run scss` to watch SCSS files and compile changes automatically during development.
Run `npm run scss:build` to compile a production-ready version for deployment.

---

## 🔥 Challenges & Solutions

### Roadblocks Faced & Fixes:

1. **Issue: Navigation bar width mismatch with content**
   - ✅ **Solution:** Applied CSS flexbox adjustments and ensured consistent max-width across components.
2. **Issue: Component state not updating correctly**
   - ✅ **Solution:** Used controlled components and React's `useState` hook to manage state effectively.
3. **Issue: CSS maintainability with growing codebase**
   - ✅ **Solution:** Migrated to SCSS with partials, mixins, and variables for better organization.
4. **Issue: Form validation complexities**
   - ✅ **Solution:** Created custom validation system with error handling and accessibility features.
5. **Issue: Git conflicts during collaborative work**
   - ✅ **Solution:** Implemented proper Git branching strategies and resolved merge conflicts.

---

## 🌎 Deployment

### Steps to Deploy on Vercel (or Netlify, if used)

1. Build the project:
   ```sh
   npm run scss:build && npm run build
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
