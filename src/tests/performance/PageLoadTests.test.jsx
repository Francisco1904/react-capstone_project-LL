import React from "react";
import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { getCLS, getFID, getLCP } from "web-vitals";

// Import pages to test
import HomePage from "../../pages/HomePage";
import MenuPage from "../../pages/MenuPage";
import ReservationsPage from "../../pages/ReservationsPage";
import { BookingProvider } from "../../context/BookingContext";

// Mock web-vitals functions
vi.mock("web-vitals", () => ({
  getCLS: vi.fn((callback) => callback({ value: 0.1 })),
  getFID: vi.fn((callback) => callback({ value: 20 })),
  getLCP: vi.fn((callback) => callback({ value: 250 })),
}));

describe("Page Load Performance Tests", () => {
  // Define performance thresholds
  const thresholds = {
    CLS: 0.25, // Cumulative Layout Shift
    FID: 100, // First Input Delay (ms)
    LCP: 2500, // Largest Contentful Paint (ms)
  };

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
  });

  it("HomePage loads with acceptable performance metrics", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Test Cumulative Layout Shift
    await act(async () => {
      getCLS(({ value }) => {
        console.log(`HomePage CLS: ${value}`);
        expect(value).toBeLessThan(thresholds.CLS);
      });
    });

    // Test First Input Delay
    await act(async () => {
      getFID(({ value }) => {
        console.log(`HomePage FID: ${value}ms`);
        expect(value).toBeLessThan(thresholds.FID);
      });
    });

    // Test Largest Contentful Paint
    await act(async () => {
      getLCP(({ value }) => {
        console.log(`HomePage LCP: ${value}ms`);
        expect(value).toBeLessThan(thresholds.LCP);
      });
    });
  });

  it("MenuPage loads with acceptable performance metrics", async () => {
    render(
      <MemoryRouter>
        <MenuPage />
      </MemoryRouter>
    );

    await act(async () => {
      getCLS(({ value }) => {
        console.log(`MenuPage CLS: ${value}`);
        expect(value).toBeLessThan(thresholds.CLS);
      });
    });

    await act(async () => {
      getFID(({ value }) => {
        console.log(`MenuPage FID: ${value}ms`);
        expect(value).toBeLessThan(thresholds.FID);
      });
    });

    await act(async () => {
      getLCP(({ value }) => {
        console.log(`MenuPage LCP: ${value}ms`);
        expect(value).toBeLessThan(thresholds.LCP);
      });
    });
  });

  it("ReservationsPage loads with acceptable performance metrics", async () => {
    render(
      <MemoryRouter>
        <BookingProvider>
          <ReservationsPage />
        </BookingProvider>
      </MemoryRouter>
    );

    await act(async () => {
      getCLS(({ value }) => {
        console.log(`ReservationsPage CLS: ${value}`);
        expect(value).toBeLessThan(thresholds.CLS);
      });
    });

    await act(async () => {
      getFID(({ value }) => {
        console.log(`ReservationsPage FID: ${value}ms`);
        expect(value).toBeLessThan(thresholds.FID);
      });
    });

    await act(async () => {
      getLCP(({ value }) => {
        console.log(`ReservationsPage LCP: ${value}ms`);
        expect(value).toBeLessThan(thresholds.LCP);
      });
    });
  });
});
