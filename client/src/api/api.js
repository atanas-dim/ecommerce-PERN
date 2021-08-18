import axiosAPI from "./axiosConfig";

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

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
