import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers.ContentType = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    // 쿠키의 토큰 명 수정 필요
    const accessToken = Cookies.get("Authorization");

    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken.trim();
    }
    config.headers["Content-Type"] = "application/json";

    console.log("config : ", config);

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export function postAPI(url, data) {
  console.log("POST Start, url : ", url, " user : ", data);
  return axios.post(API_BASE_URL + url, data);
}

export function putAPI(url, data) {
  console.log("PUT Start, url : ", url, " user : ", data);
  return axios.put(API_BASE_URL + url, data);
}

export function getAPI(url) {
  console.log("GET Start, url : ", url);
  return axios.get(API_BASE_URL + url);
}

export function deleteAPI(url) {
  console.log("DELETE Start, url : ", url);
  return axios.delete(API_BASE_URL + url);
}

export function patchAPI(url, data) {
  console.log("PATCH Start, url : ", url, " user : ", data);
  return axios.patch(API_BASE_URL + url, data);
}