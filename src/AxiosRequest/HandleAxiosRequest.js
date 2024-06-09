import { baseUrl } from "./AxiosBaseUrl";
import { axiosRequestPost } from "./MainAxiosRequest";
import { axiosRequestGet } from "./MainAxiosRequest";
import { axiosRequestUploadPost } from "./MainAxiosRequest";
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
        console.error('Error in HttpRequestGet function:', error.message);
    }
}

const getUserListData = async (reqObj) => {
    try {
        let userListRes = await axiosRequestPost({
            method: 'POST',
            url: `${baseUrl}/getUser/getUserList`,
            data: reqObj
        })
        if (userListRes && userListRes?.data) {
            return userListRes?.data;
        }
    } catch (error) {
        console.error('Error in Getting User List function:', error.message);
    }
}

const sendFriendRequest = async (reqObj) => {
    try {
        let friendRequestRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/friendrequest/friendRequest`,
            data: reqObj
        })
        if (friendRequestRes && friendRequestRes?.data) {
            return friendRequestRes?.data;
        }
    } catch (error) {
        console.error('Error in Sending Friend Request function:', error.message);
    }
}

const getFriendRequest = async (UserId) => {
    try {
        let reqObj = {
            userId: UserId
        }
        let getFriendRequestRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/friendrequest/getFriendRequest`,
            data: reqObj
        })
        if (getFriendRequestRes && getFriendRequestRes?.data) {
            return getFriendRequestRes?.data;
        }
    } catch (error) {
        console.error('Error in Getting Friend Request function:', error.message);
    }
}

const friendRequestAccept = async ({ senderId, recpientId }) => {
    try {
        let reqObj = {
            senderId: senderId,
            recpientId: recpientId
        }
        let friendRequestAcceptRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/friendrequest/friendRequestAccept`,
            data: reqObj
        })
        if (friendRequestAcceptRes && friendRequestAcceptRes?.data) {
            return friendRequestAcceptRes?.data;
        }
    } catch (error) {
        console.error('Error in Friend Request Accept function:', error.message);
    }
}

const uploadImage = async ({ userId, Image, MimeType, ImageName }) => {
    try {
        let formData = new FormData();

        let imageFile = {
            uri: Image,
            type: MimeType,
            name: ImageName
        };
        formData.append("Image", imageFile);
        formData.append("userId", userId);
        let uploadImageRes = await axiosRequestUploadPost({
            method: "POST",
            url: `${baseUrl}/uploadImage/userImage`,
            data: formData
        })
        if (uploadImageRes && uploadImageRes?.data) {
            return uploadImageRes?.data
        }
    } catch (error) {
        console.error('Error in Uploading Image function:', error.message);
    }
}

const getUploadedImageInfo = async (userId) => {
    try {
        let reqObj = {
            userId: userId
        }
        let uploadImageDataRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/uploadImage/getUploadedImageInfo`,
            data: reqObj
        })
        if (uploadImageDataRes && uploadImageDataRes?.data) {
            return uploadImageDataRes?.data
        }
    } catch (error) {
        console.error('Error in Getting Image Info function:', error.message);
    }
}

const getSearchFriendsList = async ({ UserId, page_number, page_size }) => {
    try {
        let reqObj = {
            userId: UserId,
            page_number: page_number,
            page_size: page_size
        }
        let getSearchFriendsListRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/getSearchFriendList/searchFriendList`,
            data: reqObj
        })
        if (getSearchFriendsListRes && getSearchFriendsListRes?.data) {
            return getSearchFriendsListRes?.data
        }
    } catch (error) {
        console.error('Error in Getting Search Friend function:', error.message);
    }
}

const getUserProfile = async (userId) => {
    try {
        let reqObj = {
            userId: userId
        }
        let getUserProfileRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/userProfile/getUserProfile`,
            data: reqObj
        })
        if (getUserProfileRes && getUserProfileRes?.data) {
            return getUserProfileRes?.data
        }
    } catch (error) {
        console.error('Error in Getting User Profile function:', error.message);
    }
}

const getChatUserFriends = async ({ UserId, pageNumber, pageSize }) => {
    try {
        let reqObj = {
            userId: UserId,
            page_number: pageNumber,
            page_size: pageSize
        }
        let getChatUserFriendRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/acceptedChatFriends/getAcceptedChatFriends`,
            data: reqObj
        })
        if (getChatUserFriendRes && getChatUserFriendRes?.data) {
            return getChatUserFriendRes?.data
        }
    } catch (error) {
        console.error('Error in Getting Chat User Friends function:', error.message);
    }
}

const unFriend = async ({ userId, unFriendId }) => {
    try {
        let reqObj = {
            userId: userId,
            unFriendId: unFriendId
        }
        let unFriendRes = await axiosRequestPost({
            method: "POST",
            url: `${baseUrl}/chat/unFriend`,
            data: reqObj
        })
        if (unFriendRes) {
            return unFriendRes;
        }
    } catch (error) {
        console.error('Error in unFriend function:', error.message);
    }
}

export {
    handleSignup,
    handleLogin,
    homePage,
    removeToken,
    getUserListData,
    sendFriendRequest,
    getFriendRequest,
    friendRequestAccept,
    uploadImage,
    getUploadedImageInfo,
    getSearchFriendsList,
    getUserProfile,
    getChatUserFriends,
    unFriend
}