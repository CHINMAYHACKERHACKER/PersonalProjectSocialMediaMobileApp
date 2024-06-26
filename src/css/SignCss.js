import { StyleSheet } from "react-native";

const signupStyle = StyleSheet.create({
    inputWrapper: {
        width: "75%",
        padding: 13,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        fontFamily: "Poppins",
        alignSelf: "center",
        marginBottom: 10,
        textAlign: "center"
    },
    customPage: {
        top: "83%",
    },
    loginButton: {
        backgroundColor: "#000",
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: "center",
        width: 300,
        alignSelf: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins",
    },
    loginText: {
        fontFamily: "Poppins-Bold",
        fontSize: 25,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        top: "65%",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        top: "10%",
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        marginBottom: 20,
    },
    signUpText: {
        fontFamily: "Poppins-Bold",
        color: "#007BFF",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#000",
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: "center",
        width: 105,
        alignSelf: "center"
    }
})

export default signupStyle