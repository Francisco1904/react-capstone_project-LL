import React from "react";

const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(e) => {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.focus();
          mainContent.setAttribute("tabIndex", "-1");
        }
      }}
    >
      Skip to content
    </a>
  );
};

export default SkipLink;
