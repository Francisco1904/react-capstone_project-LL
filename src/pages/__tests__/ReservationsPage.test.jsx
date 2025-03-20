import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ReservationsPage from "../ReservationsPage";
import * as BookingContext from "../../context/BookingContext";
import * as RouterDom from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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
    mockNavigate.mockClear();
  });

  it("renders the reservation form with all required fields", () => {
    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

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

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

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

  it("submits the form with all required data and navigates to confirmation", async () => {
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

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

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

    // 1. Check that the submitReservation function was called with the correct data
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

    // 2. Check that navigation was called to the confirmation page with correct data
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/confirmed-booking",
        expect.objectContaining({
          state: expect.objectContaining({
            reservationData: expect.objectContaining({
              name: "John Doe",
              reservationId: 12345,
            }),
          }),
        })
      );
    });
  });

  it("displays form validation errors for empty required fields", async () => {
    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

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

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

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
    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );
    expect(true).toBe(true);
  });

  // New validation-specific tests
  describe("Form Field Validation", () => {
    it("validates email format correctly", async () => {
      render(
        <MemoryRouter>
          <ReservationsPage />
        </MemoryRouter>
      );

      // Enter an invalid email and trigger blur
      await user.type(screen.getByLabelText(/email/i), "invalid-email");
      fireEvent.blur(screen.getByLabelText(/email/i));

      // Check for error message
      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid email address/i)
        ).toBeInTheDocument();
      });

      // Now enter a valid email
      await user.clear(screen.getByLabelText(/email/i));
      await user.type(screen.getByLabelText(/email/i), "valid@example.com");
      fireEvent.blur(screen.getByLabelText(/email/i));

      // Error should disappear
      await waitFor(() => {
        expect(
          screen.queryByText(/please enter a valid email address/i)
        ).not.toBeInTheDocument();
      });
    });

    it("validates phone number format correctly", async () => {
      render(
        <MemoryRouter>
          <ReservationsPage />
        </MemoryRouter>
      );

      // Enter an invalid phone number and trigger blur
      await user.type(screen.getByLabelText(/phone number/i), "123");
      fireEvent.blur(screen.getByLabelText(/phone number/i));

      // Check for error message
      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid phone number/i)
        ).toBeInTheDocument();
      });

      // Now enter a valid phone number
      await user.clear(screen.getByLabelText(/phone number/i));
      await user.type(screen.getByLabelText(/phone number/i), "1234567890");
      fireEvent.blur(screen.getByLabelText(/phone number/i));

      // Error should disappear
      await waitFor(() => {
        expect(
          screen.queryByText(/please enter a valid phone number/i)
        ).not.toBeInTheDocument();
      });
    });

    it("validates that date cannot be in the past", async () => {
      render(
        <MemoryRouter>
          <ReservationsPage />
        </MemoryRouter>
      );

      // Enter a past date and trigger blur
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5); // 5 days ago
      const pastDateString = pastDate.toISOString().split("T")[0];

      await user.type(screen.getByLabelText(/date/i), pastDateString);
      fireEvent.blur(screen.getByLabelText(/date/i));

      // Check for error message
      await waitFor(() => {
        expect(
          screen.getByText(/date cannot be in the past/i)
        ).toBeInTheDocument();
      });

      // Now enter a future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5); // 5 days in future
      const futureDateString = futureDate.toISOString().split("T")[0];

      await user.clear(screen.getByLabelText(/date/i));
      await user.type(screen.getByLabelText(/date/i), futureDateString);
      fireEvent.blur(screen.getByLabelText(/date/i));

      // Error should disappear
      await waitFor(() => {
        expect(
          screen.queryByText(/date cannot be in the past/i)
        ).not.toBeInTheDocument();
      });
    });

    it("validates name format correctly", async () => {
      render(
        <MemoryRouter>
          <ReservationsPage />
        </MemoryRouter>
      );

      // Enter an invalid name with numbers and trigger blur
      await user.type(screen.getByLabelText(/full name/i), "John123");
      fireEvent.blur(screen.getByLabelText(/full name/i));

      // Check for error message
      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid name/i)
        ).toBeInTheDocument();
      });

      // Now enter a valid name
      await user.clear(screen.getByLabelText(/full name/i));
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      fireEvent.blur(screen.getByLabelText(/full name/i));

      // Error should disappear
      await waitFor(() => {
        expect(
          screen.queryByText(/please enter a valid name/i)
        ).not.toBeInTheDocument();
      });
    });

    it("shows error when trying to submit with empty required fields", async () => {
      render(
        <MemoryRouter>
          <ReservationsPage />
        </MemoryRouter>
      );

      // Submit button should be disabled initially since form is invalid
      const submitButton = screen.getByRole("button", {
        name: /reserve a table/i,
      });
      expect(submitButton).toBeDisabled();

      // Type and clear to trigger validation on name field
      await user.type(screen.getByLabelText(/full name/i), "a");
      await user.clear(screen.getByLabelText(/full name/i));
      fireEvent.blur(screen.getByLabelText(/full name/i));

      // Check that validation is working
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(
          screen.getByText(/please fix the following errors/i)
        ).toBeInTheDocument();
      });

      // Verify the error summary contains expected content
      const errorSummary = screen
        .getByText(/please fix the following errors/i)
        .closest("div");
      expect(within(errorSummary).getByText(/full name/i)).toBeInTheDocument();
      expect(
        within(errorSummary).getByText(/required field/i)
      ).toBeInTheDocument();

      // Form should remain invalid
      expect(submitButton).toBeDisabled();
    });

    it("enables submit button only when all validations pass", async () => {
      render(
        <MemoryRouter>
          <ReservationsPage />
        </MemoryRouter>
      );

      const submitButton = screen.getByRole("button", {
        name: /reserve a table/i,
      });

      // Button should be disabled initially
      expect(submitButton).toBeDisabled();

      // Fill in all required fields with valid data
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(screen.getByLabelText(/phone/i), "1234567890");

      // Select date and time
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      await user.type(screen.getByLabelText(/date/i), formattedDate);
      fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: formattedDate },
      });

      // Wait for time select to be enabled
      await waitFor(() => {
        expect(screen.getByLabelText(/time/i)).not.toBeDisabled();
      });
      await user.selectOptions(screen.getByLabelText(/time/i), "18:00");

      // Select number of guests
      await user.selectOptions(screen.getByLabelText(/guests/i), "4");

      // Button should now be enabled
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });
});
