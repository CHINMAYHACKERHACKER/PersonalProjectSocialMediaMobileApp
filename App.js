import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import Sign from './src/Authentication/Sign';
import Login from './src/Authentication/Login';
import Home from './src/screen/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { homePage } from './src/AxiosRequest/HandleAxiosRequest';
import { UserContext } from './src/context/UserContext';
import FriendRequestAccept from './src/screen/FriendRequestAccept';
import SearchFriends from './src/screen/SearchFriends';
import UserProfile from './src/screen/UserProfile';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ChatFriends from './src/screen/ChatFriends';
import { Ionicons } from '@expo/vector-icons';

let stackNavigation = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserSplashScreen = (props) => {
  let { navigation } = props;
  useEffect(() => {
    const homepageAccess = async () => {
      let resData = await homePage();
      if (resData?.data?.valid) {
        await SplashScreen.hideAsync();
        navigation.navigate('Bottomtabs');
      } else {
        await SplashScreen.hideAsync();
        navigation.navigate('login');
      }
    }
    homepageAccess();
  }, [])

  return null;
}

//^Need To Check Later
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerLeftLabelVisible: true,
      tabBarShowLabel: false,
    }}
    >
      <Tab.Screen name="home" component={Home} options={{
        animation: "fade",
        tabBarIcon: ({ color, size }) => (
          <Octicons name="home" size={30} color="black" />
        ),
      }} />
      <Tab.Screen name="search" component={SearchFriends} options={{
        animation: "fade",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => (
          <Feather name="search" size={32} color="black" />
        ),
      }} />
      <Tab.Screen name="chat" component={ChatFriends} options={{
        animation: "fade",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbubbles-outline" size={32} color="black" />
        ),
      }} />
      <Tab.Screen name="Profile" component={UserProfile} options={{
        animation: "fade",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user" size={30} color="black" />
        ),
      }} />
    </Tab.Navigator>
  );
}


export default function App() {

  //^Need To Check Later
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
  //     // Return true to prevent the default back button behavior (navigating back)
  //     BackHandler.exitApp();
  //     return true;
  //   });

  //   // Cleanup the event listener when the component is unmounted
  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

  return (
    <UserContext>
      <NavigationContainer>
        <stackNavigation.Navigator>
          <stackNavigation.Screen name="splashscreen" component={UserSplashScreen} options={{
            headerShown: false
          }} />
          <stackNavigation.Screen name="login" component={Login} options={{
            headerShown: false,
            animation: "fade"
          }} />
          <stackNavigation.Screen name="sign" component={Sign} options={{
            headerShown: false,
            animation: "fade"
          }} />
          <stackNavigation.Screen name="Bottomtabs" component={HomeTabs} options={{
            headerShown: false,
            animation: "fade"
          }} />
          <stackNavigation.Screen name="Friend Requests" component={FriendRequestAccept} options={{
            animation: "fade",
          }} />
        </stackNavigation.Navigator>
      </NavigationContainer>
    </UserContext>
  );
}