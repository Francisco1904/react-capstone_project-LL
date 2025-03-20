import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function ReservationsPage() {
  // Get booking functions and state from context
  const { availableTimes, fetchAvailableTimes, submitReservation } =
    useBooking();
  const navigate = useNavigate();

  // Create refs for form elements to enable focus management
  const formRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    date: useRef(null),
    time: useRef(null),
    guests: useRef(null),
  };

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

  // Add validation state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  // Track which fields have been touched (visited/blurred)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    date: false,
    time: false,
    guests: false,
  });

  // Add state to track form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // Update times when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableTimes(formData.date);
    }
  }, [formData.date, fetchAvailableTimes]);

  // Check form validity whenever form data or errors change
  useEffect(() => {
    // Check if all required fields are filled and have no errors
    const requiredFields = ["name", "email", "phone", "date", "time", "guests"];
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const allFieldsFilled = requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );

    setIsFormValid(allFieldsFilled && !hasErrors);
  }, [formData, errors]);

  // Validation function for each field
  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "name":
        if (!value) {
          errorMessage = "Name is required";
        } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
          errorMessage = "Please enter a valid name";
        }
        break;

      case "email":
        if (!value) {
          errorMessage = "Email is required";
        } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
          errorMessage =
            "Please enter a valid email address. Example: user@example.com";
        }
        break;

      case "phone":
        if (!value) {
          errorMessage = "Phone number is required";
        } else if (!/[0-9]{9,15}/.test(value)) {
          errorMessage = "Please enter a valid phone number (9-15 digits)";
        }
        break;

      case "date":
        if (!value) {
          errorMessage = "Date is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate < today) {
            errorMessage = "Date cannot be in the past";
          }
        }
        break;

      case "time":
        if (!value && formData.date) {
          errorMessage = "Please select a time";
        }
        break;

      case "guests":
        if (!value) {
          errorMessage = "Please select number of guests";
        }
        break;

      default:
        break;
    }

    return errorMessage;
  };

  // Handle input changes - update form data and re-validate if field has errors or is touched
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

    // Re-validate the field if it has been touched or has errors
    if (touched[name] || errors[name]) {
      const errorMessage = validateField(name, value);

      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  // Handle blur events - validate when user leaves a field
  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Mark the field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate the field
    const errorMessage = validateField(name, value);

    // Update errors state
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  // Focus the first field with an error
  const focusFirstError = (errorFields) => {
    for (const field of Object.keys(errorFields)) {
      if (errorFields[field] && formRefs[field]?.current) {
        formRefs[field].current.focus();
        break;
      }
    }
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched on submit
    const allTouched = {};
    Object.keys(formData).forEach((field) => {
      if (field !== "occasion" && field !== "comments") {
        allTouched[field] = true;
      }
    });
    setTouched(allTouched);

    // Validate all fields before submission
    let formIsValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (field === "occasion" || field === "comments") return; // Skip optional fields

      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        formIsValid = false;
        newErrors[field] = errorMessage;
      }
    });

    // Update errors state
    setErrors(newErrors);

    // If form is invalid, focus the first field with an error and stop submission
    if (!formIsValid) {
      focusFirstError(newErrors);
      return;
    }

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

  // Handle error message navigation with keyboard
  const handleErrorKeyDown = (e, fieldName) => {
    if (e.key === "Enter" || e.key === " ") {
      // If user presses enter or space on the error message, focus the associated field
      formRefs[fieldName]?.current?.focus();
    }
  };

  // Make the whole date input clickable with fallback for testing environments
  const handleDateFieldClick = () => {
    try {
      // Only try to use showPicker if the ref exists and the method is available
      if (
        formRefs.date.current &&
        typeof formRefs.date.current.showPicker === "function"
      ) {
        formRefs.date.current.showPicker();
      } else {
        // Fallback for environments that don't support showPicker (like Jest/JSDOM)
        formRefs.date.current?.focus();
      }
    } catch (error) {
      // If any error occurs, just focus the input as fallback
      console.log(
        "Date picker not supported in this environment, using focus instead"
      );
      formRefs.date.current?.focus();
    }
  };

  return (
    <main id="main-content" className="page-container" role="main">
      <section className="reservations-section container">
        <h1>Reservations</h1>
        <p>
          Book your table at Little Lemon and enjoy our delicious Mediterranean
          cuisine.
        </p>

        {/* Show error message when submission fails */}
        {submitResult && !submitResult.success && (
          <div
            className="error-message"
            role="alert"
            aria-live="assertive"
            tabIndex={0}
          >
            <p>{submitResult.message}</p>
          </div>
        )}

        {/* Form with validation */}
        <form
          className="reservation-form"
          onSubmit={handleSubmit}
          aria-labelledby="reservation-form-title"
          noValidate
        >
          <h2 id="reservation-form-title" className="visually-hidden">
            Reservation Form
          </h2>

          {/* Error summary for screen readers - only show when there are actual errors */}
          {Object.values(errors).some((error) => error !== "") && (
            <div className="error-summary" role="alert" aria-live="polite">
              <h3>Please fix the following errors:</h3>
              <ul>
                {Object.entries(errors)
                  .filter(([_, message]) => message !== "")
                  .map(([field, message]) => {
                    // Create simplified error messages for the summary
                    let summaryMessage = "";
                    if (message.includes("required")) {
                      summaryMessage = "Required field";
                    } else if (message.includes("valid")) {
                      summaryMessage = "Invalid format";
                    } else if (message.includes("past")) {
                      summaryMessage = "Invalid date";
                    } else {
                      summaryMessage = "Error";
                    }

                    return (
                      <li key={field}>
                        <a href={`#${field}`}>
                          {field === "name"
                            ? "Full Name"
                            : field === "email"
                            ? "Email Address"
                            : field === "phone"
                            ? "Phone Number"
                            : field === "date"
                            ? "Reservation Date"
                            : field === "time"
                            ? "Reservation Time"
                            : field === "guests"
                            ? "Guest Count"
                            : field.charAt(0).toUpperCase() + field.slice(1)}
                          : {summaryMessage}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">
              Full Name{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
              <span className="visually-hidden">(required)</span>
            </label>
            <div className="input-with-validation">
              <input
                type="text"
                placeholder="Enter your full name"
                id="name"
                name="name"
                ref={formRefs.name}
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={touched.name && errors.name ? "true" : "false"}
                aria-describedby={
                  touched.name && errors.name ? "name-error" : undefined
                }
                required
              />
              {touched.name && errors.name && (
                <span
                  className="validation-error"
                  id="name-error"
                  role="alert"
                  tabIndex={0}
                  onKeyDown={(e) => handleErrorKeyDown(e, "name")}
                >
                  {errors.name}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </label>
            <div className="input-with-validation">
              <input
                type="email"
                id="email"
                name="email"
                ref={formRefs.email}
                autoCapitalize="none"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={touched.email && errors.email ? "true" : "false"}
                aria-describedby={
                  touched.email && errors.email ? "email-error" : undefined
                }
                required
              />
              {touched.email && errors.email && (
                <span
                  className="validation-error"
                  id="email-error"
                  role="alert"
                  tabIndex={0}
                  onKeyDown={(e) => handleErrorKeyDown(e, "email")}
                >
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </label>
            <div className="input-with-validation">
              <input
                type="tel"
                inputMode="numeric"
                id="phone"
                name="phone"
                ref={formRefs.phone}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={touched.phone && errors.phone ? "true" : "false"}
                aria-describedby={
                  touched.phone && errors.phone ? "phone-error" : undefined
                }
                required
              />
              {touched.phone && errors.phone && (
                <span
                  className="validation-error"
                  id="phone-error"
                  role="alert"
                  tabIndex={0}
                  onKeyDown={(e) => handleErrorKeyDown(e, "phone")}
                >
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">
                Date{" "}
                <span style={{ color: "red" }} aria-hidden="true">
                  *
                </span>
              </label>
              <div
                className="input-with-validation"
                onClick={handleDateFieldClick}
              >
                <input
                  type="date"
                  id="date"
                  name="date"
                  ref={formRefs.date}
                  value={formData.date}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  aria-invalid={touched.date && errors.date ? "true" : "false"}
                  aria-describedby={
                    touched.date && errors.date ? "date-error" : undefined
                  }
                  required
                />
                {touched.date && errors.date && (
                  <span
                    className="validation-error"
                    id="date-error"
                    role="alert"
                    tabIndex={0}
                    onKeyDown={(e) => handleErrorKeyDown(e, "date")}
                    onClick={(e) => e.stopPropagation()} // Prevent opening the date picker when clicking on error
                  >
                    {errors.date}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="time">
                Time{" "}
                <span style={{ color: "red" }} aria-hidden="true">
                  *
                </span>
                <span className="visually-hidden">(required)</span>
              </label>
              <div className="input-with-validation">
                <select
                  id="time"
                  name="time"
                  ref={formRefs.time}
                  value={formData.time}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={touched.time && errors.time ? "true" : "false"}
                  aria-describedby={
                    touched.time && errors.time
                      ? "time-error"
                      : !formData.date
                      ? "time-hint"
                      : undefined
                  }
                  required
                  disabled={!formData.date}
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
                  <span className="helper-text" id="time-hint">
                    Please select a date first
                  </span>
                )}
                {touched.time && errors.time && (
                  <span
                    className="validation-error"
                    id="time-error"
                    role="alert"
                    tabIndex={0}
                    onKeyDown={(e) => handleErrorKeyDown(e, "time")}
                  >
                    {errors.time}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">
              Number of Guests{" "}
              <span style={{ color: "red" }} aria-hidden="true">
                *
              </span>
            </label>
            <div className="input-with-validation">
              <select
                id="guests"
                name="guests"
                ref={formRefs.guests}
                value={formData.guests}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={
                  touched.guests && errors.guests ? "true" : "false"
                }
                aria-describedby={
                  touched.guests && errors.guests ? "guests-error" : undefined
                }
                required
              >
                <option value="">Select number of guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {touched.guests && errors.guests && (
                <span
                  className="validation-error"
                  id="guests-error"
                  role="alert"
                  tabIndex={0}
                  onKeyDown={(e) => handleErrorKeyDown(e, "guests")}
                >
                  {errors.guests}
                </span>
              )}
            </div>
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
              maxLength="500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || !isFormValid}
            aria-busy={isSubmitting ? "true" : "false"}
          >
            {isSubmitting ? "Submitting..." : "Reserve a Table"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ReservationsPage;
