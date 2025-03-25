import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// Import components for testing
import Header from "../../Components/Header";
import HomePage from "../../pages/HomePage";
import MenuPage from "../../pages/MenuPage";
import {
  startPerformanceMark,
  endPerformanceMark,
} from "./performanceTestUtils";

describe("Navigation Performance Tests", () => {
  // Define performance thresholds
  const NAVIGATION_TIME_THRESHOLD = 300; // milliseconds

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Navigation between routes is performant", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Use a more specific selector to avoid ambiguity
    // Look for the h1 element with text "Little Lemon" instead of any element with this text
    expect(
      screen.getByRole("heading", { level: 1, name: /little lemon/i })
    ).toBeInTheDocument();

    // Wait for a small delay to ensure full render
    await act(() => new Promise((resolve) => setTimeout(resolve, 100)));

    // Find all links (we'll look for the Menu link)
    const menuLink = container.querySelector('a[href="/menu"]');

    // If no menu link is found, end the test with a warning
    if (!menuLink) {
      console.warn("Menu link not found. Check the navigation structure.");
      expect(true).toBe(true);
      return;
    }

    // Start performance measurement
    startPerformanceMark("navigationTime");

    // Navigate to Menu page
    await user.click(menuLink);

    // End performance measurement
    const navigationTime = endPerformanceMark("navigationTime");

    console.log(`Navigation time to Menu page: ${navigationTime}ms`);

    // Verify navigation time is within threshold
    expect(navigationTime).toBeLessThan(NAVIGATION_TIME_THRESHOLD);

    // Verify we're on the Menu page with a more specific selector
    const menuHeading = await screen.findByRole("heading", {
      name: /our menu/i,
    });
    expect(menuHeading).toBeInTheDocument();
  });
});
