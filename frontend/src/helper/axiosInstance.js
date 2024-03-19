import axios from "axios";
import { apiURL } from "../constants.js"

const axiosInstance = axios.create({
    baseURL: apiURL,
    withCredentials: true,
});

export default axiosInstance;
