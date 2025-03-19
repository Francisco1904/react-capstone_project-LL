import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function ReservationsPage() {
  // Get booking functions and state from context
  const { availableTimes, fetchAvailableTimes, submitReservation } =
    useBooking();
  const navigate = useNavigate();

  // Local state for form and submission
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Update times when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableTimes(formData.date);
    }
  }, [formData.date, fetchAvailableTimes]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data with new values
    setFormData((prevData) => {
      // Clear time selection when date changes
      if (name === "date") {
        return { ...prevData, [name]: value, time: "" };
      }
      return { ...prevData, [name]: value };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit data through the context function
      const result = await submitReservation(formData);
      setSubmitResult(result);

      // Navigate to confirmed booking page if successful
      if (result.success) {
        // Navigate to the confirmed booking page with reservation data
        navigate("/confirmed-booking", {
          state: {
            reservationData: {
              ...formData,
              reservationId: result.reservationId,
            },
          },
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message:
          "There was an error submitting your reservation. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-container" role="main">
      <section className="reservations-section container">
        <h1>Reservations</h1>
        <p>
          Book your table at Little Lemon and enjoy our delicious Mediterranean
          cuisine.
        </p>

        {/* Show error message when submission fails */}
        {submitResult && !submitResult.success && (
          <div className="error-message" role="alert" aria-live="assertive">
            <p>{submitResult.message}</p>
          </div>
        )}

        {/* Form is always shown unless navigation occurs */}
        <form
          className="reservation-form"
          onSubmit={handleSubmit}
          aria-labelledby="reservation-form-title"
        >
          <h2 id="reservation-form-title" className="visually-hidden">
            Reservation Form
          </h2>

          <div className="form-group">
            <label htmlFor="name">
              Full Name{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">
                Date{" "}
                <span style={{ color: "red" }} aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]} // Prevent past date selection
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">
                Time{" "}
                <span style={{ color: "red" }} aria-hidden="true">
                  *
                </span>
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                aria-required="true"
                disabled={!formData.date} // Disable until date is selected
              >
                <option value="">Select a time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {new Date(`2023-01-01T${time}`).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
              </select>
              {!formData.date && (
                <span className="helper-text">Please select a date first</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">
              Number of Guests{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              required
              aria-required="true"
            >
              <option value="">Select number of guests</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion (optional)</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
            >
              <option value="">Select an occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Special Comments (optional)</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Reserve a Table"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ReservationsPage;
