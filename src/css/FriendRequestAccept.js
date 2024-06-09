import { StyleSheet } from "react-native";

const friendRequestAcceptStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    emailText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    acceptButton: {
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
    acceptButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default friendRequestAcceptStyle;