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
import CommentPostReference from "@/components/card/CommentPostReference";
import { Language } from "@/constants/languages";
import DOMAIN from "@/components/(Utils)/domain";

const MyComments = ({ displayNotificationIn }: any) => {
    const [loading, setLoading] = useState(true);
    const [myComments, setMyComments] = useState([]);
    const data = useSelector((state: RootState) => state.getUserData.data);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const fetchMyComments = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        try {
            console.log("start.");
            const response = await fetch(
                `${DOMAIN}/api/posts/my-comments?userId=${data._id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log("Fetch error:", response);
if (response.ok) {
    const result = await response.json();
    console.log("My Comments", result.data.comments);
    setLoading(false);
    setMyComments(result.data.comments);
    console.log("comments fetched successfully...");
}
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("Fetch error:");
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchMyComments();
        }, []),
    );
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => fetchMyComments()}
                    tintColor={Colors.default1}
                />
            }
            contentContainerStyle={{}}
        >
            <View>
                {myComments.length > 0 ? (
                    <FlatList
                        style={{ minHeight: 100 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={[...myComments].reverse()}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    width: "100%",
                                    backgroundColor:
                                        Colors.postSelectionBorderColor,
                                    marginVertical: 10,
                                }}
                            />
                        )}
                        renderItem={({ item }: any) => (
                            <CommentPostReference
                                comment={item}
                                post={item.post}
                                displayNotificationIn={displayNotificationIn}
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
                            {languageText.text290}
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default MyComments;
