import axios from "axios";
import { baseUrl } from "./baseUrl";
let accessToken = localStorage.getItem("accessToken");

export const getLoginCompany = async (payload) => {
  try {
    const response = await axios.get(`${baseUrl}Login/GetCompany`, {
      params: payload,
    });
    return response?.data;
  } catch (error) {
    console.log("getLoginCompany", error);
  }
};

export const getLogin = async (payload) => {
  try {
    const response = await axios.post(`${baseUrl}Login/login`, payload);
    return response?.data;
  } catch (error) {
    console.log("getLogin", error);
  }
};

export const getEmployeeSummary = async () => {
  try {
    if (accessToken) {
      const response = await axios.get(`${baseUrl}Employee/GetEmployees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response?.data;
    }
  } catch (error) {
    console.log("getEmployeeSummary", error);
    if (error?.response?.statusText === "Unauthorized") {
     const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const response = await axios.get(`${baseUrl}Employee/GetEmployees`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        });
          console.log(response);
        // return response?.data;
      }
    }
  }
};

export const getCity = async (payload) => {
  try {
    if (accessToken) {
      const response = await axios.get(`${baseUrl}City/GetCities/${payload}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response?.data;
    }
  } catch (error) {
    console.log("getCity", error);
   
  }
};
