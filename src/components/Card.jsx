import React from "react";

function Card({ title, price, description, imageSrc, imageAlt }) {
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
          <a href="/order-online">
            Order a delivery
            <span>🛵</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default Card;
