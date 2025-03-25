import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Footer from "../Footer";

describe("Footer component", () => {
  test("renders all sections - logo, navigation, contact, social", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Check logo
    expect(
      screen.getByAltText("Little Lemon Restaurant Logo")
    ).toBeInTheDocument();

    // Check sections
    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Social Media")).toBeInTheDocument();
  });

  test("displays contact information correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("123 Lemon Street, Food City")).toBeInTheDocument();
    expect(screen.getByText("(123) 456-7890")).toBeInTheDocument();
    expect(screen.getByText("contact@littlelemon.com")).toBeInTheDocument();
  });

  test("footer navigation links are clickable and go to correct destinations", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Check for navigation links in footer
    const homeLink = screen.getByRole("link", { name: /home/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });
    const menuLink = screen.getByRole("link", { name: /menu/i });

    // Verify they have correct href attributes
    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(menuLink).toHaveAttribute("href", "/menu");

    // Test interaction (click) - within Memory Router this won't navigate
    // but we can verify the interaction works
    await user.click(homeLink);
  });

  test("social media links have proper attributes", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Get all social media links
    const socialLinks = screen.getAllByRole("link", {
      name: /facebook|instagram|twitter/i,
    });

    // Verify we have social links and they have proper attributes
    expect(socialLinks.length).toBeGreaterThan(0);

    socialLinks.forEach((link) => {
      // Social links should open in new tab
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");

      // Verify href isn't empty
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href.startsWith("http")).toBeTruthy();
    });
  });
});
