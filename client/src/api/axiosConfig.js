import axios from "axios";

export const createConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const axiosAPI = axios.create({
  baseURL: "https://pernstore.herokuapp.com/api/",
  // baseURL: "http://localhost:4000/api/",

  // withCredentials: true,
});

export default axiosAPI;
