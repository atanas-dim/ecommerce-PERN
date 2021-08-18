const url = "https://pernstore.herokuapp.com/api/";

//Best Sellers
export const fetchBestSellers = async () => {
  const endpoint = `${url}/products/best-sellers`;
  const response = await fetch(endpoint);
  const jsonResponse = await response.json();

  return jsonResponse;
};

//All products by category
export const fetchProductsCategory = async (category) => {
  const endpoint = `${url}/products/category/${category}`;
  const response = await fetch(endpoint);
  const jsonResponse = await response.json();

  return jsonResponse;
};

//Get product by ID
export const fetchProductById = async (id) => {
  const endpoint = `${url}/products/${id}`;
  const response = await fetch(endpoint);
  const jsonResponse = await response.json();

  return jsonResponse;
};
