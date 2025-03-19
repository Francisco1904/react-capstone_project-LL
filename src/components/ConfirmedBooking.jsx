import React from "react";
import { Link, useLocation } from "react-router-dom";

function ConfirmedBooking() {
  const location = useLocation();
  const reservationData = location.state?.reservationData || {};

  // Format the date if it exists
  const formattedDate = reservationData.date
    ? new Date(reservationData.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="container">
      <div className="confirmation-container">
        <div className="success-message" role="status">
          <h1>Booking Confirmed!</h1>
          <p>Your reservation has been successfully submitted.</p>

          {reservationData.name && (
            <div className="reservation-details">
              <h2>Reservation Details</h2>
              <p>
                <strong>Name:</strong> {reservationData.name}
              </p>
              <p>
                <strong>Date:</strong> {formattedDate}
              </p>
              <p>
                <strong>Time:</strong> {reservationData.time}
              </p>
              <p>
                <strong>Number of guests:</strong> {reservationData.guests}
              </p>
              {reservationData.occasion && (
                <p>
                  <strong>Occasion:</strong> {reservationData.occasion}
                </p>
              )}
              <p>
                <strong>Confirmation Number:</strong>{" "}
                {reservationData.reservationId || "N/A"}
              </p>
            </div>
          )}

          <div className="confirmation-actions">
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
            <Link to="/menu" className="btn-secondary">
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmedBooking;
