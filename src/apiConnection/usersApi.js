import { apiRequest } from "./apiConfig.js";

export const createUser = (data) => {
  return apiRequest({endpoint:"user/register", method:"POST",body:data});
};

export const createAdmin = (data) => {
  return apiRequest({ endpoint: "user/register-admin", method: "POST", body: data });
};
 
export const userLogin = (data) => {
  return apiRequest({endpoint:"user/login", method: "POST", body: data});
};