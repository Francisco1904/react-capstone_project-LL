import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Extend Vitest's expect with Jest DOM matchers
//expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});
