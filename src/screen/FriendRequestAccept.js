import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { Text, FlatList, View, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { UserType } from "../context/UserContext";
import { getFriendRequest } from "../AxiosRequest/HandleAxiosRequest";
import { friendRequestAccept } from "../AxiosRequest/HandleAxiosRequest";
import { baseUrl } from "../AxiosRequest/AxiosBaseUrl";
import friendRequestAcceptStyle from "../css/FriendRequestAccept";
import userImage from "../Image/User.png";

const FriendRequestAccept = () => {
    let { UserId, setUserId } = useContext(UserType);
    const [friendRequestData, setFriendRequestData] = useState([]);

    const friendRequestAcpt = async (senderId, recpientId) => {
        let friendRequestAcceptRes = await friendRequestAccept({
            senderId: senderId,
            recpientId: recpientId
        });
    }

    useEffect(() => {
        getFriendReq();
    }, [])

    const getFriendReq = async () => {
        let friendRequestRes = await getFriendRequest(UserId);
        setFriendRequestData(friendRequestRes?.finalRes);
    }

    return (
        <>
            <View style={friendRequestAcceptStyle.mainContainer}>
                <FlatList
                    data={friendRequestData}
                    renderItem={({ item }) => (
                        <View style={friendRequestAcceptStyle.container}>
                            {item?.Image ? (
                                <Image source={{ uri: `${baseUrl}/${item?.Image}` }} style={friendRequestAcceptStyle.profileImage} />
                            ) : (
                                <Image source={userImage} style={friendRequestAcceptStyle.profileImage} />
                            )}
                            <View style={friendRequestAcceptStyle.infoContainer}>
                                <Text style={friendRequestAcceptStyle.emailText}>{item?.email_mobile_number}</Text>
                                <TouchableOpacity
                                    style={friendRequestAcceptStyle.acceptButton}
                                    onPress={() => friendRequestAcpt(item?._id, UserId)}
                                >
                                    <Text style={friendRequestAcceptStyle.acceptButtonText}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => item?._id + index}
                />
            </View>
        </>
    )
}
export default FriendRequestAccept;