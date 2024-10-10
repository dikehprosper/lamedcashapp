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
import DOMAIN from "./(Utils)/domain";

 const FollowingTab = ({ displayNotificationIn }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const [loading, setLoading] = useState(true);
    const [followingPosts, setFollowingPosts] = useState([]);

    const getForYouPosts = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        if (token) {
            const request = {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await fetch(`${DOMAIN}/api/posts`, request);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data.posts);
                setFollowingPosts(responseData.data.posts);
                setLoading(false);
            }
        } else {
            setLoading(false);
            console.log("No token found");
        }
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate fetching new data from an API
        getForYouPosts().then(() => setRefreshing(false));
    }, [followingPosts]);

    useFocusEffect(
        useCallback(() => {
            getForYouPosts();
        }, []),
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
                {followingPosts.length > 0 ? (
                    <FlatList
                        style={{ minHeight: 100 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={followingPosts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <SinglePostPreview
                                post={item}
                                setPosts={setFollowingPosts}
                                displayNotificationIn={displayNotificationIn}
                            />
                        )}
                        scrollEnabled={false}
                    />
                ) : (
                    postMap.map((map) => {
                        return (
                            <TouchableOpacity>
                                <View
                                    style={{
                                        padding: 8,
                                        paddingVertical: 15,
                                        flexDirection: "row",
                                        gap: 10,
                                        borderBottomColor:
                                            "rgba(120, 120, 120, 0.3)",
                                        borderBottomWidth: 0.5,
                                    }}
                                >
                                    {/* <Status /> */}
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                width: "100%",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 6,
                                                paddingTop: 3,
                                                flex: 1,
                                                height: 20,
                                            }}
                                        >
                                            {/* <Status2 /> */}
                                        </View>
                                        <View style={{ flex: 1, marginTop: 5 }}>
                                            {/* <Status3 /> */}
                                            {/* <Status4 /> */}
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                gap: 5,
                                                justifyContent: "space-between",
                                                width: "95%",
                                                marginTop: 10,
                                            }}
                                        >
                                            {/* <Status5 /> */}
                                            {/* Comment */}
                                            {/* <Status5 /> */}
                                            {/* Views */}
                                            {/* <Status5 /> */}
                                            {/* Save post */}
                                            {/* <Status5 /> */}
                                            {/* Share */}
                                            {/* <Status5 /> */}
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "flex-start",
                                                paddingTop: 14,
                                                gap: 5,
                                            }}
                                        >
                                            {/* <Status6 />
                                            <Status7 /> */}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
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
