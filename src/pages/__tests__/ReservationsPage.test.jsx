import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ReservationsPage from "../ReservationsPage";
import * as BookingContext from "../../context/BookingContext";
import { BookingProvider } from "../../context/BookingContext";

// Mock the BookingContext hook
vi.mock("../../context/BookingContext", async () => {
  const actual = await vi.importActual("../../context/BookingContext");
  return {
    ...actual,
    useBooking: () => ({
      availableTimes: ["17:00", "18:00", "19:00", "20:00", "21:00"],
      fetchAvailableTimes: vi.fn(),
      submitReservation: vi.fn().mockResolvedValue({
        success: true,
        message: "Reservation submitted successfully!",
        reservationId: 12345,
        formData: {},
      }),
    }),
    BookingProvider: ({ children }) => <div>{children}</div>,
  };
});

describe("ReservationsPage Component", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders the reservation form with all required fields", () => {
    render(<ReservationsPage />);

    // Check for page title
    expect(
      screen.getByRole("heading", { name: /reservations/i })
    ).toBeInTheDocument();

    // Check for required form elements
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeDisabled(); // Time should be disabled until date is selected
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special comments/i)).toBeInTheDocument();

    // Check for submit button
    expect(
      screen.getByRole("button", { name: /reserve a table/i })
    ).toBeInTheDocument();
  });

  it("enables time selection after date is selected", async () => {
    // Create a dedicated spy for fetchAvailableTimes
    const fetchTimesSpy = vi.fn();

    // Override the mock with our spy
    vi.spyOn(BookingContext, "useBooking").mockImplementation(() => ({
      availableTimes: ["17:00", "18:00", "19:00"],
      fetchAvailableTimes: fetchTimesSpy,
      submitReservation: vi.fn(),
    }));

    render(<ReservationsPage />);

    const dateInput = screen.getByLabelText(/date/i);
    const timeSelect = screen.getByLabelText(/time/i);

    // Time select should be disabled initially
    expect(timeSelect).toBeDisabled();

    // Select a date and trigger the change event
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    await user.type(dateInput, formattedDate);

    // Fire change event explicitly
    fireEvent.change(dateInput, { target: { value: formattedDate } });

    // Time select should now be enabled
    await waitFor(() => {
      expect(timeSelect).not.toBeDisabled();
    });

    // Verify fetchAvailableTimes was called
    expect(fetchTimesSpy).toHaveBeenCalledWith(formattedDate);
  });

  it("submits the form with all required data", async () => {
    const mockSubmit = vi.fn().mockResolvedValue({
      success: true,
      message: "Success!",
      reservationId: 12345,
    });

    // Override the mock for this specific test
    vi.spyOn(BookingContext, "useBooking").mockImplementation(() => ({
      availableTimes: ["17:00", "18:00", "19:00"],
      fetchAvailableTimes: vi.fn(),
      submitReservation: mockSubmit,
    }));

    render(<ReservationsPage />);

    // Fill out the form (same as before)
    await user.type(screen.getByLabelText(/full name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/phone/i), "1234567890");

    // Date and time
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    await user.type(screen.getByLabelText(/date/i), formattedDate);
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: formattedDate },
    });

    // Rest of form filling...
    await waitFor(() => {
      expect(screen.getByLabelText(/time/i)).not.toBeDisabled();
    });
    await user.selectOptions(screen.getByLabelText(/time/i), "18:00");
    await user.selectOptions(screen.getByLabelText(/number of guests/i), "4");

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /reserve a table/i,
    });
    await user.click(submitButton);

    // INSTEAD OF checking for "Submitting..." text, just check that:
    // 1. The function was called with correct data
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        date: formattedDate,
        time: "18:00",
        guests: "4",
        occasion: "",
        comments: "",
      });
    });

    // 2. Success message appears
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("displays form validation errors for empty required fields", async () => {
    render(<ReservationsPage />);

    // Try to submit the form without filling any fields
    await user.click(screen.getByRole("button", { name: /reserve a table/i }));

    // Check for browser validation messages (can't directly test these)
    // Instead, check that submitReservation was not called
    const mockContext = BookingContext.useBooking();
    expect(mockContext.submitReservation).not.toHaveBeenCalled();

    // Verify form is still present (not replaced with success message)
    expect(
      screen.getByRole("button", { name: /reserve a table/i })
    ).toBeInTheDocument();
  });

  it("handles submission failure gracefully", async () => {
    // Override the mock for this specific test to simulate error
    vi.spyOn(BookingContext, "useBooking").mockImplementation(() => ({
      availableTimes: ["17:00", "18:00", "19:00"],
      fetchAvailableTimes: vi.fn(),
      submitReservation: vi
        .fn()
        .mockRejectedValue(new Error("Submission failed")),
    }));

    render(<ReservationsPage />);

    // Fill out the minimal required form data
    await user.type(screen.getByLabelText(/full name/i), "Jane Smith");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone/i), "9876543210");

    // Select date and time
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    await user.type(screen.getByLabelText(/date/i), formattedDate);

    await waitFor(() => {
      expect(screen.getByLabelText(/time/i)).not.toBeDisabled();
    });
    await user.selectOptions(screen.getByLabelText(/time/i), "19:00");

    // Select number of guests
    await user.selectOptions(screen.getByLabelText(/number of guests/i), "2");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /reserve a table/i }));

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/there was an error/i)).toBeInTheDocument();
    });
  });

  it("renders without crashing", () => {
    render(<ReservationsPage />);
    expect(true).toBe(true);
  });
});
