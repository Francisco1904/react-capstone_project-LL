function MainSection() {
  return (
    <main>
      {/* Specials */}
      <section className="specials">
        <h2>This Week's Specials</h2>
        <div className="specials-grid">{/* 3 cards */}</div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Reviews</h2>
        {/* ... */}
      </section>

      {/* About */}
      <section className="about">
        <h2>About Little Lemon</h2>
        <p>
          Located in the heart of Chicago, Little Lemon brings the vibrant
          flavors of the Mediterranean...
        </p>
        {/* Possibly images */}
      </section>
    </main>
  );
}

export default MainSection;
