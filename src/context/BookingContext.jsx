import React, { createContext, useState, useContext, useCallback } from "react";

// Create the context
const BookingContext = createContext();

// Custom hook for consuming the booking context
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

// Provider component to manage booking state
export function BookingProvider({ children }) {
  // State for available reservation times
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

  // Use the actual fetchAPI function from the included script
  const fetchAvailableTimes = useCallback((date) => {
    try {
      // Call the API function from the included script
      const times = window.fetchAPI(date);
      setAvailableTimes(times);
    } catch (error) {
      console.error("Error fetching available times:", error);

      // Fallback to the simulated logic if API call fails
      const selectedDate = new Date(date);
      const dayOfWeek = selectedDate.getDay();

      let fallbackTimes = [];

      // Weekend (Friday, Saturday) - more time slots
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        fallbackTimes = [
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
        fallbackTimes = [
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
        ];
      }
      // Regular weekdays
      else {
        fallbackTimes = [
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

      setAvailableTimes(fallbackTimes);
    }
  }, []);

  // Use the actual submitAPI function from the included script
  const submitReservation = useCallback((formData) => {
    return new Promise((resolve, reject) => {
      try {
        // Call the API function from the included script
        const success = window.submitAPI(formData);

        if (success) {
          resolve({
            success: true,
            message: "Reservation submitted successfully!",
            reservationId: Math.floor(Math.random() * 100000),
            formData,
          });
        } else {
          reject(new Error("Submission failed"));
        }
      } catch (error) {
        console.error("Error submitting reservation:", error);
        reject(error);
      }
    });
  }, []);

  // Provide all necessary values and functions to the context
  const value = {
    availableTimes,
    fetchAvailableTimes,
    submitReservation,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
