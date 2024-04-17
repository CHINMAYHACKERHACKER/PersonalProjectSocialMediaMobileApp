import { StatusBar } from 'expo-status-bar';
import Sign from './src/Authentication/Sign';
import Login from './src/Authentication/Login';
import Home from './src/pages/Home';
import Samplepage from './src/pages/Samplepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

let stackNavigation = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName='home'>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="sample" component={Samplepage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <stackNavigation.Navigator initialRouteName='Bottomtabs'>
        <stackNavigation.Screen name="login" component={Login} options={{
          headerShown: false,
          animation: "slide_from_right"
        }} />
        <stackNavigation.Screen name="sign" component={Sign} options={{
          headerShown: false,
          animation: "slide_from_right"
        }} />
        <stackNavigation.Screen name="Bottomtabs" component={HomeTabs} options={{
          headerShown: false,
          animation: "fade"
        }} />
      </stackNavigation.Navigator>
    </NavigationContainer>
  );
}
