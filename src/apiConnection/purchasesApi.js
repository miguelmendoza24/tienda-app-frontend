import { apiRequest } from "./apiConfig.js";

export const createPurchase = (token, data) => {
  return apiRequest("purchase/create", "POST", token, data);
};

export const getPurchases = (token) => {
  return apiRequest("purchase/list", "GET", token);
};

export const deletePurchase = (token, id) => {
  return apiRequest(`purchase/delete/${id}`, "DELETE", token);
};

export const getUserPurchases = (token, userId) => {
  return apiRequest(`purchase/client/${userId}`, "GET", token);
};

export const buyProduct = async (token, productCode, quantity) => {
  if (!quantity || quantity <= 0) {
    throw new Error("La cantidad debe ser mayor a 0");
  }

  return createPurchase(token, {
    code: productCode,
    quantity,
  });
};