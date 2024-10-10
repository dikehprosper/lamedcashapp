/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Color } from "@/constants/Colors";

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const SentSearchList = ({ specificData, navigation, backgroundColor }: any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);
     const colorScheme = useSelector(
         (state: RootState) => state.getUserData.colorScheme,
     );
     const Colors =
         parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    return (
        <TouchableOpacity
            style={{
                paddingTop: 5,
                paddingBottom: 5,
                gap: 8,
                display: "flex",
                justifyContent: "center",
                marginHorizontal: 8,
                marginVertical: 13,
            }}
            onPress={() => navigation.push("sendingPage", specificData)}
        >
            <View style={styles.transaction_result}>
                <View
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={{
                            uri: specificData.image
                                ? specificData.image
                                : "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            borderRadius: 10,
                        }}
                    />
                </View>

                <View style={styles.small_device_group}>
                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontWeight: "700",
                            fontSize: 15,
                            opacity: 0.9,
                        }}
                    >
                        {specificData.fullname}
                    </Text>

                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontSize: 11,
                            fontWeight: "600",
                            opacity: 0.6,
                            padding: 2.5,
                        }}
                    >
                        {specificData.email}
                    </Text>
                </View>

                <View
                    style={{
                        display: "flex",
                        gap: 3,
                        flexDirection: "column",
                        justifyContent: "center",
                        // backgroundColor: "red",
                    }}
                >
                    <View
                        style={{
                            padding: 2.5,
                            borderRadius: 3,

                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "900",
                                color: Colors.welcomeText,
                                opacity: 0.5,
                            }}
                        >
                            {specificData.tag && `@${specificData.tag}`}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    transaction_result: {
        gap: 8,
        display: "flex",
        height: 45,
        flexDirection: "row",
        alignItems: "center",
    },
    small_device_group: {
        display: "flex",
        flex: 1,
        gap: 3,
        flexDirection: "column",
        justifyContent: "center",
        // backgroundColor: "red",
        // whiteSpace: 'nowrap'
    },
    small_device_group_text1: {
        fontWeight: "900",
    },
});

export default SentSearchList;
