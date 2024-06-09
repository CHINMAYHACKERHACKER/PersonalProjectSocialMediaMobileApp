import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    ViewIcons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        right: 30
    },
    ScreenBackground: {
        flex: 1,
        backgroundColor: "white"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
      },
    modalButton: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#3498db',
        width: 200,
        alignItems: 'center',
      },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
    imageContainer: {
        marginTop: 20,
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#3498db',
      },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      }
})

export default HomeStyle;
