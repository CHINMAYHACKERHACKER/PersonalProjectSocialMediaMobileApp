import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, Image, StyleSheet, Modal, ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import HomeStyle from "../css/HomeCss.js";
import { getUserListData } from "../AxiosRequest/HandleAxiosRequest.js";
import { AntDesign } from '@expo/vector-icons';
import { removeToken } from "../AxiosRequest/HandleAxiosRequest";
import UserList from "./UserList.js";
import { UserType } from "../context/UserContext.js";
import jwt_decode from "jwt-decode";
import { getAccessToken } from "../AxiosRequest/MainAxiosRequest.js";
import { uploadImage } from "../AxiosRequest/HandleAxiosRequest.js";
import * as DocumentPicker from 'expo-document-picker';
import { getUploadedImageInfo } from "../AxiosRequest/HandleAxiosRequest.js";

const Home = (props) => {
  let { navigation } = props;
  const [userList, setUserList] = useState([]);
  const [image, setImage] = useState(null);
  const [mimeType, setMimeType] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  let { UserId, setUserId } = useContext(UserType);
  const [page_number, setPageNumber] = useState(1);
  const [page_size, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);


  const logout = async () => {
    await removeToken({ navigation });
  }

  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });
    setImage(result.assets[0].uri);
    setMimeType(result.assets[0].mimeType)
    setImageName(result.assets[0].name)
  };

  const userUploadImage = async () => {
    let uploadImageRes = await uploadImage({
      userId: UserId,
      Image: image,
      MimeType: mimeType,
      ImageName: imageName
    });
    if (uploadImageRes?.message) {
      setModalVisible(!modalVisible);
    }
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Friends",
      headerRight: () => (
        <View style={HomeStyle.ViewIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Friend Requests")}>
            <MaterialIcons name="people-alt" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={{ marginLeft: 16 }}>
            <AntDesign name="logout" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const getUserList = async () => {
      let accessToken = await getAccessToken();
      let accessTokenDecode = await jwt_decode(accessToken);
      setUserId(accessTokenDecode?.loggedIn_user_id);
      let reqObj = {
        userId: accessTokenDecode?.loggedIn_user_id,
        page_number: page_number,
        page_size: page_size
      }
      setIsLoading(true);
      let userListDataRes = await getUserListData(reqObj);
      if (userListDataRes && userListDataRes?.userList) {
        setUserList(userListDataRes?.userList);
        setIsLoading(false);
      }
      let uploadedImageInfoRes = await getUploadedImageInfo(accessTokenDecode?.loggedIn_user_id);
      if (uploadedImageInfoRes?.message && uploadedImageInfoRes?.uploadedImageRes?.Image) {
        setModalVisible(false);
      }
      else {
        setModalVisible(true);
      }
    }
    getUserList();
    return () => {
      setUserList([]);
    };
  }, []);


  const handleEndReached = async () => {
    const nextPageNumber = page_number + 1;
    let reqObj = {
      userId: UserId,
      page_number: nextPageNumber,
      page_size: page_size
    }
    setIsLoading(true);
    let userListDataRes = await getUserListData(reqObj);
    if (userListDataRes && userListDataRes?.userList) {
      setUserList(prevList => [...prevList, ...userListDataRes?.userList]);
      setPageNumber(nextPageNumber);
      setIsLoading(false);
    }
    else {
      setIsLoading(false);
    }
  }

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  };

  return <>
    <View style={HomeStyle.ScreenBackground}>
      <FlatList
        data={userList}
        renderItem={({ item }) => <UserList data={item} />}
        keyExtractor={(item, index) => item?._id + index}
        onEndReached={handleEndReached}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
      />
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={HomeStyle.modalContainer}>
        <View style={HomeStyle.modalContent}>
          <View style={HomeStyle.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={HomeStyle.image} />
            ) : (
              <Ionicons name="person-circle-outline" size={100} color="#ccc" />
            )}
          </View>
          {
            image ? (
              <TouchableOpacity onPress={userUploadImage} style={HomeStyle.modalButton}>
                <Text style={HomeStyle.modalButtonText}>Upload</Text>
              </TouchableOpacity>
            ) : <TouchableOpacity onPress={pickImage} style={HomeStyle.modalButton}>
              <Text style={HomeStyle.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setImage(null);
            }}
            style={HomeStyle.modalButton}
          >
            <Text style={HomeStyle.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>
}
export default Home;