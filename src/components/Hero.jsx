import React from "react";
import { Link } from "react-router-dom";
import restaurantFood from "../assets/restauranfood.jpg"; // Ensure this path is correct

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <h3>
            We are a family-owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </h3>
          <Link to="/reservations">
            <button>Reserve a Table</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={restaurantFood} alt="Delicious Mediterranean Dish" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
