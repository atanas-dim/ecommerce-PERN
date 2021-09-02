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
export const fetchAddCartProduct = async (data) => {
  const { cart_id, id, quantity, size } = data;

  const body = {
    product_id: id,
    quantity,
    size,
  };

  const response = await axiosAPI.post(
    `/carts/${cart_id}`,
    body,
    createConfig()
  );
  return response.data;
};

// Delete product from cart
export const fetchDeleteCartProduct = async (data) => {
  const { cart_id, product_id, size } = data;

  const config = createConfig();

  config.data = {
    size,
  };

  const response = await axiosAPI.delete(
    `/carts/${cart_id}/product/${product_id}`,
    config
  );
  return response.data;
};

// Update product from cart
export const fetchUpdateCartProduct = async (data) => {
  console.log(data);
  const { cart_id, id, quantity, size } = data;

  const config = createConfig();

  const body = {
    product_id: id,
    quantity,
    size,
  };

  console.log(body);

  const response = await axiosAPI.put(
    `/carts/${cart_id}`,
    body,
    createConfig()
  );
  return response.data;
};
