import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";

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
  const [cart, setCart] = useState(() => {
    try {
      // Get cart from localStorage when component mounts
      const savedCart = localStorage.getItem("lemonCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Initialize menu items directly instead of using a simulated API call
  const [menuItems] = useState({
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

  // Add notification state
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success", // could be "success", "error", etc.
  });

  // Add effect to hide notification after timeout
  useEffect(() => {
    let timeoutId;

    if (notification.visible) {
      timeoutId = setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [notification.visible]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("lemonCart", JSON.stringify(cart));
  }, [cart]);

  // Add responsive listener to detect mobile viewport
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add effect to show notification when new items are added via navigation
  useEffect(() => {
    // Check if this was a navigation from another page
    // with an item already added to the cart
    const params = new URLSearchParams(location.search);
    const fromNav = params.get("fromNav") === "true";

    if (fromNav) {
      // Get the most recently added item
      const cartItems = JSON.parse(localStorage.getItem("lemonCart") || "[]");
      if (cartItems.length > 0) {
        const latestItem = cartItems[cartItems.length - 1];

        // Show notification about the added item
        setNotification({
          visible: true,
          message: `${latestItem.title} added to your cart!`,
          type: "success",
        });

        // Update internal cart state
        setCart(cartItems);

        // Clean up the URL
        window.history.replaceState({}, document.title, "/order-online");
      }
    }
  }, [location]);

  // Modify addToCart to show notification
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // If item exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };

        // Show notification with quantity
        setNotification({
          visible: true,
          message: `Added another ${item.title} to your cart!`,
          type: "success",
        });

        return updatedCart;
      } else {
        // Otherwise add new item with quantity 1
        setNotification({
          visible: true,
          message: `${item.title} added to your cart!`,
          type: "success",
        });

        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];

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

        return updatedCart;
      }
      return prevCart;
    });
  };

  // Calculate cart total
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Add reference to cart summary section
  const cartSummaryRef = useRef(null);

  // Function to scroll to the cart section
  const scrollToCart = () => {
    cartSummaryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="page-container" aria-live="polite">
      {/* Add notification component */}
      <div
        className={`cart-notification ${notification.visible ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className="notification-content">{notification.message}</div>
      </div>

      {/* Floating cart button */}
      {totalItems > 0 && (
        <button
          className="floating-cart-btn"
          onClick={scrollToCart}
          aria-label={`View cart with ${totalItems} items`}
        >
          <span className="cart-icon">🛒</span>
          <span className="cart-text">View Cart</span>
          <span className="cart-count">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </button>
      )}

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
          {menuItems[activeCategory]?.map((item) => (
            <div
              key={item.id}
              className="order-card-container"
              onClick={isMobile ? undefined : () => addToCart(item)}
              onKeyDown={
                isMobile
                  ? undefined
                  : (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        addToCart(item);
                      }
                    }
              }
              tabIndex={isMobile ? undefined : 0}
              role={isMobile ? undefined : "button"}
              aria-label={isMobile ? undefined : `Add ${item.title} to cart`}
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
        <div
          className="cart-summary"
          aria-live="polite"
          ref={cartSummaryRef}
          id="cart-summary"
        >
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
