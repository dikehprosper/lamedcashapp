/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
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
import React, { useEffect, useRef, useState } from "react";
import Colors, { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { getUser } from "@/state/userData/getUserData";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "@/constants/languages";
import * as VideoThumbnail from "expo-video-thumbnails";
import DOMAIN from "@/components/(Utils)/domain";


const AddPostScreen = ({ navigation }: any) => {
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

    const [user, setUser] = useState({});
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [selectedImageFiles, setSelectedImageFiles] = useState<any>([]);
    const [content, setContent] = useState("");
    const [uploading, setUploading] = useState(false);

    const addImage = async () => {
        try {
            // Pick images from gallery
            let result = await ImagePicker.launchImageLibraryAsync({
                quality: 1,
                allowsMultipleSelection: true,
            });

            // If results are obtained, update the pictures state
            if (!result.canceled) {
                // Extract URIs from the results
                const newImages = result.assets.map((asset) => asset.uri);

                // Update pictures state by appending the new images
                setSelectedImages((prevImages: []) => [
                    ...prevImages,
                    ...newImages,
                ]);

                // You can add any additional logic here, e.g., closing a modal
            } else {
                alert("You did not select any image.");
            }
        } catch (error) {
            console.error("Error picking images: ", error);
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            allowsMultipleSelection: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });

        if (!result.canceled) {
            const dummyImages: any[] = [];
            const dummyImageFiles: any[] = [];
            for (let asset of result.assets) {
                dummyImages.push(asset.uri);
                if (asset.type === "image") {
                    const manipResult = await ImageManipulator.manipulateAsync(
                        asset.uri,
                        [], // No transformations; only compress and change format
                        {
                            compress: 0.7,
                            format: ImageManipulator.SaveFormat.JPEG,
                        } // Change format to JPEG
                    );

                    const file = {
                        uri: manipResult.uri,
                        name: asset.fileName || "new-post.jpg", // Default to JPEG extension
                        type: "image/jpeg", // MIME type for JPEG
                    };
                    dummyImageFiles.push({
                        uri: file.uri,
                        type: file.type,
                        name: file.name,
                        thumbnail: null,
                    });
                } else {
                    const { uri } = await VideoThumbnail.getThumbnailAsync(
                        asset.uri,
                        { time: 0 }
                    );

                    const file = {
                        uri: asset.uri,
                        name: asset.fileName,
                        type: asset.mimeType,
                    };
                    dummyImageFiles.push({
                        uri: file.uri,
                        type: file.type,
                        name: file.name,
                        thumbnail: uri,
                    });
                }
            }
            setSelectedImageFiles(dummyImageFiles);
            // setSelectedImages(dummyImages);
        } else {
            alert("You did not select any image.");
        }
    };

    const uploadPost = async () => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (!uploading && token) {
            try {
                setUploading(true);
                console.log("CONTENT: ", content);
                console.log("IMAGE: ", selectedImages);

                const formData = new FormData();
                formData.append("body", content);
                selectedImageFiles.forEach((images: any, index: any) => {
                    formData.append(`images`, images);
                });

                const request = {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                };

                const response = await fetch(
                    `${DOMAIN}/api/posts/createPost`,
                    request
                );
                console.log(response);
                setUploading(false);
                const responseData = await response.json();
                console.log(responseData);

                if (response.ok) {
                    setUploading(false);
                    setContent("");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Explore" }],
                    });
                    setSelectedImages([]);
                    const responseData = await response.json();
                    console.log(responseData);
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
                keyboardVerticalOffset={50}
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
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
                        {/* Cancel and post button view */}
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
                                {languageText.text249}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.default1,
                                    opacity:
                                        content === "" ||
                                        selectedImages.length < 0
                                            ? 0.5
                                            : 1,
                                    padding: 5,
                                    width: 78,
                                    height: 29,
                                    borderRadius: 12,
                                }}
                                onPress={uploadPost}
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
                                        {languageText.text250}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Profile pic and type view */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                padding: 10,
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
                {/* Position the view to screen bottom*/}
                <View style={{ marginTop: "auto" }}>
                    {selectedImageFiles.length !== 0 ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                padding: 12,
                                marginHorizontal: 5,
                                paddingTop: 0,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 15,
                            }}
                            decelerationRate={0}
                            snapToInterval={350}
                            snapToAlignment={"center"}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 78,
                                    height: 78,
                                    borderWidth: 0.5,
                                    borderColor: Colors.greyPost,
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={addImage}
                            >
                                <MaterialCommunityIcons
                                    name="camera-outline"
                                    size={30}
                                    color={Colors.default1}
                                />
                            </TouchableOpacity>
                            {selectedImageFiles.map(
                                (image: any, index: number) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{ position: "relative" }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    padding: 5,
                                                    backgroundColor: "red",
                                                    alignSelf: "flex-start",
                                                    borderRadius: 90,
                                                    position: "absolute",

                                                    right: -5,
                                                    zIndex: 40,
                                                }}
                                                onPress={() => {
                                                    setSelectedImageFiles(
                                                        (prev: any) =>
                                                            prev.filter(
                                                                (item: any) =>
                                                                    item.uri !==
                                                                    image.uri
                                                            )
                                                    );
                                                    setSelectedImages(
                                                        (prev: any) =>
                                                            prev.filter(
                                                                (item: any) =>
                                                                    item !==
                                                                    image.uri
                                                            )
                                                    );
                                                }}
                                            >
                                                <Ionicons
                                                    name="close"
                                                    size={15}
                                                />
                                            </TouchableOpacity>
                                            <Image
                                                source={{
                                                    uri:
                                                        image.thumbnail ??
                                                        image.uri,
                                                }}
                                                style={{
                                                    width: 78,
                                                    height: 78,
                                                    borderRadius: 12,
                                                }}
                                            />
                                        </View>
                                    );
                                }
                            )}
                        </ScrollView>
                    ) : (
                        <View />
                    )}
                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignSelf: "flex-start",
                            flexDirection: "row",
                            paddingVertical: 10,
                            marginHorizontal: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                paddingLeft: 5,
                                gap: 10,
                                // justifyContent: "space-around",
                            }}
                        >
                            <Ionicons
                                name="image-outline"
                                size={25}
                                color={Colors.default1}
                                onPress={pickImageAsync}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AddPostScreen;
