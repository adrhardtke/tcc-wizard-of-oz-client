import axios from "axios";

export const api = axios.create({
  baseURL: "http://31.97.85.236:3000",
});
