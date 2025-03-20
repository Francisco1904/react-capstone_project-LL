import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import ReservationsPage from "./pages/ReservationsPage";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import ConfirmedBooking from "./Components/ConfirmedBooking";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route
              path="/reservations"
              element={
                <BookingProvider>
                  <ReservationsPage />
                </BookingProvider>
              }
            />
            <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
            <Route path="/order-online" element={<OrderOnlinePage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
