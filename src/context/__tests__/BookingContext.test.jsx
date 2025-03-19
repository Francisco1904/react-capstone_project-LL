import { render, renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BookingProvider, useBooking } from "../BookingContext";

// Mock the global API functions
vi.stubGlobal(
  "fetchAPI",
  vi.fn((date) => {
    // Mock implementation returning different times based on day
    const day = new Date(date).getDay();
    if (day === 5 || day === 6) {
      // Weekend
      return ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    } else if (day === 1) {
      // Monday
      return ["17:00", "18:00", "19:00", "20:00"];
    } else {
      // Weekdays
      return ["17:00", "18:00", "19:00", "20:00", "21:00"];
    }
  })
);

vi.stubGlobal(
  "submitAPI",
  vi.fn(() => true)
);

describe("BookingContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides initial available times", () => {
    const wrapper = ({ children }) => (
      <BookingProvider>{children}</BookingProvider>
    );
    const { result } = renderHook(() => useBooking(), { wrapper });

    expect(result.current.availableTimes).toBeDefined();
    expect(result.current.availableTimes.length).toBeGreaterThan(0);
  });

  it("fetches available times for a specific date", async () => {
    const wrapper = ({ children }) => (
      <BookingProvider>{children}</BookingProvider>
    );
    const { result } = renderHook(() => useBooking(), { wrapper });

    // Get a Friday date for testing
    const fridayDate = "2023-06-02"; // This is a Friday

    await act(async () => {
      result.current.fetchAvailableTimes(fridayDate);
    });

    expect(window.fetchAPI).toHaveBeenCalledWith(fridayDate);
    // Check that we got the weekend schedule
    expect(result.current.availableTimes).toEqual(
      expect.arrayContaining(["16:00", "22:00"])
    );
  });

  it("submits reservation data", async () => {
    const wrapper = ({ children }) => (
      <BookingProvider>{children}</BookingProvider>
    );
    const { result } = renderHook(() => useBooking(), { wrapper });

    const formData = {
      name: "John Doe",
      email: "john@example.com",
      date: "2023-06-10",
      time: "18:00",
      guests: 4,
    };

    let submissionResult;

    await act(async () => {
      submissionResult = await result.current.submitReservation(formData);
    });

    expect(window.submitAPI).toHaveBeenCalledWith(formData);
    expect(submissionResult.success).toBe(true);
    expect(submissionResult.message).toContain("success");
  });
});
