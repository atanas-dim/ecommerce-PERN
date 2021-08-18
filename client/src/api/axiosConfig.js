import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://pernstore.herokuapp.com/api/",

  // withCredentials: true,
});

export default axiosAPI;
