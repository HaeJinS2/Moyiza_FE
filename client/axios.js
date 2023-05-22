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

// 모든 응답에 대한 인터셉터를 설정하는 부분
axios.interceptors.response.use(
    // 정상 응답 처리
    (response) => {
        return response;
    },
    // 에러 처리
    async function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            // 재요청을 위한 커스텀 설정 (무한 재요청 방지)
            originalRequest._retry = true;

            const refreshTokenResponse = await refreshToken();
            if (refreshTokenResponse && refreshTokenResponse.status === 200) {
                const newAccessToken = refreshTokenResponse.data.access_token;
                Cookies.set("Authorization", newAccessToken);
                axios.defaults.headers["Authorization"] = "Bearer " + newAccessToken.trim();

                // 원래의 요청에 재요청
                return axios(originalRequest);
            } else {
                // Refresh token is also expired or error, logout the user, etc...
            }
        }
        return Promise.reject(error);
    }
);

// 리프레시 토큰으로 액세스 토큰을 발급받는 함수
// 이름 수정 필요
async function refreshToken() {
    const refreshToken = Cookies.get("RefreshToken");
    if (refreshToken) {
        try {
            // 리프레시 토큰으로 액세스 토큰을 발급받는 api의 엔드포인트 기재
            const response = await axios.post(API_BASE_URL + "/refresh", {
                refreshToken: refreshToken
            });
            return response;
        } catch (error) {
            console.error("Failed to refresh token: ", error);
            return null;
        }
    }
    return null;
}

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