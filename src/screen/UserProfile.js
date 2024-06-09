import React, { useState, useContext, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { UserType } from "../context/UserContext.js";
import { getUserProfile } from "../AxiosRequest/HandleAxiosRequest.js";
import { baseUrl } from "../AxiosRequest/AxiosBaseUrl.js";
import userImage from "../Image/User.png";


const UserProfile = () => {
    const { UserId } = useContext(UserType);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const getUserProfileInfo = async () => {
            try {
                const userProfileRes = await getUserProfile(UserId);
                setUserProfile(userProfileRes?.userProfileRes);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        getUserProfileInfo();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {userProfile && (
                <>
                    <View style={styles.profileHeader}>
                        {
                            userProfile?.Image ? (
                                <Image source={{ uri: `${baseUrl}/${userProfile?.Image}` }} style={styles.profileImage} />
                            ) : <Image source={userImage} style={styles.profileImage} />
                        }
                        <View style={styles.profileHeaderText}>
                            <Text style={styles.profileName}>{userProfile.email_mobile_number}</Text>
                            <Text style={styles.profileEmail}>{userProfile.email}</Text>
                        </View>
                    </View>
                    <View style={styles.profileInfo}>
                        <InfoRow label="Friends" value={userProfile.friends.length} />
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingVertical: 20,
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    profileHeaderText: {
        flex: 1,
    },
    profileName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    profileEmail: {
        fontSize: 16,
        color: "#666",
    },
    profileInfo: {
        padding: 20,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    infoLabel: {
        fontSize: 18,
        color: "#666",
    },
    infoValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
});

export default UserProfile;
