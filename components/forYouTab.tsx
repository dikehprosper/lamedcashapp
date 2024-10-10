/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import SinglePostPreview from "./card/SinglePostPreview";
import LoadingCard from "./card/LoadingCard";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { IOScrollView } from "react-native-intersection-observer";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Language } from "@/constants/languages";
import {
    Status,
    Status2,
    Status3,
    Status4,
    Status5,
    Status6,
    Status7,
} from "./skeleton3";
import useNotification from "./(Utils)/displayNotification";
import ToastNotification from "./(Utils)/toastNotification";
import DOMAIN from "./(Utils)/domain";

const FollowingTab = ({ displayNotificationIn, following }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const [loading, setLoading] = useState(false);
    const [fyPosts, setFYPosts] = useState([]);

    const getForYouPosts = async () => {
        setLoading(true);
        setRefreshing(true);
        const token = await AsyncStorage.getItem("token");

        if (token) {
            const request = {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await fetch(
                `${DOMAIN}/api/posts${following ? "/following" : ""}`,
                request
            );

            if (response.ok) {
                const responseData = await response.json();
                console.log(
                    `${following ? "following" : ""}`,
                    responseData.data.posts
                );
                setFYPosts(responseData.data.posts);
                setLoading(false);
                setRefreshing(false);
            }
        } else {
            setRefreshing(false);
            setLoading(false);
            console.log("No token found");
        }
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate fetching new data from an API
        getForYouPosts().then(() => setRefreshing(false));
    }, [fyPosts]);

    useFocusEffect(
        useCallback(() => {
            getForYouPosts();
        }, [])
    );
    const postMap = ["", "", "", ""];

    return (
        <IOScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => getForYouPosts()}
                    tintColor={Colors.default1}
                />
            }
            contentContainerStyle={{}}
        >
         
                <View>
                    {fyPosts.length > 0 ? (
                        <FlatList
                            maxToRenderPerBatch={10}
                            initialNumToRender={10}
                            style={{ minHeight: 100 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={fyPosts}
                            keyExtractor={(item: any, index) => item._id}
                            renderItem={({ item }) => (
                                <SinglePostPreview
                                    post={item}
                                    setPosts={setFYPosts}
                                    displayNotificationIn={
                                        displayNotificationIn
                                    }
                                />
                            )}
                            scrollEnabled={false}
                        />
                    ) : (
                        <View
                            style={{
                                height: 200,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontWeight: "800",
                                    fontSize: 17,
                                    color: Colors.welcomeText,
                                }}
                            >
                                {languageText.text292}
                            </Text>
                        </View>
                    )}
                </View>
            
        </IOScrollView>
    );
};

export default FollowingTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
