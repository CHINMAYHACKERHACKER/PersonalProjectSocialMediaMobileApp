import { Text, View, TextInput, FlatList, Pressable, Image, RefreshControl } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserType } from "../context/UserContext.js";
import { getSearchFriendsList } from "../AxiosRequest/HandleAxiosRequest.js";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../AxiosRequest/AxiosBaseUrl.js";
import { sendFriendRequest } from "../AxiosRequest/HandleAxiosRequest";
import userImage from "../Image/User.png";
import searchFriendsStyle from "../css/SearchFriendsCss";

const SearchFriends = () => {
    let { UserId, setUserId } = useContext(UserType);
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [page_number, setPageNumber] = useState(1);
    const [page_size, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    let navigation = useNavigation();

    const getSearchFriendListData = async (page_number = 1) => {
        setIsLoading(true);
        let searchFriendListRes = await getSearchFriendsList({ UserId, page_number, page_size });
        setUserList(searchFriendListRes?.friendList);
        setFilteredUserList(searchFriendListRes?.friendList);
        setIsLoading(false);
    }

    useEffect(() => {
        setPageNumber(1);
        getSearchFriendListData();
        return () => {
            setUserList([]);
            setFilteredUserList([]);
        };
    }, [])

    const sendFriendReq = async (currentUserId, selectedUserId) => {
        let reqObj = {
            currentUserId: currentUserId,
            selectedUserId: selectedUserId
        }
        let sendFriendReqRes = await sendFriendRequest(reqObj);
    }

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredList = userList?.filter((user) => {
            return user?.email_mobile_number?.toLowerCase().includes(text?.toLowerCase());
        });
        setFilteredUserList(filteredList);
    };

    const handleEndReached = async () => {
        try {
            if (isRefreshing) return;
            const nextPageNumber = page_number + 1;
            setIsLoading(true);
            const searchFriendListRes = await getSearchFriendsList({ UserId, page_number: nextPageNumber, page_size });
            if (searchFriendListRes && searchFriendListRes?.friendList) {
                setUserList(prev => [...prev, ...searchFriendListRes?.friendList]);
                setFilteredUserList(prevList => [...prevList, ...searchFriendListRes?.friendList]);
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

    return (
        <View style={searchFriendsStyle.ScreenBackground}>
            <View style={searchFriendsStyle.ScreenBackground}>
                <View style={searchFriendsStyle.searchBarContainer}>
                    <TextInput
                        style={searchFriendsStyle.searchBar}
                        placeholder="Search"
                        placeholderTextColor="gray"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
                <FlatList
                    data={filteredUserList}
                    renderItem={({ item }) => (
                        <Pressable style={searchFriendsStyle.userContainer}>
                            <View style={searchFriendsStyle.imageContainer}>
                                {
                                    item?.Image ? (
                                        <Image source={{ uri: `${baseUrl}/${item?.Image}` }} style={searchFriendsStyle.userImage} />
                                    ) : <Image source={userImage} style={searchFriendsStyle.userImage} />
                                }
                            </View>
                            <View style={searchFriendsStyle.infoContainer}>
                                <Text style={searchFriendsStyle.userEmail}>{item?.email_mobile_number}</Text>
                                <Pressable style={searchFriendsStyle.addFriendButton} onPress={() => sendFriendReq(UserId, item?._id)}>
                                    <Text style={searchFriendsStyle.addFriendButtonText}>Add Friend</Text>
                                </Pressable>
                            </View>
                        </Pressable>
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
                                getSearchFriendListData();
                            }}
                            colors={['#1E90FF']}
                        />
                    }
                />
            </View>
        </View>
    );
}

export default SearchFriends;