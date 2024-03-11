import axios from "axios";
import { baseUrl } from "./baseUrl";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the access token
// Function to refresh the access token
const refreshToken = async () => {
  try {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    const payload = { refershToken: refreshTokenValue };
    const response = await axios.get(`${baseUrl}Security/RegenerateTokens`, {
      params: payload,
    });

    const { accessToken, refreshToken } = response?.data;

    // Update the local storage with the new tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);

    // Clear tokens from local storage in case of an error
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    throw error;
  }
};

// Interceptor for API requests
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor for API responses
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Try to refresh the token
        const newAccessToken = await refreshToken();
        // Retry the original request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const getLogin = async (payload) => {
  try {
    const response = await api.post("/Login/login", payload);
    return response;
  } catch (error) {
    console.error("getLogin", error);
    throw error;
  }
};

export const getLoginCompany = async (payload) => {
  try {
    const response = await api.get("/Login/GetCompany", {
      params: payload,
    });
    return response;
  } catch (error) {
    console.error("getLoginCompany", error);
    throw error;
  }
};

const makeAuthorizedRequest = async (method,url, params) => {
  try {
    let response 
    if(method === "get"){
      response= await api.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params,
      });
    }else{
      response= await api.post(url,params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    }
  
    return response;
  } catch (error) {
    console.error(`Error in ${url}`, error);
  }
};

export const getEmployeeSummary = async () => {
  return makeAuthorizedRequest("get","/Employee/GetEmployees");
};

export const getCity = async () => {
  return makeAuthorizedRequest("get","/City/GetCities");
};

export const getCountry = async () => {
  return makeAuthorizedRequest("get","/Country/GetCountry");
};

export const getDepartment = async () => {
  return makeAuthorizedRequest("get","/Department/GetDepartment");
};

export const postEmployee = async (payload) => {
  return makeAuthorizedRequest("post","/Employee/UpsertEmployee",payload);
};

export const getEmployeeDetails = async (payload) => {
  return makeAuthorizedRequest("get","/Employee/GetEmployeebyId",payload);
};

export const getFields = async (payload) => {
  return makeAuthorizedRequest("get","MasterField/GetMastersFields",payload);
};
