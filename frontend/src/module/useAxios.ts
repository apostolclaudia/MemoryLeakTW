import axios from "axios";
import { getJWT } from "./useJWT";

const BASE_URL = "http://localhost:3000/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `BEARER ${getJWT()}`,
  },
});

export const get = async (url: string) => {
  const response = await axiosInstance.get(url, {
    headers: {
      authorization: `BEARER ${getJWT()}`,
    },
  });
  return response;
};

export const post = async (url: string, body?: {}) => {
  const response = await axiosInstance.post(url, body, {
    headers: {
      authorization: `BEARER ${getJWT()}`,
    },
  });
  return response;
};

export const patch = async (url: string, body: {}) => {
  const response = await axiosInstance.patch(url, body, {
    headers: {
      authorization: `BEARER ${getJWT()}`,
    },
  });
  return response;
};

export const remove = async (url: string) => {
  const response = await axiosInstance.delete(url, {
    headers: {
      authorization: `BEARER ${getJWT()}`,
    },
  });
  return response;
};
