/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { colorScheme } from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import SinglePostPreview from "@/components/card/SinglePostPreview";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import Colors, { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image, ImageBackground } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    TouchableOpacity,
    Animated,
} from "react-native";
import { useSelector } from "react-redux";
import MyPosts from "../profile/MyPosts";
import MyComments from "../profile/MyComments";
import MyLikes from "../profile/MyLikes";
import MyFavourites from "../profile/MyFavourites";
import {
    NavigationState,
    SceneRendererProps,
    TabBar,
    TabView,
} from "react-native-tab-view";
import Drawer from "@/components/icons/Drawer";
import { useFocusEffect } from "@react-navigation/native";
import { Language } from "@/constants/languages";
import useNotification from "@/components/(Utils)/displayNotification";
import ToastNotification from "@/components/(Utils)/toastNotification";
import DOMAIN from "@/components/(Utils)/domain";
import Icon from "react-native-vector-icons/FontAwesome";

const profileTabList = ["Posts", "Comments", "Likes", "Favourites"];

const ProfileScreenLayout = ({ children }: any) => {
    console.log("PLATFORM: ", Platform.OS);

    // if (Platform.OS === "android") {
    //     return (
    //         <SafeAreaView
    //             style={{
    //                 width: "100%",
    //                 flex: 1,
    //                 backgroundColor: Color.darkMode.background,
    //             }}
    //         >
    //             {children}
    //         </SafeAreaView>
    //     );
    // }
    // if (Platform.OS === "ios") {
    //     return (
    //         <View
    //             style={{
    //                 width: "100%",
    //                 flex: 1,
    //                 backgroundColor:
    //                     colorScheme.state === 1
    //                         ? Color.lightMode.background
    //                         : Color.darkMode.background,
    //             }}
    //         >
    //             {children}
    //         </View>
    //     );
    // }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            {children}
        </SafeAreaView>
    );
};

export default function ProfileScreen({ navigation }: any) {
    const [activeTab, setActiveTab] = useState(profileTabList[0]);
    const [loading, setLoading] = useState(true);
    const [myPosts, setMyPosts] = useState([]);
    const data = useSelector((state: RootState) => state.getUserData.data);
    const [userData, setUserData] = useState(data);

    const fetchUserDeta = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const {
                data: { user },
            } = await fetch(`${DOMAIN}/api/users/actions/data?id=${data._id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json());
            console.log("user", user);

            setUserData(user);
        } catch (err) {}
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserDeta();
        }, []),
    );

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

    const styles = StyleSheet.create({
        profileScreen: {
            // height: "100%",
            // width: "100%",
        },
        coverPhoto: {
            height: 150,
        },
    } as any);

    const layout = useWindowDimensions();
    const {
        backgroundColor,
        color,
        displayNotificationIn,
        notification,
        show2,
    } = useNotification();
    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case "posts":
                return (
                    <MyPosts displayNotificationIn={displayNotificationIn} />
                );
            case "comments":
                return (
                    <MyComments displayNotificationIn={displayNotificationIn} />
                );
            case "likes":
                return (
                    <MyLikes displayNotificationIn={displayNotificationIn} />
                );
            case "favorites":
                return (
                    <MyFavourites
                        displayNotificationIn={displayNotificationIn}
                    />
                );
            default:
                return null;
        }
    };
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "posts", title: languageText.text241 },
        { key: "comments", title: languageText.text238 },
        { key: "likes", title: languageText.text246 },
        { key: "favorites", title: languageText.text247 },
    ]);

    const renderTabBar = (
        props: SceneRendererProps & {
            navigationState: NavigationState<{ key: string; title: string }>;
        },
    ) => {
        return (
            <TabBar
                {...props}
                style={{
                    backgroundColor: "none",
                    elevation: 0,
                    borderBottomColor: Colors.postSelectionBorderColor,
                    borderBottomWidth: 1,
                }}
                indicatorStyle={{
                    backgroundColor: Colors.default1,
                }}
                labelStyle={{
                    textTransform: "none",
                    fontSize: 16,
                    fontFamily: "sf-bold",
                }}
                tabStyle={{
                    width: 140,
                }}
                activeColor={Colors.default1}
                inactiveColor={Colors.tabbarLabelColor}
                scrollEnabled
            />
        );
    };

    const toggleDrawer = () => {
        navigation.toggleDrawer();
    };

    const [expanded, setExpanded] = useState(false);
    const animations = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    const triggerAnimations = () => {
        const toValue = expanded ? 0 : 1; // Determine the target value based on the current state

        // Apply animation to all Animated.Values in the array
        Animated.stagger(
            50,
            animations.map((animation) =>
                Animated.spring(animation, { toValue, useNativeDriver: true }),
            ),
        ).start();

        setExpanded(!expanded);
    };

    return (
        <ProfileScreenLayout>
            <ToastNotification
                show={show2}
                text={notification.text}
                textColor={color}
                marginTop={Platform.OS === "ios" ? 0 : 0}
                backgroundColor={backgroundColor}
                icon={notification.icon}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: Colors.background,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                }}
            >
                <TouchableOpacity>
                    <Drawer color={Colors.welcomeText} onPress={toggleDrawer} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="ellipsis-vertical"
                            size={25}
                            style={{ color: Colors.welcomeText }}
                        />
                    </TouchableOpacity> */}
            </View>
            <View
                style={{
                    backgroundColor: Colors.background,
                    paddingBottom: 0,
                    paddingTop: Platform.OS === "android" ? 5 : 0,
                    width: "100%",
                    alignItems: "center",
                    height: "100%",
                    flex: 1,
                }}
            >
                <View style={styles.profileScreen}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                            paddingHorizontal: 20,
                            paddingTop: 15,
                            paddingBottom: 0,
                        }}
                    >
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: "flex-start",
                                        width: "35%",
                                        justifyContent: "flex-start",

                                        display: "flex",
                                    }}
                                >
                                    <Image
                                        source={
                                            userData.image
                                                ? { uri: userData.image }
                                                : {
                                                      uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
                                                  }
                                        }
                                        style={{
                                            width: 76,
                                            height: 76,
                                            borderRadius: 38,
                                            borderWidth: 4,
                                            borderColor:
                                                "rgba(120, 120, 120, 0.3)",
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        alignItems: "center",
                                        width: "65%",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 20,
                                            marginBottom: 20,
                                            marginLeft: 5,
                                            alignItems: "center",
                                            justifyContent: "space-evenly",
                                        }}
                                    >
                                        <View
                                            style={{
                                                alignItems: "center",
                                                width: "26%",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: Colors.welcomeText,
                                                    fontSize: 16,
                                                    fontFamily: "sf-bold",
                                                }}
                                            >
                                                {userData?.postCount}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: Colors.greyPost,
                                                    fontSize: 16,
                                                    fontFamily: "sf",
                                                    flexWrap: "nowrap",
                                                }}
                                            >
                                                {languageText.text241}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                alignItems: "center",
                                                width: "37%",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: Colors.welcomeText,
                                                    fontSize: 16,
                                                    fontFamily: "sf-bold",
                                                }}
                                            >
                                                {userData.following?.length}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: Colors.greyPost,
                                                    fontSize: 16,
                                                    fontFamily: "sf",
                                                }}
                                            >
                                                {languageText.text239}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                alignItems: "center",
                                                width: "37%",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: Colors.welcomeText,
                                                    fontSize: 16,
                                                    fontFamily: "sf-bold",
                                                }}
                                            >
                                                {userData.followers?.length}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: Colors.greyPost,
                                                    fontSize: 16,
                                                    fontFamily: "sf",
                                                }}
                                            >
                                                {languageText.text242}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontFamily: "sf-bold",
                                        color: Colors.welcomeText,
                                        fontSize: 18,
                                        letterSpacing: 0.6,
                                        paddingTop: 10,
                                    }}
                                >
                                    {userData.fullname}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "sf-bold",
                                        color: Colors.welcomeText,
                                        fontSize: 14,
                                        letterSpacing: 0.6,
                                        opacity: 0.7,
                                    }}
                                >
                                    {userData.tag}
                                </Text>
                                {/* <Text
                                    style={{
                                        fontFamily: "sf",
                                        color: Colors.welcomeText,
                                        fontSize: 14,
                                        letterSpacing: 0.4,
                                        paddingTop: 16,
                                    }}
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                >
                                    I'm a tech enthusiast and I am dedicated to
                                    making world better through tech
                                </Text> */}
                            </View>
                            {/* <Pressable
                                style={{
                                    height: 44,
                                    borderWidth: 1.2,
                                    borderColor: "rgba(255,255,255,0.3)",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingLeft: 25,
                                    paddingRight: 25,
                                    borderRadius: 50,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "sf-bold",
                                        color: "#ffffff",
                                        fontSize: 17,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    Edit Pofile
                                </Text>
                            </Pressable> */}
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 5, flex: 1 }}>
                    <TabView
                        tabBarPosition="top"
                        renderTabBar={renderTabBar}
                        sceneContainerStyle={{ flex: 1 }}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                    />
                </View>
            </View>
            {/* <FloatingAction
                    position="right"
                    color={Colors.default1}
                    onPressMain={() => navigation.navigate("AddPostScreen")}
                    iconHeight={23}
                    iconWidth={23}
                    buttonSize={60}
                /> */}
            {expanded && (
                <TouchableOpacity
                    onPress={triggerAnimations}
                    style={{
                        backgroundColor: "transparent",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                ></TouchableOpacity>
            )}

            <Pressable
                // onPress={() => props.navigation.navigate("AddPostScreen")}
                style={{
                    // backgroundColor: Colors.default1,
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    borderRadius: 90,
                    // padding: 16,
                }}
            >
                <ExpandableButton
                    setExpanded={setExpanded}
                    expanded={expanded}
                    triggerAnimations={triggerAnimations}
                    animations={animations}
                    navigation={navigation}
                />
            </Pressable>
        </ProfileScreenLayout>
    );
}
const styles = StyleSheet.create({
    categoriesBtnActive: {
        borderBottomWidth: 2,
        alignItems: "center",
        paddingBottom: 12,
        flexDirection: "row",
        borderRadius: 1,
        width: "30%",
        justifyContent: "center",
    },
    categoriesBtn: {
        alignItems: "center",
        paddingBottom: 12,
        borderBottomColor: "rgba(128, 128, 128, .5)",
        borderRadius: 1,
        width: "30%",
        justifyContent: "center",
    },

    container: {
        alignItems: "center",
        marginTop: 200,
    },
    button: {
        marginBottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,

        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        position: "absolute",
        width: 45,
        height: 45,
        borderRadius: 25,

        justifyContent: "center",
        alignItems: "center",
        marginTop: -20,
    },
});

const ExpandableButton = ({
    setExpanded,
    expanded,
    triggerAnimations,
    animations,
    navigation,
}: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );

    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    function handleNavigation(iconName: any) {
        if (iconName === "bell") {
            navigation.navigate("Notifications");
            triggerAnimations();
        } else if (iconName === "edit") {
            navigation.navigate("AddPostScreen");
            triggerAnimations();
        } else if (iconName === "user") {
            navigation.navigate("CommunityProfile");
            triggerAnimations();
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={triggerAnimations}
                style={[
                    styles.button,
                    { backgroundColor: !expanded ? Colors.default1 : "" },
                ]}
            >
                <Ionicons name="add" size={30} color={"#fff"} />
            </TouchableOpacity>
            {["bell", "edit", "user"].map((iconName, index) => (
                <Animated.View
                    key={iconName}
                    style={[
                        styles.icon,
                        {
                            opacity: animations[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            }),
                            transform: [
                                {
                                    translateY: animations[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -50 * (index + 1)],
                                    }),
                                },
                            ],
                            backgroundColor: Colors.default1,
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => handleNavigation(iconName)}
                    >
                        <Icon name={iconName} size={23} color="#FFF" />
                    </TouchableOpacity>
                </Animated.View>
            ))}
        </View>
    );
};