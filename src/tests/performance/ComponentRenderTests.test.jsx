import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { createRenderTimer } from "../../utils/performanceTracking";

// Import components to test
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import MainSection from "../../Components/MainSection";
import Card from "../../Components/Card";
import Footer from "../../Components/Footer";

describe("Component Render Performance Tests", () => {
  const RENDER_TIME_THRESHOLD = 100; // Threshold in milliseconds
  let renderTimer;

  beforeEach(() => {
    renderTimer = createRenderTimer();
  });

  it("Header component renders within performance threshold", async () => {
    renderTimer.start("Header");

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const headerRenderTime = renderTimer.end("Header");
    console.log(`Header render time: ${headerRenderTime.toFixed(2)}ms`);
    expect(headerRenderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it("Hero component renders within performance threshold", async () => {
    renderTimer.start("Hero");

    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const heroRenderTime = renderTimer.end("Hero");
    console.log(`Hero render time: ${heroRenderTime.toFixed(2)}ms`);
    expect(heroRenderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it("MainSection component renders within performance threshold", async () => {
    renderTimer.start("MainSection");

    render(
      <BrowserRouter>
        <MainSection />
      </BrowserRouter>
    );

    const mainSectionRenderTime = renderTimer.end("MainSection");
    console.log(
      `MainSection render time: ${mainSectionRenderTime.toFixed(2)}ms`
    );
    expect(mainSectionRenderTime).toBeLessThan(RENDER_TIME_THRESHOLD * 2); // Give more time for complex components
  });

  it("Card component renders within performance threshold", async () => {
    renderTimer.start("Card");

    const mockProps = {
      title: "Greek Salad",
      price: 12.99,
      description: "Fresh Greek salad with feta cheese and olives",
      imageSrc: "/mock-image.jpg",
      imageAlt: "Greek Salad",
    };

    render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    const cardRenderTime = renderTimer.end("Card");
    console.log(`Card render time: ${cardRenderTime.toFixed(2)}ms`);
    expect(cardRenderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });

  it("Footer component renders within performance threshold", async () => {
    renderTimer.start("Footer");

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footerRenderTime = renderTimer.end("Footer");
    console.log(`Footer render time: ${footerRenderTime.toFixed(2)}ms`);
    expect(footerRenderTime).toBeLessThan(RENDER_TIME_THRESHOLD);
  });
});
