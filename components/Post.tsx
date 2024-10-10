/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { colorScheme } from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import getTimeDifference from "./(Utils)/getTimeDifference";
import { formatNumber } from "./(Utils)/formatNumber";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { placeholderUrl } from "@/constants/urls";
const color: any = colorScheme.state;
const Colors = color === 2 ? Color.darkMode : Color.lightMode;

const Post = ({ post }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const time = post.time;

    return (
        <View style={styles.border}>
            <View style={styles.row}>
                <View
                    style={{
                        width: "17%",
                        alignItems: "center",
                        paddingTop: 12,
                    }}
                >
                    <Image
                        source={{
                            uri: post.user?.image
                                ? post.user?.image
                                : placeholderUrl,
                        }}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                </View>

                <View style={{ width: "83%" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "800",
                                textAlign: "center",
                                color: Colors.welcomeText,
                            }}
                        >
                            {post.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 17,
                                textAlign: "center",
                                marginBottom: 4,
                                color: Colors.welcomeText,
                            }}
                        >
                            .
                        </Text>
                        <Text
                            style={{
                                fontSize: 10,
                                textAlign: "center",
                                marginTop: 4,
                                color: Colors.welcomeText,
                            }}
                        >
                            {getTimeDifference(time)}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12.5,
                                textAlign: "center",
                                marginTop: 4,
                                fontWeight: "600",
                                marginLeft: 5,
                                color: Colors.welcomeText,
                            }}
                        >
                            {post.followingState ? "follow" : "unfollow"}
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginBottom: 8 }}>
                        <Text
                            style={{ width: "97%", color: Colors.welcomeText }}
                        >
                            {post.text}
                        </Text>
                    </View>
                    {post.profileImage && (
                        <View
                            style={{
                                flex: 1,
                                marginBottom: 8,
                                width: "97%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                source={{ uri: post.profileImage }}
                                style={{
                                    width: "100%",
                                    height: 140,
                                    borderRadius: 5,
                                    marginVertical: 13,
                                }}
                            />
                        </View>
                    )}
                    <View style={styles.container}>
                        <View style={styles.container2}>
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontSize: 9,
                                    fontWeight: "800",
                                }}
                            >
                                <EvilIcons
                                    name="comment"
                                    size={22}
                                    color={Colors.welcomeText}
                                />
                            </Text>
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontSize: 11,
                                    fontWeight: "700",
                                    marginTop: 2,
                                }}
                            >
                                {formatNumber(post.comments)}
                            </Text>
                        </View>

                        <View style={styles.container2}>
                            <Text>
                                {" "}
                                <EvilIcons
                                    name="heart"
                                    size={22}
                                    color={Colors.welcomeText}
                                />
                            </Text>

                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontSize: 11,
                                    fontWeight: "700",
                                }}
                            >
                                {formatNumber(post.likes)}
                            </Text>
                        </View>

                        <View style={styles.container2}>
                            <Text>
                                <EvilIcons
                                    name="share-apple"
                                    size={22}
                                    color={Colors.welcomeText}
                                />
                            </Text>
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontSize: 10,
                                    fontWeight: "800",
                                }}
                            ></Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "45%",
    },
    container2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    border: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        alignItems: "flex-start",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.postSelectionBorderColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10, // Add margin for spacing between image and input
    },
    spaceEvenly: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontWeight: "bold",
    },
    middleDot: {
        position: "relative",
        bottom: 3, // Adjust this value as needed to align the dot
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        gap: 10,
    },
});
