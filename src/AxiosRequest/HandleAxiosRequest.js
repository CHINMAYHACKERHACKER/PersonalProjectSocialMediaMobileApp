import { baseUrl } from "./AxiosBaseUrl";
import { axiosRequestPost } from "./MainAxiosRequest";
import { axiosRequestGet } from "./MainAxiosRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleSignup = async (data) => {
    try {
        let signUpResponse = await axiosRequestPost({
            method: 'POST',
            url: `${baseUrl}/sign/userSignUp`,
            data: data
        });
        return signUpResponse;
    } catch (error) {
        console.error('Error in handleSignup function:', error.message);
    }
}

const handleLogin = async (data) => {
    try {
        let loginResponse = await axiosRequestPost({
            method: 'POST',
            url: `${baseUrl}/login/userLogin`,
            data: data
        })
        // console.log(loginResponse);
        return loginResponse;
    } catch (error) {
        console.error('Error in handleSignup function:', error.message);
    }
}

const removeToken = async ({ navigation }) => {
    try {
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken');
        navigation.navigate('login');
    } catch (error) {
        console.error('Error in HttpRequestGet function:', error.message);
    }
};

const homePage = async () => {
    try {
        let homePageAccessRes = await axiosRequestGet({
            method: 'GET',
            url: `${baseUrl}/home/userHomePage`,
        })
        return homePageAccessRes;
    } catch (error) {
        console.error('Error in handleSignup function:', error.message);
    }
}

export {
    handleSignup,
    handleLogin,
    homePage,
    removeToken
}