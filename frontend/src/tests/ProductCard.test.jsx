import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/product/ProductCard";
import { renderWithProviders } from "./test-utils";
import { BrowserRouter } from "react-router-dom";

const mockProduct = {
  _id: "1",
  name: "Test Laptop",
  price: 999.99,
  image: "laptop.jpg",
  rating: 4.5,
  oldPrice: 1199.99,
};

describe("ProductCard Component", () => {
  it("renders product name and price correctly", () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Laptop")).toBeDefined();
    expect(screen.getByText("$999.99")).toBeDefined();
    expect(screen.getByText("$1199.99")).toBeDefined();
  });

  it("adds product to favorites on click if logged in", async () => {
    // stub global fetch
    const fetchSpy = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    vi.stubGlobal("fetch", fetchSpy);

    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>,
      {
        preloadedState: {
          auth: { user: { token: "fake-token" } },
        },
      }
    );

    const favoriteBtn = screen.getByTitle("Add to Favourites");
    fireEvent.click(favoriteBtn);

    expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/api/favorites"),
        expect.objectContaining({ method: "POST" })
    );
  });
});
