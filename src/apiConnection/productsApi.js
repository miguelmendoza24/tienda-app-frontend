import { apiRequest } from "./apiConfig.js";

export const getProducts = (token) => {
  return apiRequest({endpoint: "product/list",method:"GET",token});
};

export const createProduct = (token, data) => {
  return apiRequest({endpoint:"product/register", method:"POST", token, body:data});
};

export const updateProduct = (token, id, data) => {
  return apiRequest({endpoint:`product/update/${id}`, method:"PUT", token, body:data});
};

export const deleteProduct = (token, id) => {
  return apiRequest({endpoint:`product/delete/${id}`,method: "DELETE", token});
};
