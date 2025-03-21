import React from "react";
import { useEffect } from "react";

// Import images - reusing existing ones from the MainSection
import restaurant from "../assets/restaurant.jpg";
import ownersA from "../assets/Mario and Adrian A.jpg";
import ownersB from "../assets/Mario and Adrian b.jpg"; // New image

function AboutPage() {
  // Set document title and meta description for SEO
  useEffect(() => {
    document.title = "About Little Lemon | Chicago Mediterranean Restaurant";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about Little Lemon, a family-owned Mediterranean restaurant in Chicago founded by Italian brothers Mario and Adrian."
      );
    }

    // Return function to restore previous title when component unmounts
    return () => {
      document.title = "Little Lemon";
    };
  }, []);

  return (
    <div className="page-container">
      <section className="about-page">
        <h1>About Little Lemon</h1>
        <p className="intro">
          Little Lemon is a charming Mediterranean restaurant located in the
          heart of Chicago, founded by two Italian brothers with a passion for
          traditional recipes with a modern twist.
        </p>

        {/* Our Story Section */}
        <div className="about-section">
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              Little Lemon began as a dream shared by brothers Mario and Adrian,
              who moved from Italy to the United States to pursue their passion
              for sharing authentic Mediterranean cuisine. Growing up in a small
              coastal town in Italy, they were immersed in a culture where food
              was the centerpiece of family gatherings and community
              celebrations.
            </p>
            <p>
              In 2010, they took the leap and opened Little Lemon in Chicago,
              naming it after the lemon trees that dotted their childhood home's
              garden. Their vision was to create more than just a
              restaurant—they wanted to establish a place where people could
              experience the warmth and joy of Mediterranean dining traditions.
            </p>
          </div>
          <div className="about-image">
            <img
              src={restaurant}
              alt="Little Lemon restaurant interior with warm lighting and comfortable seating"
            />
          </div>
        </div>

        {/* Meet the Chefs Section */}
        <div className="about-section reverse">
          <div className="about-content">
            <h2>Meet the Chefs</h2>
            <p>
              Mario, the older brother, trained at culinary schools in Rome and
              Paris before honing his skills in Michelin-starred restaurants
              across Europe. His technical expertise and attention to detail
              ensure every dish meets the highest standards of culinary
              excellence.
            </p>
            <p>
              Adrian brings creative energy to the kitchen, constantly
              experimenting with seasonal ingredients and contemporary
              techniques while respecting traditional recipes. His innovative
              approach has helped establish Little Lemon's unique culinary
              identity that balances tradition and innovation.
            </p>
          </div>
          <div className="about-image">
            <img
              src={ownersA}
              alt="Mario and Adrian, the chef brothers behind Little Lemon, preparing ingredients in the kitchen"
            />
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="about-section">
          <div className="about-content">
            <h2>Our Philosophy</h2>
            <p>
              At Little Lemon, we believe that great food brings people
              together. Our philosophy is simple: use the freshest ingredients,
              prepare them with care, and serve them with warmth. We source
              locally whenever possible, working directly with farmers and
              suppliers who share our commitment to quality and sustainability.
            </p>
            <p>
              Every dish tells a story—whether it's a recipe passed down through
              generations or a modern creation inspired by our Mediterranean
              heritage. We invite you to join us at our table and become part of
              our story as we continue to share our passion for food, family,
              and community.
            </p>
          </div>
          <div className="about-image">
            <img
              src={ownersB}
              alt="Mario and Adrian smiling together in front of Little Lemon restaurant"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
