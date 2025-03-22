import React from "react";
import { useLocation } from "react-router-dom";

function Card({ title, price, description, imageSrc, imageAlt }) {
  const location = useLocation();
  const isOrderPage = location.pathname === "/order-online";

  return (
    <article className="menu-card">
      <img src={imageSrc} alt={imageAlt} className="menu-card-image" />
      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{title}</h3>
          <span className="menu-card-price">${price}</span>
        </div>
        <p className="menu-card-description">{description}</p>
        <div className="menu-card-footer">
          {!isOrderPage ? (
            <a href="/order-online">
              Order a delivery
              <span>🛵</span>
            </a>
          ) : (
            <span className="add-to-cart-hint">
              Order a delivery
              <span>🛵</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;
