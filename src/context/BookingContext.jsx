import React, { createContext, useState, useContext, useCallback } from "react";
import {
  fetchAvailableTimes,
  submitReservation as apiSubmitReservation,
} from "../utils/api";

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

  // Use the utility function to fetch available times
  const fetchTimes = useCallback((date) => {
    const times = fetchAvailableTimes(date);
    setAvailableTimes(times);
  }, []);

  // Use the utility function for submission
  const submitReservation = useCallback((formData) => {
    return apiSubmitReservation(formData);
  }, []);

  // Provide all necessary values and functions to the context
  const value = {
    availableTimes,
    fetchAvailableTimes: fetchTimes,
    submitReservation,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
