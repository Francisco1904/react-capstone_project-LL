import React, { Profiler } from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import App from "../../App";
import HomePage from "../../pages/HomePage";
import { BookingProvider } from "../../context/BookingContext";

const collectProfilingData = vi.fn();

const onRender = (
  id, // the "id" prop of the Profiler tree that just committed
  phase, // either "mount" (initial render) or "update" (re-render)
  actualDuration, // time spent rendering this component and its children
  baseDuration, // estimated time to render the entire component tree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // Set of interactions traced for this render
) => {
  collectProfilingData({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};

describe("React Profiler Performance Tests", () => {
  it("MainContent renders within performance threshold", () => {
    render(
      <Profiler id="MainContent" onRender={onRender}>
        <MemoryRouter>
          <main className="main-content">
            <HomePage />
          </main>
        </MemoryRouter>
      </Profiler>
    );

    expect(collectProfilingData).toHaveBeenCalled();

    const profilingData = collectProfilingData.mock.calls
      .filter(
        (call) => call[0].id === "MainContent" && call[0].phase === "mount"
      )
      .map((call) => call[0]);

    expect(profilingData.length).toBeGreaterThan(0);

    const { actualDuration } = profilingData[0];

    expect(actualDuration).toBeLessThan(500);
  });

  it("HomePage renders efficiently", () => {
    render(
      <Profiler id="HomePage" onRender={onRender}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Profiler>
    );

    const profilingData = collectProfilingData.mock.calls
      .filter((call) => call[0].id === "HomePage" && call[0].phase === "mount")
      .map((call) => call[0]);

    expect(profilingData.length).toBeGreaterThan(0);

    const { actualDuration } = profilingData[0];

    expect(actualDuration).toBeLessThan(200);
  });
});
