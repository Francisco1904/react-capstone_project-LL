# Little Lemon UI Kit

This document outlines the typography, colors, and spacing standards used throughout the Little Lemon application.

## Typography System

### Font Sizes

| Name          | Size (rem) | Size (px) | Usage                          |
| ------------- | ---------- | --------- | ------------------------------ |
| display-title | 4rem       | 64px      | Hero titles, main headings     |
| subtitle      | 2.5rem     | 40px      | Secondary headings             |
| lead-text     | 1.125rem   | 18px      | Lead paragraphs, emphasis text |
| card-title    | 1.125rem   | 18px      | Card and section headings      |
| paragraph     | 1rem       | 16px      | Body text, form fields         |
| highlight     | 1rem       | 16px      | Buttons, links, emphasis       |
| section-title | 1.25rem    | 20px      | Section headers                |
| category-text | 1rem       | 16px      | Categories, price labels       |
| small         | 0.875rem   | 14px      | Helper text, captions          |

### Font Weights

| Weight     | Value | Usage                            |
| ---------- | ----- | -------------------------------- |
| Regular    | 400   | Body text, normal content        |
| Medium     | 500   | Mild emphasis, buttons           |
| Bold       | 700   | Strong emphasis, headings        |
| Extra Bold | 800   | Special emphasis, section titles |

### Font Families

- **Primary Font:** "Markazi Text", serif - Used for headings and display text
- **Secondary Font:** "Karla", sans-serif - Used for body text, buttons, and UI elements

## Color System

| Name             | Value   | Usage                              |
| ---------------- | ------- | ---------------------------------- |
| primary-green    | #495e57 | Main brand color, backgrounds      |
| primary-yellow   | #f4ce14 | Accent color, buttons, highlights  |
| secondary-salmon | #ee9972 | Secondary accent, price indicators |
| secondary-peach  | #fbdabb | Light accents, backgrounds         |
| highlight-light  | #edefee | Light backgrounds, text on dark    |
| highlight-dark   | #333333 | Text color, dark accents           |

## Using the UI Kit

To use these design tokens in your components:

### Typography

```scss
// For headings
@include display-title;
@include subtitle;
@include section-title;

// For body text
@include paragraph;
@include lead-text;
@include highlight;

// For interactive elements
@include card-title;
@include category-text;
```

### Color Usage

```scss
.my-element {
  color: var(--primary-green);
  background-color: var(--highlight-light);
  border-color: var(--primary-yellow);
}
```

### Responsive Behavior

The typography system includes responsive adjustments for different screen sizes:

- Desktop: Default sizes
- Tablet (<768px): Reduced heading sizes
- Mobile (<576px): Further size reductions for comfortable reading

The responsive behavior is automatically applied through the `responsive-typography` mixin.
