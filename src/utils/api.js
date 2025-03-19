/**
 * Safe wrapper around the fetchAPI function
 * Ensures the function exists and handles errors
 */
export const fetchAvailableTimes = (date) => {
  if (typeof window.fetchAPI === "function") {
    try {
      return window.fetchAPI(date);
    } catch (error) {
      console.error("Error calling fetchAPI:", error);
      return getFallbackTimes(date);
    }
  } else {
    console.warn("fetchAPI function not found, using fallback");
    return getFallbackTimes(date);
  }
};

/**
 * Safe wrapper around the submitAPI function
 * Ensures the function exists and handles errors
 */
export const submitReservation = (formData) => {
  if (typeof window.submitAPI === "function") {
    try {
      const result = window.submitAPI(formData);
      // Return a proper promise with result information
      return Promise.resolve({
        success: Boolean(result),
        message: result
          ? "Reservation submitted successfully!"
          : "Reservation submission failed",
        reservationId: result ? Math.floor(Math.random() * 100000) : null,
        formData: formData,
      });
    } catch (error) {
      console.error("Error calling submitAPI:", error);
      return Promise.reject(error);
    }
  } else {
    console.warn("submitAPI function not found, using fallback");
    // Return a success response as fallback
    return Promise.resolve({
      success: true,
      message: "Reservation submitted successfully! (fallback)",
      reservationId: Math.floor(Math.random() * 100000),
      formData: formData,
    });
  }
};

/**
 * Fallback function for getting available times
 */
function getFallbackTimes(date) {
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();

  // Weekend (Friday, Saturday) - more time slots
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    return [
      "16:00",
      "16:30",
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
    ];
  }
  // Monday - fewer time slots
  else if (dayOfWeek === 1) {
    return ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
  }
  // Regular weekdays
  else {
    return [
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
    ];
  }
}
