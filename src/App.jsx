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
import ScrollToTop from "./Components/ScrollToTop";
import SkipLink from "./Components/SkipLink"; // Import the SkipLink component

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <div className="App">
          <SkipLink /> {/* Add the SkipLink component before the Header */}
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
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
