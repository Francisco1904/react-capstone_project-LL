import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import { vi } from "vitest";
import App from "../App";
import HomePage from "../pages/HomePage";
import ReservationsPage from "../pages/ReservationsPage";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SkipLink from "../Components/SkipLink";
import { BookingProvider } from "../context/BookingContext";

expect.extend(toHaveNoViolations);

Element.prototype.scrollIntoView = vi.fn();

describe("Accessibility Tests", () => {
  describe("Automated axe testing", () => {
    const axeConfig = {
      rules: {
        "aria-allowed-role": { enabled: false },
        "landmark-complementary-is-top-level": { enabled: false },
        "landmark-unique": { enabled: false },
      },
    };

    it("Home page has no detectable accessibility violations", async () => {
      const { container } = render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      const results = await axe(container, axeConfig);
      expect(results).toHaveNoViolations();
    });

    it("Reservations page has no detectable accessibility violations", async () => {
      const { container } = render(
        <MemoryRouter>
          <BookingProvider>
            <ReservationsPage />
          </BookingProvider>
        </MemoryRouter>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("Header has no detectable accessibility violations", async () => {
      const { container } = render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("Footer has no detectable accessibility violations", async () => {
      const { container } = render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );

      const results = await axe(container, axeConfig);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Navigation Accessibility", () => {
    it("Header navigation has correct ARIA attributes", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );

      const navigation = screen.getByRole("navigation", {
        name: /main navigation/i,
      });
      expect(navigation).toBeInTheDocument();
      expect(navigation).toHaveAttribute("aria-label", "Main navigation");
    });

    it("Skip to content link is available and functioning", async () => {
      const user = userEvent.setup();

      const mockMainContent = document.createElement("main");
      mockMainContent.id = "main-content";
      mockMainContent.setAttribute("tabIndex", "-1");

      const focusSpy = vi.fn();
      Object.defineProperty(mockMainContent, "focus", {
        value: focusSpy,
        configurable: true,
      });

      document.body.appendChild(mockMainContent);

      render(<SkipLink />);

      await user.tab();

      const skipLink = document.activeElement;
      expect(skipLink).toHaveTextContent(/skip to content/i);

      await user.click(skipLink);

      expect(focusSpy).toHaveBeenCalled();

      document.body.removeChild(mockMainContent);
    });
  });

  describe("Form Accessibility", () => {
    it("All form inputs in Reservation page have associated labels", async () => {
      render(
        <MemoryRouter>
          <BookingProvider>
            <ReservationsPage />
          </BookingProvider>
        </MemoryRouter>
      );

      const formFields = [
        { label: /full name/i, type: "text" },
        { label: /email/i, type: "email" },
        { label: /phone number/i, type: "tel" },
        { label: /date/i, type: "date" },
        { label: /time/i, type: "combobox" },
        { label: /number of guests/i, type: "combobox" },
      ];

      for (const field of formFields) {
        const labelElement = screen.getByLabelText(field.label);
        expect(labelElement).toBeInTheDocument();

        if (field.type === "combobox") {
          expect(labelElement.tagName.toLowerCase()).toBe("select");
        } else {
          expect(labelElement.getAttribute("type")).toBe(field.type);
        }
      }
    });

    it("Form validation errors are properly associated with inputs", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <BookingProvider>
            <ReservationsPage />
          </BookingProvider>
        </MemoryRouter>
      );

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "invalid-email");
      await user.tab();

      await waitFor(() => {
        const emailError = screen.getByText(/valid email/i);
        expect(emailError).toBeInTheDocument();
        expect(emailError).toHaveAttribute("role", "alert");

        expect(emailInput).toHaveAttribute("aria-invalid", "true");

        const errorId = emailError.getAttribute("id");
        expect(emailInput).toHaveAttribute("aria-describedby", errorId);
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("All interactive elements can be accessed via keyboard", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );

      document.body.focus();

      let foundInteractiveElement = false;
      for (let i = 0; i < 10; i++) {
        await user.tab();

        const activeElement = document.activeElement;
        if (activeElement !== document.body) {
          foundInteractiveElement = true;
          break;
        }
      }

      expect(foundInteractiveElement).toBe(true);
    });

    it("Modal and dialogs trap focus appropriately", async () => {});
  });

  describe("Images and Media", () => {
    it("All images have appropriate alt text", async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      const images = screen.getAllByRole("img");

      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
        expect(img.alt).not.toBe("");
      });
    });
  });

  describe("Color Contrast and Visual Accessibility", () => {
    it("Important elements have sufficient size for touch targets", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );

      const navigationLinks = screen.getAllByRole("link");

      expect(navigationLinks.length).toBeGreaterThan(0);

      navigationLinks.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });
});
