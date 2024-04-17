import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isJwtExpired } from "jwt-check-expiration";

const axiosRequestPost = async ({ method, url, data, params }) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data ? data : null,
            params: params ? params : null,
        });
        if (response?.data && response?.data?.accessToken) {
            await AsyncStorage.setItem('accessToken', response?.data?.accessToken)
        }
        if (response?.data && response?.data?.refreshToken) {
            await AsyncStorage.setItem('refreshToken', response?.data?.refreshToken)
        }
        return response;
    } catch (error) {
        console.error('Error in HttpRequest function:', error.message);
        return error;
    }
};

const axiosRequestGet = async ({ method, url }) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response
    } catch (error) {
        console.error('Error in HttpRequestGet function:', error.message);
    }
};

const getAccessToken = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        return accessToken;
    } catch (error) {
        // Handle error
        console.error('Error retrieving access token:', error);
        return null;
    }
};

// Function to retrieve refresh token
const getRefreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        return refreshToken;
    } catch (error) {
        // Handle error
        console.error('Error retrieving refresh token:', error);
        return null;
    }
};

axios.interceptors.request.use(
    async (config) => {
        // Get access token
        let accessToken = await getAccessToken();

        if (accessToken) {
            let isExpried = isJwtExpired(accessToken);
            console.log("isExpried", isExpried);
            if (isExpried) {
                // If the access token has expired, remove it
                accessToken = null;
            } else {
                // If the access token is not expired, add it to the request headers
                config.headers.Authorization = accessToken;
            }
        }

        // Get refresh token
        let refreshToken = await getRefreshToken();

        // If refresh token exists, add it to the request headers
        if (refreshToken) {
            config.headers.RefreshToken = refreshToken;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    async (response) => {
        if (response?.data && response?.data?.accessToken) {
            await AsyncStorage.setItem('accessToken', response?.data?.accessToken)
        }
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export {
    axiosRequestPost,
    axiosRequestGet,
}