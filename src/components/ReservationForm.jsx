import React, { useState } from "react";

function ReservationForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ...existing form submission logic...
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`reservation-form ${loading ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      {/* ...existing form fields... */}
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default ReservationForm;
