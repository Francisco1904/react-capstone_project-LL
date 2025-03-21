import React from "react";
import Card from "../Components/Card";

// Updated imports to use the menu_items subfolder
import greekSalad from "../assets/menu_items/greek_salad.jpg";
import bruschetta from "../assets/menu_items/bruschettttte.jpg";
import lemonDessert from "../assets/menu_items/lemon_dessert.jpg";
import garlicBread from "../assets/menu_items/garlic_bread.jpg";
import calamari from "../assets/menu_items/calamari.jpg";
import pasta from "../assets/menu_items/pasta.jpg";
import grilled_fish from "../assets/menu_items/grilled_fish.jpg";
import baklava from "../assets/menu_items/baklava.jpg";
import tiramisu from "../assets/menu_items/tiramisu.jpg";
import mediterranianRisotto from "../assets/menu_items/mediterranian_risotto.jpg";
import mousseChocolat from "../assets/menu_items/mousse_chocolatt.jpg";
import cheesecake from "../assets/menu_items/cheesecake_LL.jpg";
import eggCrisps from "../assets/menu_items/egg-crisps.jpg";
import ricotta from "../assets/menu_items/ricotta.jpg";
import littleLemonSalad from "../assets/menu_items/the_little_lemon_salad.jpeg";

function MenuPage() {
  // Menu data organized by category
  const menuItems = {
    appetizers: [
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
        title: "Garlic Bread",
        price: 4.99,
        description:
          "Freshly baked bread topped with garlic butter, parsley, and a blend of Mediterranean herbs. Served warm and crispy.",
        image: garlicBread,
        alt: "Garlic Bread",
      },
      {
        id: 4,
        title: "Calamari",
        price: 11.99,
        description:
          "Tender squid rings lightly coated in seasoned flour and fried to golden perfection. Served with our house-made lemon aioli dip.",
        image: calamari,
        alt: "Fried Calamari",
      },
      {
        id: 6,
        title: "Egg Crisps",
        price: 8.99,
        description:
          "Delicate egg crisps topped with smoked salmon, dill cream, and capers. A delightful texture contrast in every bite.",
        image: eggCrisps,
        alt: "Egg Crisps Appetizer",
      },
      {
        id: 7,
        title: "Ricotta",
        price: 9.99,
        description:
          "House-made ricotta served with toasted sourdough, drizzled with local honey, and sprinkled with crushed pistachios and fresh herbs.",
        image: ricotta,
        alt: "Fresh Ricotta Appetizer",
      },
    ],
    mains: [
      {
        id: 1,
        title: "Greek Salad",
        price: 12.99,
        description:
          "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. Served as a filling main course.",
        image: greekSalad,
        alt: "Greek Salad",
      },
      {
        id: 5,
        title: "The Little Lemon Salad",
        price: 10.99,
        description:
          "Our signature salad featuring seasonal greens, citrus segments, avocado, pine nuts, and a refreshing lemon vinaigrette. Served in a generous portion as a satisfying main dish.",
        image: littleLemonSalad,
        alt: "The Little Lemon Salad",
      },
      {
        id: 8,
        title: "Mediterranean Pasta",
        price: 18.99,
        description:
          "Al dente pasta tossed with sun-dried tomatoes, olives, feta cheese, and fresh herbs in a light olive oil sauce. Topped with grilled chicken.",
        image: pasta,
        alt: "Mediterranean Pasta",
      },
      {
        id: 9,
        title: "Grilled Fish",
        price: 22.99,
        description:
          "Catch of the day grilled to perfection with olive oil, lemon, and Mediterranean herbs. Served with roasted vegetables and couscous.",
        image: grilled_fish,
        alt: "Grilled Fish",
      },
      {
        id: 10,
        title: "Mediterranean Risotto",
        price: 19.99,
        description:
          "Creamy arborio rice slowly cooked with white wine and vegetable broth, finished with grilled Mediterranean vegetables, fresh basil, and shaved parmesan.",
        image: mediterranianRisotto,
        alt: "Mediterranean Risotto",
      },
    ],
    desserts: [
      {
        id: 11,
        title: "Lemon Dessert",
        price: 5.0,
        description:
          "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        image: lemonDessert,
        alt: "Lemon Dessert",
      },
      {
        id: 12,
        title: "Baklava",
        price: 7.99,
        description:
          "Layers of flaky phyllo dough filled with chopped nuts and sweetened with honey syrup. A traditional Mediterranean delight.",
        image: baklava,
        alt: "Baklava",
      },
      {
        id: 13,
        title: "Tiramisu",
        price: 8.99,
        description:
          "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.",
        image: tiramisu,
        alt: "Tiramisu",
      },
      {
        id: 14,
        title: "Mousse au Chocolat",
        price: 8.99,
        description:
          "Rich and airy chocolate mousse made with premium dark chocolate and topped with fresh berries and a mint leaf. Served in an elegant glass.",
        image: mousseChocolat,
        alt: "Chocolate Mousse",
      },
      {
        id: 15,
        title: "Cheesecake",
        price: 7.99,
        description:
          "Creamy New York style cheesecake with a buttery graham cracker crust, topped with seasonal berry compote and a dollop of fresh cream.",
        image: cheesecake,
        alt: "Cheesecake",
      },
    ],
  };

  return (
    <div className="page-container">
      <section className="menu-page">
        <h1>Our Menu</h1>
        <p>
          Explore our wide variety of traditional Mediterranean dishes made with
          a modern twist.
        </p>

        {/* Appetizers Section */}
        <h2 className="menu-category-title">Appetizers</h2>
        <div className="menu-grid">
          {menuItems.appetizers.map((item) => (
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

        {/* Main Courses Section */}
        <h2 className="menu-category-title">Main Courses</h2>
        <div className="menu-grid">
          {menuItems.mains.map((item) => (
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

        {/* Desserts Section */}
        <h2 className="menu-category-title">Desserts</h2>
        <div className="menu-grid">
          {menuItems.desserts.map((item) => (
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
      </section>
    </div>
  );
}

export default MenuPage;
