// chatFriendsCss.js

import { StyleSheet } from 'react-native';

const chatFriendStyle = StyleSheet.create({
    ScreenBackground: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        overflow: 'hidden',
    },
    searchBar: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    imageContainer: {
        marginRight: 15,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userEmail: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 8,
        minWidth: '80%',
    },
    modalButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchIcon: {
        flex: 1,
        alignItems: "flex-end"
    }
});

export default chatFriendStyle;
