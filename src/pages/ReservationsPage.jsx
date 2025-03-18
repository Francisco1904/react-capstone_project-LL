import React, { useState } from "react";

function ReservationsPage() {
  // State for form fields
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

  // State for available times
  const [availableTimes, setAvailableTimes] = useState([
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    // Future enhancement: Send data to API
    alert("Reservation submitted! We'll confirm shortly.");
  };

  return (
    <main className="page-container">
      <section className="reservations-section container">
        <h1>Reservations</h1>
        <p>
          Book your table at Little Lemon and enjoy our delicious Mediterranean
          cuisine.
        </p>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a time</option>
                {/* Formats time options in a user-friendly way */}
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {new Date(`2023-01-01T${time}`).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              required
            >
              {/* Generates number of guests options dynamically with array mapping */}
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
            <label htmlFor="comments">Special Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn-primary">
            Reserve a Table
          </button>
        </form>
      </section>
    </main>
  );
}

export default ReservationsPage;
