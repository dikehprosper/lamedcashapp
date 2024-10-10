/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    ScrollView,
    RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SinglePostPreview from "@/components/card/SinglePostPreview";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import { Language } from "@/constants/languages";
import DOMAIN from "@/components/(Utils)/domain";

const MyLikes = ({ displayNotificationIn }: any) => {
    const [loading, setLoading] = useState(true);
    const [myLikes, setMyLikes] = useState([]);
    const data = useSelector((state: RootState) => state.getUserData.data);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
          const currentLanguage = useSelector(
              (state: RootState) => state.getUserData.currentLanguage,
          );
          const languageText =
              currentLanguage === "english"
                  ? Language.english
                  : Language.french;

    const fetchMyLikes = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(
                `${DOMAIN}/api/posts/liked-posts?userId=${data._id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("My liked posts");

            if (response.ok) {
                const result = await response.json();
                console.log("Posts fetched successfully...");
                setMyLikes(result.data.posts);
            }
        } catch (error) {
            console.log("Fetch error:", error);
        } finally {
            console.log("Posts fetched successfully...");
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchMyLikes();
        }, [])
    );
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => fetchMyLikes()}
                    tintColor={Colors.default1}
                />
            }
            contentContainerStyle={{}}
        >
        
            <>
                {myLikes.length !== 0 ? (
                    <FlatList
                        contentContainerStyle={{ flex: 1 }}
                        data={myLikes}
                        renderItem={({ item }) => (
                            <SinglePostPreview
                                displayNotificationIn={displayNotificationIn}
                                post={item}
                            />
                        )}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={{ padding: 50, paddingTop: 50 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "sf-bold",
                                letterSpacing: 0.2,
                                fontSize: 16,
                                lineHeight: 30,
                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text262}
                        </Text>
                    </View>
                )}
            </>
        </ScrollView>
    );
};

export default MyLikes;
