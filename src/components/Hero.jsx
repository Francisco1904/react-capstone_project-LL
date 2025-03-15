function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family-owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <button>Reserve a Table</button>
      </div>
      <div className="hero-image">
        <img src="/assets/hero-image.jpg" alt="Delicious Mediterranean Dish" />
      </div>
    </section>
  );
}

export default Hero;
