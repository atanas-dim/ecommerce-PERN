import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

export const config = {
  headers: { Authorization: `Bearer ${getToken()}` },
};

const axiosAPI = axios.create({
  baseURL: "https://pernstore.herokuapp.com/api/",

  // withCredentials: true,
});

export default axiosAPI;
