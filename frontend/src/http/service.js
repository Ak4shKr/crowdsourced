import axios from "axios";

const service = axios.create({
  baseURL: "https://crowdsourced.onrender.com/api",
  withCredentials: true,
});

export default service;
