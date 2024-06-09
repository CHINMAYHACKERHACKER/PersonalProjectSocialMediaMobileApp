import { StyleSheet } from "react-native";

const userListStyle = StyleSheet.create({
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    imageContainer: {
        marginRight: 15,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    infoContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    userEmail: {
        fontWeight: "bold",
        fontSize: 18, 
        color: "#333",
    },
    addFriendButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#1E90FF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addFriendButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14
    },
});

export default userListStyle;
