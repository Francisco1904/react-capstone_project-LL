import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Card({ title, price, description, imageSrc, imageAlt }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isOrderPage = location.pathname === "/order-online";

  const handleCardClick = () => {
    // Create item object
    const item = {
      id: title.toLowerCase().replace(/\s+/g, "-"), // Generate an ID if not provided
      title,
      price,
      description,
      image: imageSrc,
      alt: imageAlt,
      quantity: 1,
    };

    // Get existing cart from localStorage or create empty array
    const existingCart = JSON.parse(localStorage.getItem("lemonCart") || "[]");

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (cartItem) =>
        cartItem.title === item.title && cartItem.price === item.price
    );

    if (existingItemIndex !== -1) {
      // Item exists, increase quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      existingCart.push(item);
    }

    // Save updated cart to localStorage
    localStorage.setItem("lemonCart", JSON.stringify(existingCart));

    // Navigate to order page if not already there
    if (!isOrderPage) {
      navigate("/order-online");
    }
  };

  return (
    <article className="menu-card" onClick={handleCardClick}>
      <img src={imageSrc} alt={imageAlt} className="menu-card-image" />
      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{title}</h3>
          <span className="menu-card-price">${price}</span>
        </div>
        <p className="menu-card-description">{description}</p>
        <div className="menu-card-footer">
          {!isOrderPage ? (
            <span className="add-to-cart-hint">
              Order a delivery
              <span>🛵</span>
            </span>
          ) : (
            <span className="add-to-cart-hint">
              Add to cart
              <span>🛒</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;
