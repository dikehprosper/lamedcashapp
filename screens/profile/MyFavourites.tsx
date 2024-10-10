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
import { IOScrollView } from "react-native-intersection-observer";
import { Language } from "@/constants/languages";
import DOMAIN from "@/components/(Utils)/domain";

const MyFavourites = ({ displayNotificationIn }: any) => {
    const [loading, setLoading] = useState(true);
    const [myFavs, setMyFavs] = useState([]);
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

                   
    const fetchMyFavourites = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        try {
            const request = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(`${DOMAIN}/api/posts/saved`, request);

            if (response.ok) {
                const result = await response.json();
                console.log("Fav posts data");
                setMyFavs(result.data.savedPosts);
                setLoading(false);
            }
        } catch (error) {
            console.log("Fetch error:", error);
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchMyFavourites();
        }, [])
    );
    return (
        <IOScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => fetchMyFavourites()}
                    tintColor={Colors.default1}
                />
            }
        >

               
            <>
                {myFavs?.length !== 0 ? (
                    <FlatList
                        data={myFavs}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <SinglePostPreview
                                displayNotificationIn={displayNotificationIn}
                                post={item}
                            />
                        )}
                    />
                ) : (
                    <View style={{ padding: 50, paddingTop: 50 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "sf-bold",
                                letterSpacing: 0.2,
                                fontSize: 16,

                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text260}
                        </Text>
                    </View>
                )}
            </>
        </IOScrollView>
    );
};

export default MyFavourites;
