/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import SinglePostPreview from "@/components/card/SinglePostPreview";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import { Language } from "@/constants/languages";
import { IOScrollView } from "react-native-intersection-observer";
import DOMAIN from "@/components/(Utils)/domain";

const MyPosts = ({ displayNotificationIn }: any) => {
    const [loading, setLoading] = useState(true);
    const [myPosts, setMyPosts] = useState([]);
    const data = useSelector((state: RootState) => state.getUserData.data);

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

    useFocusEffect(
        useCallback(() => {
            fetchMyPosts();
        }, [])
    );

    const fetchMyPosts = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(
                `${DOMAIN}/api/posts/my-posts?userId=${data._id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("My posts", result.data.posts);
                setLoading(false);
                setMyPosts(result.data.posts.reverse());
                // console.log(result.data.posts.length);
            }
        } catch (error) {
            setLoading(false);
            console.log("Fetch error:", error);
        }
    };

    return (
        <IOScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => fetchMyPosts()}
                    tintColor={Colors.default1}
                />
            }
            contentContainerStyle={{}}
        >
            
            <View>
                {myPosts.length > 0 ? (
                    <FlatList
                        style={{ minHeight: 100 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={myPosts}
                        renderItem={({ item }) => (
                            <SinglePostPreview
                                setPosts={setMyPosts}
                                displayNotificationIn={displayNotificationIn}
                                post={item}
                            />
                        )}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={{ padding: 50, paddingTop: 70 }}>
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
                            {languageText.text248}!!!
                        </Text>
                    </View>
                )}
            </View>
        </IOScrollView>
    );
};

export default MyPosts;
