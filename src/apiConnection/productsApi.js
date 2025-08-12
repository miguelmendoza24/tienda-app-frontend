
import { apiRequest } from "./apiConfig.js";

export const getProducts = (token) => {
  return apiRequest("product/list", "GET", token);
};

export const createProduct = (token, data) => {
  return apiRequest("product", "POST", token, data);
};

export const updateProduct = (token, id, data) => {
  return apiRequest(`product/${id}`, "PUT", token, data);
};

export const deleteProduct = (token, id) => {
  return apiRequest(`product/${id}`, "DELETE", token);
};
