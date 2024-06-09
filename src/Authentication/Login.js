import React, { useState, useRef } from "react";
import { handleLogin } from "../AxiosRequest/HandleAxiosRequest";
import { Text, View, TextInput, TouchableOpacity, Button, Modal } from "react-native";
import loginStyle from "../css/LoginCss";

const Login = (props) => {
    let { navigation } = props;
    const [userLoginData, setUserLoginData] = useState({
        mobileNumberOrEmail: "",
        password: ""
    })
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const logIn = async () => {
        if (!userLoginData.mobileNumberOrEmail || !userLoginData.password) {
            setModalMessage("Please enter both username and password.");
            setModalVisible(true);
        } else {
            let reqObj = {
                mobileNumberOrEmail: userLoginData.mobileNumberOrEmail,
                password: userLoginData.password
            }
            let loginResponse = await handleLogin(reqObj);
            if (loginResponse?.data?.login) {
                navigation.replace('Bottomtabs');
            } else {
                setModalMessage(`${loginResponse?.data?.message}`);
                setModalVisible(true);
            }
        }
    }
    return <>
        <View>
            <Text style={loginStyle.loginText}>Login</Text>
            <View style={loginStyle.customPage}>
                <TextInput style={loginStyle.inputWrapper} placeholder="username" onChangeText={(text) => setUserLoginData({ ...userLoginData, mobileNumberOrEmail: text })} />
            </View>
            <View style={loginStyle.customPage}>
                <TextInput style={loginStyle.inputWrapper} placeholder="password" onChangeText={(text) => setUserLoginData({ ...userLoginData, password: text })} secureTextEntry={true}/>
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
        <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={loginStyle.modalContainer}>
                <View style={loginStyle.modal}>
                    <Text style={loginStyle.modalText}>{modalMessage}</Text>
                    <TouchableOpacity style={loginStyle.modalButton} activeOpacity={0.9} onPress={() => setModalVisible(false)}>
                        <Text style={loginStyle.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </>
}
export default Login;