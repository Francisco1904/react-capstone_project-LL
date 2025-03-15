import React from "react";

function ReservationsPage() {
  return (
    <main className="container">
      <section className="reservations-section">
        <h1>Reservations</h1>
        <p>
          Book your table at Little Lemon and enjoy our delicious Mediterranean
          cuisine.
        </p>

        <form className="reservation-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" required />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input type="time" id="time" name="time" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Occasion (optional)</label>
            <select id="occasion" name="occasion">
              <option value="">Select an occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Special Comments</label>
            <textarea id="comments" name="comments" rows="3"></textarea>
          </div>

          <button type="submit" className="btn-primary">
            Book Table
          </button>
        </form>
      </section>
    </main>
  );
}

export default ReservationsPage;
