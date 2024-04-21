import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Sign from './src/Authentication/Sign';
import Login from './src/Authentication/Login';
import Home from './src/pages/Home';
import Samplepage from './src/pages/Samplepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BackHandler } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { homePage } from './src/AxiosRequest/HandleAxiosRequest';


let stackNavigation = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserSplashScreen = (props) => {
  let { navigation } = props;
  useEffect(() => {
    const homepageAccess = async () => {
      let resData = await homePage();
      if (resData?.data?.valid) {
        await SplashScreen.hideAsync();
        navigation.navigate('Bottomtabs')
      } else {
        await SplashScreen.hideAsync();
        navigation.navigate('login')
      }
    }
    homepageAccess();
  }, [])

  return null;
}

function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName='home'>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="sample" component={Samplepage} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Return true to prevent the default back button behavior (navigating back)
      BackHandler.exitApp();
      return true;
    });

    // Cleanup the event listener when the component is unmounted
    return () => {
      backHandler.remove();
    };
  }, []);
  return (
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
      </stackNavigation.Navigator>
    </NavigationContainer>
  );
}
