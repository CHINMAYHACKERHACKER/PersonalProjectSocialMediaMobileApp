import { Text, Pressable, Image, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { sendFriendRequest } from "../AxiosRequest/HandleAxiosRequest";
import { UserType } from "../context/UserContext";
import userListStyle from "../css/UserListCss";
import userImage from "../Image/User.png";
import { baseUrl } from "../AxiosRequest/AxiosBaseUrl";

const UserList = ({ data }) => {
    let { UserId, setUserId } = useContext(UserType);
    const [friendButton, setFriendButton] = useState("Add Friend");

    //^We Need to Send Both UserId(Current User Id) And Selected UserId
    const sendFriendReq = async (currentUserId, selectedUserId) => {
        setFriendButton("Request sent");
        let reqObj = {
            currentUserId: currentUserId,
            selectedUserId: selectedUserId,
            friendButton: "Request sent"
        }
        let sendFriendReqRes = await sendFriendRequest(reqObj);
    }

    return (
        <>
            <Pressable style={userListStyle.userContainer}>
                <View style={userListStyle.imageContainer}>
                    {
                        data?.Image ? (
                            <Image source={{ uri: `${baseUrl}/${data?.Image}` }} style={userListStyle.userImage} />
                        ) : <Image source={userImage} style={userListStyle.userImage} />
                    }
                </View>
                <View style={userListStyle.infoContainer}>
                    <Text style={userListStyle.userEmail}>{data.email_mobile_number}</Text>
                    <Pressable style={userListStyle.addFriendButton} onPress={() => sendFriendReq(UserId, data?._id)}>
                        <Text style={userListStyle.addFriendButtonText}>{friendButton}</Text>
                    </Pressable>
                </View>
            </Pressable>
        </>
    )
}

export default UserList;