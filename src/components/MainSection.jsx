import React from "react";
import Card from "./Card";
import ReviewCard from "./ReviewCard";

import greekSalad from "../assets/menu_items/greek_salad.jpg";
import bruschetta from "../assets/menu_items/bruschettttte.jpg";
import lemonDessert from "../assets/menu_items/lemon_dessert.jpg";
import restaurant from "../assets/restaurant.jpg";
import owners from "../assets/Mario and Adrian A.jpg";

function MainSection() {
  // Menu items data
  const specials = [
    {
      id: 1,
      title: "Greek Salad",
      price: 12.99,
      description:
        "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      image: greekSalad,
      alt: "Greek Salad",
    },
    {
      id: 2,
      title: "Bruschetta",
      price: 5.99,
      description:
        "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with fresh vegetables.",
      image: bruschetta,
      alt: "Bruschetta",
    },
    {
      id: 3,
      title: "Lemon Dessert",
      price: 5.0,
      description:
        "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      image: lemonDessert,
      alt: "Lemon Dessert",
    },
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Thompson",
      rating: 5,
      text: "The food was amazing! Authentic Mediterranean flavors that transported me back to my vacation in Greece. The service was also excellent.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      rating: 4,
      text: "Great atmosphere and delicious food. The Greek salad was particularly fresh and tasty. Will definitely come back!",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
      id: 3,
      name: "Emily Chen",
      rating: 5,
      text: "One of the best Mediterranean restaurants I've been to! The lemon dessert is to die for. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 4,
      text: "The bruschetta was exceptional. Fresh ingredients and a cozy atmosphere. The staff was very friendly too.",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    },
  ];

  return (
    <main id="main-content">
      {/* Specials Section */}
      <section className="specials" aria-labelledby="specials-heading">
        <div className="container">
          <div className="specials-header">
            <h2 id="specials-heading">This Week's Specials</h2>
            <button aria-label="View full online menu">Online Menu</button>
          </div>
          <div className="specials-grid">
            {specials.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                imageSrc={item.image}
                imageAlt={item.alt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <h2 id="testimonials-heading">What our customers say</h2>
          <div className="testimonials-grid">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                rating={review.rating}
                text={review.text}
                avatar={review.avatar}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <h2>Little Lemon</h2>
            <h3>Chicago</h3>
            <p>
              Little Lemon is a charming Mediterranean restaurant located in the
              heart of Chicago. Founded by two Italian brothers, Mario and
              Adrian, who moved to the United States to pursue their shared
              dream of owning a restaurant.
            </p>
            <p>
              Our cuisine is inspired by Mediterranean family recipes that have
              been passed down through generations, focusing on fresh
              ingredients and authentic flavors with a modern twist. We look
              forward to welcoming you to our cozy establishment!
            </p>
          </div>
          <div className="about-images">
            <img
              src={restaurant}
              alt="Little Lemon Restaurant Interior"
              className="about-image-1"
            />
            <img
              src={owners}
              alt="Mario and Adrian, the owners"
              className="about-image-2"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainSection;
