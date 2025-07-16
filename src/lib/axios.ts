import axios from "axios";

export const api = axios.create({
  baseURL: "https://codezebra.com.br",
});
