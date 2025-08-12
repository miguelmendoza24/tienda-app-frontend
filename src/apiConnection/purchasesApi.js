import { apiRequest } from "./apiConfig.js";

export const createPurchase = (token, data) => {
  return apiRequest({endpoint:"purchase/create", method: "POST", token, body: data});
};

export const getPurchases = (token) => {
  return apiRequest({endpoint:"purchase/list", method:"GET", token});
};

export const deletePurchase = (token, id) => {
  return apiRequest({endpoint:`purchase/delete/${id}`, method: "DELETE", token});
};

export const getUserPurchases = (token, userId) => {
  return apiRequest({ endpoint: `purchase/client/${userId}`, method:"GET", token});
};

export const buyProduct = (token, productCode, quantity) => {
  if (!quantity || quantity <= 0) {
    throw new Error("La cantidad debe ser mayor a 0");
  }

  return createPurchase(token, {
    code: productCode,
    quantity,
  });
};