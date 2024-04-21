import React, { useState } from "react";
import { handleSignup } from "../AxiosRequest/HandleAxiosRequest";
import { Text, View, TextInput, TouchableOpacity,Modal } from "react-native";
import signupStyle from "../css/SignCss";

const Sign = (props) => {
    let { navigation } = props;
    const [userSignUpData, setUserSignUpData] = useState({
        mobileNumberOrEmail: "",
        password: ""
    })
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const signIn = async () => {
        if (!userSignUpData.mobileNumberOrEmail || !userSignUpData.password) {
            setModalMessage("Please enter both username and password.");
            setModalVisible(true);
        } else {
            let reqObj = {
                mobileNumberOrEmail: userSignUpData.mobileNumberOrEmail,
                password: userSignUpData.password
            }
            let signUpResponse = await handleSignup(reqObj);
            if (signUpResponse?.status === 200 && signUpResponse?.data?.signUp) {
                setModalMessage(`${signUpResponse?.data?.message}`);
                setModalVisible(true);
                setTimeout(() => {
                    navigation.navigate('login');
                }, 2000);
            } else {
                setModalMessage(`${signUpResponse?.data?.message}`);
                setModalVisible(true);
            }
        }
    }

    return <>
        <View>
            <Text style={signupStyle.loginText}>Signup</Text>
            <View style={signupStyle.customPage}>
                <TextInput style={signupStyle.inputWrapper} placeholder="Mobile or Email" onChangeText={(text) => setUserSignUpData({ ...userSignUpData, mobileNumberOrEmail: text })} />
            </View>
            <View style={signupStyle.customPage}>
                <TextInput style={signupStyle.inputWrapper} placeholder="Password" onChangeText={(text) => setUserSignUpData({ ...userSignUpData, password: text })} />
                <TouchableOpacity style={signupStyle.loginButton} activeOpacity={0.9} onPress={signIn}>
                    <Text style={signupStyle.buttonText}>Signup</Text>
                </TouchableOpacity>
                <View style={signupStyle.container}>
                    <Text style={signupStyle.text}>
                        Have an Account&nbsp;?&nbsp;&nbsp;
                        <Text style={signupStyle.signUpText} onPress={() => navigation.navigate('login')}>Login</Text>
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
            <View style={signupStyle.modalContainer}>
                <View style={signupStyle.modal}>
                    <Text style={signupStyle.modalText}>{modalMessage}</Text>
                    <TouchableOpacity style={signupStyle.modalButton} activeOpacity={0.9} onPress={() => setModalVisible(false)}>
                    <Text style={signupStyle.buttonText}>Close</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </>
}

export default Sign;