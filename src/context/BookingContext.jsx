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

  // Simulated API call to fetch available times based on date
  const fetchAvailableTimes = useCallback((date) => {
    // In a real application, this would be an API call
    console.log(`Fetching available times for: ${date}`);

    // Simulate different availability based on day of week
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    let updatedTimes = [];

    // Weekend (Friday, Saturday) - more time slots
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      updatedTimes = [
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
      updatedTimes = [
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
      updatedTimes = [
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

    setAvailableTimes(updatedTimes);
  }, []);

  // Create a submission function that could later connect to a real API
  const submitReservation = useCallback((formData) => {
    return new Promise((resolve) => {
      // Simulate API call
      console.log("Submitting reservation:", formData);

      // Simulate processing delay
      setTimeout(() => {
        // Return success response
        resolve({
          success: true,
          message: "Reservation submitted successfully!",
          reservationId: Math.floor(Math.random() * 100000),
          formData,
        });
      }, 800);
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
