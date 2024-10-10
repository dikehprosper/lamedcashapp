/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Color } from "@/constants/Colors";
import { Language } from "@/constants/languages";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const NotificationCard = ({ notification }: any) => {
    const dateObject = new Date(notification.createdAt);

    const navigation = useNavigation();

    // Format the date using toLocaleDateString()
    const formattedDate = dateObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second: 'numeric',
        // timeZone: 'UTC', // Assuming dates are in UTC
    });
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

    console.log(notification.from?.image, "imag of notification");
        return (
            <TouchableOpacity
                onPress={() => {
                    if (
                        notification.type === "like" ||
                        notification.type === "comment"
                    ) {
                        //@ts-ignore
                        navigation.navigate("Post", {
                            post: notification.post,
                        });
                    }
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        width: Dimensions.get("screen").width,
                        paddingVertical: 20,
                        backgroundColor: Colors.background,
                        paddingLeft: 30,
                        alignItems: "flex-start",
                        borderBottomWidth: 0.2,
                        borderBottomColor: Colors.greyPost,
                    }}
                >
                    <Image
                        source={{
                            uri:
                                notification.from?.image === ""
                                    ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d"
                                    : notification.from?.image,
                        }}
                        style={{ width: 32, height: 32, borderRadius: 16 }}
                    />

                    <View style={{ marginLeft: 20 }}>
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontFamily: "sf-bold",
                                fontSize: 16,
                            }}
                        >
                            {notification.description}
                        </Text>
                        <Text style={{ color: Colors.greyPost, marginTop: 10 }}>
                            {formattedDate}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
};

export default NotificationCard;
