/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Button,
    FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import NotificationCard from "@/components/card/NotificationCard";
import { useCallback, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP } from "react-native-responsive-screen";
import DOMAIN from "@/components/(Utils)/domain";

export default function NotificationsScreen({ navigation }: any) {
    const [myNotifications, setMyNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const data = useSelector((state: RootState) => state.getUserData.data);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );

    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    useFocusEffect(
        useCallback(() => {
            fetchMyNotifications();
        }, [])
    );
    const fetchMyNotifications = async () => {
        console.log("fetching notifications");
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        const {
            data: { notifications },
        } = await fetch(`${DOMAIN}/api/notifications`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        }).then((res) => res.json());
        setLoading(false);
        setMyNotifications(notifications);
    };

    /* eslint-disable @typescript-eslint/no-unused-vars */
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.background,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    margin: 10,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                    gap: 70,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.2,
                    borderBottomColor: Colors.greyPost,
                }}
            >
                <MaterialCommunityIcons
                    name="chevron-left"
                    size={30}
                    color={Colors.welcomeText}
                    onPress={() => navigation.goBack()}
                />
                <Text
                    style={{
                        fontSize: 20,
                        color: Colors.welcomeText,
                        fontWeight: "bold",
                    }}
                >
                    Notifications
                </Text>
                <View style={{ width: 30 }} />
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => fetchMyNotifications()}
                        tintColor={Colors.default1}
                    />
                }
                contentContainerStyle={{}}
            >
                {myNotifications.length > 0 ? (
                    <FlatList
                        data={myNotifications}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <NotificationCard notification={item} />
                        )}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    width: "100%",
                                    height: 1,
                                    backgroundColor: Colors.greyPost,
                                    opacity: 0.4,
                                }}
                            />
                        )}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={{ flex: 1, paddingTop: 150 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "sf",
                                letterSpacing: 0.2,
                                fontSize: heightPercentageToDP(2),
                                lineHeight: 30,
                                color: Colors.welcomeText,
                            }}
                        >
                            You don't have any notifications yet...
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
