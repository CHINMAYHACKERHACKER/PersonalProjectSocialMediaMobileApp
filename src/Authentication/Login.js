import React, { useState } from "react";
import { handleLogin } from "../AxiosRequest/HandleAxiosRequest";
import { Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import loginStyle from "../css/LoginCss";

const Login = (props) => {
    let { navigation } = props;
    const [userLoginData, setUserLoginData] = useState({
        mobileNumberOrEmail: "",
        password: ""
    })

    const logIn = async () => {
        if (!userLoginData.mobileNumberOrEmail || !userLoginData.password) {
            alert('Please enter both username and password.');
        } else {
            let reqObj = {
                mobileNumberOrEmail: userLoginData.mobileNumberOrEmail,
                password: userLoginData.password
            }
            let loginResponse = await handleLogin(reqObj);
            if (loginResponse?.data?.login) {
                alert(`${loginResponse?.data?.message}`);
                navigation.navigate('home')
            } else {
                alert(`${loginResponse?.response?.data?.message}`);
            }
        }
    };
    return <>
        <View>
            <Text style={loginStyle.loginText}>Login</Text>
            <View style={loginStyle.customPage}>
                <TextInput style={loginStyle.inputWrapper} placeholder="Mobile or Email" onChangeText={(text) => setUserLoginData({ ...userLoginData, mobileNumberOrEmail: text })} />
            </View>
            <View style={loginStyle.customPage}>
                <TextInput style={loginStyle.inputWrapper} placeholder="Password" onChangeText={(text) => setUserLoginData({ ...userLoginData, password: text })} />
                <TouchableOpacity style={loginStyle.loginButton} activeOpacity={0.9} onPress={logIn}>
                    <Text style={loginStyle.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={loginStyle.container}>
                    <Text style={loginStyle.text}>
                        Don't Have an Account&nbsp;?&nbsp;&nbsp;
                        <Text style={loginStyle.signUpText} onPress={() => navigation.navigate('sign')}>Sign Up</Text>
                    </Text>
                </View>
            </View>
        </View>
    </>
}
export default Login;