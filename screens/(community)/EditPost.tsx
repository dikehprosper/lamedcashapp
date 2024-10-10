/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Dimensions,
    Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Colors, { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "@/constants/languages";
import DOMAIN from "@/components/(Utils)/domain";


const EditPost = ({ navigation, route }: any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const { post } = route.params;
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const [content, setContent] = useState(post.body);
    const [uploading, setUploading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setContent(post.body);
        }, [post])
    );

    const editPost = async () => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (!uploading && token) {
            try {
                setUploading(true);

                const request = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        postId: post._id,
                        postUpdate: { body: content },
                    }),
                };

                const response = await fetch(`${DOMAIN}/api/posts`, request);
                console.log(response);
                setUploading(false);
                const responseData = await response.json();
                console.log(responseData);

                if (response.ok) {
                    setUploading(false);
                    setContent("");
                    navigation.goBack();
                    const responseData = await response.json();
                    console.log(responseData);
                    let toast = Toast.show("Toast created.", {
                        backgroundColor: Colors.default1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }
            } catch (error) {
                console.log(error);
                setUploading(false);
            }
        } else {
            console.log("Already uploading post...");
        }
    };

    const startsWithHashtag = content.startsWith("#");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                contentContainerStyle={{ flex: 1 }}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{ height: "100%" }}
                >
                    <View
                        style={{
                            height: "100%",
                            margin: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Text
                                    style={{
                                        color: Colors.default1,
                                        fontWeight: 600,
                                    }}
                                >
                                    {languageText.text235}
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontFamily: "sf-bold",
                                    color: Colors.welcomeText,
                                    fontSize: 16,
                                }}
                            >
                                {languageText.text236}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.default1,
                                    opacity: content === "" ? 0.5 : 1,
                                    padding: 5,
                                    width: 78,
                                    height: 29,
                                    borderRadius: 12,
                                }}
                                onPress={editPost}
                            >
                                {uploading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: 600,
                                            textAlign: "center",
                                        }}
                                    >
                                        {languageText.text237}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Profile pic and type view */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                paddingVertical: 10,
                                marginTop: 20,
                                minHeight:
                                    Dimensions.get("window").height * 0.5,
                            }}
                        >
                            <View>
                                <Image
                                    source={{
                                        uri: data.image
                                            ? data.image
                                            : "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
                                    }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 60,
                                        marginRight: 10,
                                    }}
                                />
                            </View>
                            <View style={{ width: "84%" }}>
                                <TextInput
                                    placeholder={languageText.text248}
                                    style={{
                                        color: startsWithHashtag
                                            ? Colors.default1
                                            : Colors.welcomeText, // Change text color based on condition
                                        fontFamily: "sf",
                                        letterSpacing: 0.2,
                                        fontSize: 19,
                                        maxHeight: 60,
                                        padding: 10,
                                    }}
                                    placeholderTextColor={
                                        startsWithHashtag ? "blue" : "gray"
                                    }
                                    multiline
                                    numberOfLines={5}
                                    value={content}
                                    onChangeText={(e) => setContent(e)}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditPost;
