import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import ReservationsPage from "./pages/ReservationsPage";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import { BookingProvider } from "./context/BookingContext";
import "./styles/App.css";
import "./styles/variables.css";

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
            <Route path="/order-online" element={<OrderOnlinePage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
