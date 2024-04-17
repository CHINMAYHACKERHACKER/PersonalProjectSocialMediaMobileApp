import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { removeToken } from "../AxiosRequest/HandleAxiosRequest";
import { homePage } from "../AxiosRequest/HandleAxiosRequest";

const Home = (props) => {
    let { navigation } = props;
    const [homePageBool, setHomePageBool] = useState(false);

    const logout = async () => {
        await removeToken({navigation});
    }

    useEffect(() => {
        const homepageAccess = async () => {
            try {
                let resData = await homePage();
                if (resData?.data?.valid) {
                    setHomePageBool(true);
                } else {
                    navigation.navigate('login')
                }
            } catch (error) {
                console.error("Error accessing homepage:", error);
                // Handle error condition, maybe redirect to an error page
            }
        };
        homepageAccess();
    }, [navigation, homePageBool]);
    return <>
        <View>
            {
                homePageBool ? (
                    <Text>
                        hompageAccessed
                    </Text>
                ) : <Text>hompageNotAccessed</Text>
            }
            <Button title="Logout" onPress={logout} />
        </View>
    </>
}
export default Home;