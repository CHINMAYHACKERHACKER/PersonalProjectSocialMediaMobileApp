import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { removeToken } from "../AxiosRequest/HandleAxiosRequest";
import { homePage } from "../AxiosRequest/HandleAxiosRequest";

const Home = (props) => {
    let { navigation } = props;

    const logout = async () => {
        await removeToken({ navigation });
    }

    return <>
        <View>
            <Text>
                hompageAccessed
            </Text>
            <Button title="Logout" onPress={logout} />
        </View>
    </>
}
export default Home;