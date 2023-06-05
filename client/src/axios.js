import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;

// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.headers.ContentType = "application/json";
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    (config) => {
        // 쿠키의 토큰 명 수정 필요
        const accessToken = Cookies.get("ACCESS_TOKEN");

        if (accessToken) {
            if (!config.url.includes(`https://dapi.kakao.com/`)){
                config.headers["ACCESS_TOKEN"] = "Bearer " + accessToken.trim();
            } 
        } 

        if (config.url.includes(`/user/signup`)){
            config.headers["Content-Type"] = "multipart/form-data";
        } 
        else if(config.url.includes(`/user/mypage`)){
            config.headers["Content-Type"] = "multipart/form-data";
        }
        else {
            config.headers["Content-Type"] = "application/json";
        }
        
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
        console.log(error.response.status)
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            // 재요청을 위한 커스텀 설정 (무한 재요청 방지)
            originalRequest._retry = true;

            const refreshTokenResponse = await refreshToken();
            if (refreshTokenResponse && refreshTokenResponse.status === 200) {
                const newAccessToken = refreshTokenResponse.data.access_token;
                Cookies.set("ACCESS_TOKEN", newAccessToken);
                axios.defaults.headers["ACCESS_TOKEN"] = "Bearer " + newAccessToken.trim();

                // 원래의 요청에 재요청
                return axios(originalRequest);

                // 토큰 갱신 요청 자체가 실패했거나 리프레시 토큰이 만료된 경우를 처리
            } else {
                alert("로그인을 다시 해주세요!")
                Cookies.remove("ACCESS_TOKEN");
                Cookies.remove("RefreshToken");

                // 차후 로그아웃 상태를 전역으로 관리하여  window.location을 사용한 리디렉션 개선 필요
                window.location = "/login";
            }
        }

        // if (error.response.status === 404) {
        //     window.location = "/404";
        // }
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

export function getHeaderAPI(url, config) {
    console.log("GET Start, url : ", url, config);
    return axios.get(url, config);
}


export function deleteAPI(url) {
    console.log("DELETE Start, url : ", url);
    return axios.delete(API_BASE_URL + url);
}

export function patchAPI(url, data) {
    console.log("PATCH Start, url : ", url, " user : ", data);
    return axios.patch(API_BASE_URL + url, data);
}

export function filePutAPI(url, data, config) {
    console.log("boardPostAPI Start, url : ", url, " user : ", data);
    return axios.put(API_BASE_URL + url, data, config);
  }