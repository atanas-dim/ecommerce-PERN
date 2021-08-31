import axiosAPI, { createConfig } from "./axiosConfig";

//Best Sellers
export const fetchBestSellers = async () => {
  const response = await axiosAPI.get("/products/best-sellers");
  return response.data;
};

//All products by category
export const fetchProductsCategory = async (category) => {
  const response = await axiosAPI.get(`/products/category/${category}`);
  return response.data;
};

//Get product by ID
export const fetchProductById = async (id) => {
  const response = await axiosAPI.get(`/products/${id}`);
  return response.data;
};

// Get user
export const fetchUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  const response = await axiosAPI.post(`/auth/login`, body);
  return response.data;
};

// Get cart with products
export const fetchCartProducts = async (cart_id) => {
  const response = await axiosAPI.get(`/carts/${cart_id}`, createConfig());
  return response.data;
};

// Add product to cart
export const postCartProduct = async (data) => {
  const { cart_id, product_id, quantity, size } = data;

  const body = {
    product_id: product_id,
    quantity: quantity,
    size: size,
  };

  const response = await axiosAPI.post(
    `/carts/${cart_id}`,
    body,
    createConfig()
  );
  return response.data;
};

// Delete product from cart
export const removeCartProduct = async (data) => {
  const { cart_id, product_id, size } = data;
  const body = {
    size: size,
  };

  const response = await axiosAPI.delete(
    `/carts/${cart_id}/product/${product_id}`,
    body,
    createConfig()
  );
  return response.data;
};
