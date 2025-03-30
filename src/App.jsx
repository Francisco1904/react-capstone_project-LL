import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import ReservationsPage from "./pages/ReservationsPage";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import ConfirmedBooking from "./components/ConfirmedBooking";
import { BookingProvider } from "./context/BookingContext";
import ScrollToTop from "./components/ScrollToTop";
import SkipLink from "./components/SkipLink";
import "./styles/css/main.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <div className="App">
          <SkipLink />
          <Header />
          <main className="main-content" id="main-content" tabIndex="-1">
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
          <Analytics />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
