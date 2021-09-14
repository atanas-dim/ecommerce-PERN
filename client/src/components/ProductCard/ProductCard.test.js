import React from "react";
import { render, fireEvent } from "@testing-library/react";

import ProductCard from "./ProductCard";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const componentsToTest = (
  <Router history={history}>
    <ProductCard
      product={{
        id: 1,
        name: "Shorts",
        price: 25,
        images: ["image1", "image2"],
      }}
    />
  </Router>
);

it("renders product data correctly", () => {
  const { queryByTestId } = render(componentsToTest);

  expect(queryByTestId("product-name")).toBeTruthy();
  expect(queryByTestId("product-name")).toHaveTextContent("Short");
  expect(queryByTestId("product-price")).toHaveTextContent("£ 25");
  expect(queryByTestId("product-image")).toHaveStyle(
    `background-image: url('https://res.cloudinary.com/atanasdim/image/upload/c_thumb,w_400,g_face/v1628768881/beachshop/image1')`
  );
});

describe("Links", () => {
  describe("Image link", () => {
    it("redirect to the right product page", () => {
      const { queryByTestId } = render(componentsToTest);

      expect(queryByTestId("image-link")).toBeTruthy();
      expect(queryByTestId("image-link")).toHaveAttribute(
        "href",
        "/products/1"
      );

      fireEvent.click(queryByTestId("image-link"));

      expect(history.location.pathname).toEqual("/products/1");
    });
  });
});
