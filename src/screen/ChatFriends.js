import React, { useEffect, useContext, useState } from "react";
import { Text, FlatList, View, Pressable, Image, Modal, TouchableOpacity, TextInput, Animated, RefreshControl } from "react-native";
import { getChatUserFriends } from "../AxiosRequest/HandleAxiosRequest";
import { UserType } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../AxiosRequest/AxiosBaseUrl.js";
import chatFriendStyle from "../css/chatFriendsCss.js";
import userImage from "../Image/User.png";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { unFriend } from "../AxiosRequest/HandleAxiosRequest";

const ChatFriends = () => {
    let { UserId, setUserId } = useContext(UserType);
    const [chatUserFriendsList, setChatUserFriendsList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchBarWidth = useState(new Animated.Value(0))[0];
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    let navigation = useNavigation();

    const getChatUserFriend = async () => {
        let getChatUserFriendRes = await getChatUserFriends({ UserId, pageNumber, pageSize });
        setChatUserFriendsList(getChatUserFriendRes?.finalRes);
    }
    useEffect(() => {
        setPageNumber(1);
        getChatUserFriend();
    }, []);

    const filteredFriends = chatUserFriendsList.filter(friend =>
        friend.email_mobile_number.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showSearchBar = () => {
        setSearchVisible(true);
        Animated.timing(searchBarWidth, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const hideSearchBar = () => {
        setSearchVisible(false);
        setSearchQuery("");
        Animated.timing(searchBarWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleEndReached = async () => {
        try {
            if (isRefreshing) return;
            const nextPageNumber = pageNumber + 1;
            setIsLoading(true);
            const getChatUserFriendRes = await getChatUserFriends({ UserId, pageNumber: nextPageNumber, pageSize });
            if (getChatUserFriendRes && getChatUserFriendRes?.finalRes) {
                setChatUserFriendsList(prevList => [...prevList, ...getChatUserFriendRes?.finalRes]);
                setPageNumber(nextPageNumber);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            return null;
        }
    }

    const userUnFriend = async (userId, unFriendId) => {
        let unFriendRes = await unFriend({ userId, unFriendId });
    }

    return (
        <View style={chatFriendStyle.ScreenBackground}>
            <View style={chatFriendStyle.header}>
                {searchVisible ? (
                    <Animated.View style={[chatFriendStyle.searchBarContainer, {
                        width: searchBarWidth.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '90%']
                        })
                    }]}>
                        <Ionicons name="arrow-back" size={24} color="black" onPress={hideSearchBar} />
                        <TextInput
                            style={chatFriendStyle.searchBar}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </Animated.View>
                ) : (
                    <View style={chatFriendStyle.headerContent}>
                        <Text style={chatFriendStyle.headerTitle}>Chat</Text>
                        <View style={chatFriendStyle.searchIcon}>
                            <Ionicons name="search" size={24} color="black" onPress={showSearchBar} />
                        </View>
                    </View>
                )}
            </View>
            <FlatList
                data={filteredFriends.length > 0 || searchQuery.length > 0 ? filteredFriends : chatUserFriendsList}
                renderItem={({ item }) => (
                    <>
                        <Pressable style={chatFriendStyle.userContainer}>
                            <View style={chatFriendStyle.imageContainer}>
                                {
                                    item?.Image ? (
                                        <Image source={{ uri: `${baseUrl}/${item?.Image}` }} style={chatFriendStyle.userImage} />
                                    ) : <Image source={userImage} style={chatFriendStyle.userImage} />
                                }
                            </View>
                            <View style={chatFriendStyle.infoContainer}>
                                <Text style={chatFriendStyle.userEmail}>{item?.email_mobile_number}</Text>
                                <Pressable onPress={() => setModalVisible(true)}>
                                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                                </Pressable>
                            </View>
                        </Pressable>
                        <Modal
                            transparent={true}
                            animationType="fade"
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableOpacity
                                style={chatFriendStyle.modalOverlay}
                                activeOpacity={1}
                                onPressOut={() => setModalVisible(false)}
                            >
                                <View style={chatFriendStyle.modalContent}>
                                    <Pressable
                                        style={chatFriendStyle.modalButton}
                                        onPress={() => {
                                            userUnFriend(UserId, item?._id);
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text style={chatFriendStyle.modalButtonText}>Unfriend</Text>
                                    </Pressable>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
                keyExtractor={(item, index) => item?._id + index}
                onEndReached={() => {
                    setIsRefreshing(false);
                    handleEndReached();
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => {
                            setIsRefreshing(true);
                            getChatUserFriend();
                        }}
                        colors={['#1E90FF']}
                    />
                }
            />
        </View>
    );
}

export default ChatFriends;

