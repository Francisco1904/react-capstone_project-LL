import React, { useState, useEffect } from "react";
import Card from "../Components/Card";

// Import the same food images used in MenuPage
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

function OrderOnlinePage() {
  // State management
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState(null);

  // Fetch menu data (simulated API call)
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Simulate API fetch with timeout
    const fetchTimeout = setTimeout(() => {
      try {
        // Using the same menu data structure as MenuPage
        setMenuItems({
          appetizers: [
            {
              id: "a1",
              title: "Bruschetta",
              price: 5.99,
              description:
                "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
              image: bruschetta,
              alt: "Bruschetta",
            },
            {
              id: "a2",
              title: "Garlic Bread",
              price: 4.99,
              description:
                "Freshly baked bread topped with garlic butter, parsley, and a blend of Mediterranean herbs.",
              image: garlicBread,
              alt: "Garlic Bread",
            },
            {
              id: "a3",
              title: "Calamari",
              price: 5.99,
              description:
                "Tender squid rings lightly coated in seasoned flour and fried to golden perfection.",
              image: calamari,
              alt: "Fried Calamari",
            },
            {
              id: "a4",
              title: "Egg Crisps",
              price: 5.99,
              description:
                "Delicate egg crisps topped with smoked salmon, dill cream, and capers.",
              image: eggCrisps,
              alt: "Egg Crisps Appetizer",
            },
            {
              id: "a5",
              title: "Ricotta",
              price: 9.99,
              description:
                "House-made ricotta served with toasted sourdough, drizzled with local honey.",
              image: ricotta,
              alt: "Fresh Ricotta Appetizer",
            },
          ],
          mains: [
            {
              id: "m1",
              title: "Greek Salad",
              price: 12.99,
              description:
                "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese.",
              image: greekSalad,
              alt: "Greek Salad",
            },
            {
              id: "m2",
              title: "Little Lemon Salad",
              price: 10.99,
              description:
                "Our signature salad featuring seasonal greens, citrus segments, avocado, pine nuts, and a refreshing lemon vinaigrette.",
              image: littleLemonSalad,
              alt: "The Little Lemon Salad",
            },
            {
              id: "m3",
              title: "Mediterranean Pasta",
              price: 18.99,
              description:
                "Al dente pasta tossed with sun-dried tomatoes, olives, feta cheese, and fresh herbs.",
              image: pasta,
              alt: "Mediterranean Pasta",
            },
            {
              id: "m4",
              title: "Grilled Fish",
              price: 22.99,
              description:
                "Catch of the day grilled to perfection with olive oil, lemon, and Mediterranean herbs.",
              image: grilled_fish,
              alt: "Grilled Fish",
            },
            {
              id: "m5",
              title: "Mediterranean Risotto",
              price: 19.99,
              description:
                "Creamy arborio rice slowly cooked with white wine and vegetable broth.",
              image: mediterranianRisotto,
              alt: "Mediterranean Risotto",
            },
          ],
          desserts: [
            {
              id: "d1",
              title: "Lemon Dessert",
              price: 5.0,
              description:
                "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
              image: lemonDessert,
              alt: "Lemon Dessert",
            },
            {
              id: "d2",
              title: "Baklava",
              price: 7.99,
              description:
                "Layers of flaky phyllo dough filled with chopped nuts and sweetened with honey syrup.",
              image: baklava,
              alt: "Baklava",
            },
            {
              id: "d3",
              title: "Tiramisu",
              price: 8.99,
              description:
                "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.",
              image: tiramisu,
              alt: "Tiramisu",
            },
            {
              id: "d4",
              title: "Mousse au Chocolat",
              price: 8.99,
              description:
                "Rich and airy chocolate mousse made with premium dark chocolate.",
              image: mousseChocolat,
              alt: "Chocolate Mousse",
            },
            {
              id: "d5",
              title: "Cheesecake",
              price: 7.99,
              description:
                "Creamy New York style cheesecake with a buttery graham cracker crust.",
              image: cheesecake,
              alt: "Cheesecake",
            },
          ],
        });
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load menu items. Please try again later.");
        setIsLoading(false);
      }
    }, 500); // Simulate loading delay

    // Clean up timeout
    return () => clearTimeout(fetchTimeout);
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
      setCart(updatedCart);
    } else {
      // Otherwise add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];

      if (updatedCart[existingItemIndex].quantity === 1) {
        // If quantity is 1, remove the item
        updatedCart.splice(existingItemIndex, 1);
      } else {
        // Otherwise decrease quantity
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity - 1,
        };
      }

      setCart(updatedCart);
    }
  };

  // Calculate cart total
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handle error/loading states with proper accessibility
  if (isLoading) {
    return (
      <main className="page-container" aria-live="polite">
        <section className="order-page">
          <h1>Order Online</h1>
          <p>Loading our delicious menu options...</p>
          <div
            className="loading-spinner"
            aria-busy="true"
            aria-label="Loading menu items"
          >
            <div className="spinner"></div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container" aria-live="polite">
        <section className="order-page">
          <h1>Order Online</h1>
          <div className="error-message" role="alert">
            <p>{error}</p>
            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
              aria-label="Reload page"
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container" aria-live="polite">
      <section className="order-page">
        <h1>Order Online</h1>
        <p>
          Select your favorite dishes for delivery or pickup. Add items to your
          cart and proceed to checkout.
        </p>

        {/* Category selection */}
        <div
          className="order-categories"
          role="tablist"
          aria-label="Menu categories"
        >
          <button
            className={activeCategory === "appetizers" ? "active" : ""}
            onClick={() => setActiveCategory("appetizers")}
            role="tab"
            aria-selected={activeCategory === "appetizers"}
            id="tab-appetizers"
            aria-controls="panel-appetizers"
          >
            Appetizers
          </button>
          <button
            className={activeCategory === "mains" ? "active" : ""}
            onClick={() => setActiveCategory("mains")}
            role="tab"
            aria-selected={activeCategory === "mains"}
            id="tab-mains"
            aria-controls="panel-mains"
          >
            Main Courses
          </button>
          <button
            className={activeCategory === "desserts" ? "active" : ""}
            onClick={() => setActiveCategory("desserts")}
            role="tab"
            aria-selected={activeCategory === "desserts"}
            id="tab-desserts"
            aria-controls="panel-desserts"
          >
            Desserts
          </button>
        </div>

        {/* Menu items display */}
        <div
          className="order-grid"
          role="tabpanel"
          id={`panel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
        >
          {menuItems &&
            menuItems[activeCategory]?.map((item) => (
              <div
                key={item.id}
                className="order-card-container"
                onClick={() => addToCart(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    addToCart(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Add ${item.title} to cart`}
              >
                <Card
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  imageSrc={item.image}
                  imageAlt={item.alt}
                />
                <button
                  className="btn-add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent's onClick
                    addToCart(item);
                  }}
                  aria-label={`Add ${item.title} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>

        {/* Shopping cart */}
        <div className="cart-summary" aria-live="polite">
          <h2>Your Order Summary</h2>

          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty</p>
          ) : (
            <>
              <ul className="cart-items" aria-label="Shopping cart items">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <span className="cart-item-title">{item.title}</span>
                      <span className="cart-item-price">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="cart-item-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove one ${item.title} from cart`}
                      >
                        -
                      </button>
                      <span
                        className="quantity-display"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() => addToCart(item)}
                        aria-label={`Add one more ${item.title} to cart`}
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>

              <button
                className="btn-primary checkout-btn"
                aria-label={`Proceed to checkout, total amount $${calculateTotal()}`}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default OrderOnlinePage;
