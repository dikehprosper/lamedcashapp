/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
    Animated,
    TouchableWithoutFeedback,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import React, { useEffect, useRef, useState } from "react";
import forYouTab from "@/components/forYouTab";
import followingTab from "@/components/followingTab";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
    NavigationState,
    SceneMap,
    SceneRendererProps,
    TabBar,
    TabView,
} from "react-native-tab-view";
import CustomMiddleComponent, {
    CustomMiddleComponentRef,
} from "@/components/CustomMiddleComponent";
import Drawer from "@/components/icons/Drawer";
import NotificationIcon from "@/components/icons/NotificationIcon";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabBar from "@/components/CustomTabBar";
import { Language } from "@/constants/languages";
import FollowingTab from "@/components/forYouTab";
import useNotification from "@/components/(Utils)/displayNotification";
import ToastNotification from "@/components/(Utils)/toastNotification";
import Icon from "react-native-vector-icons/FontAwesome";
import socket from "@/utils/socket";
import * as Notifications from "expo-notifications";
import DOMAIN from "@/components/(Utils)/domain";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator(props: any) {
    const data = useSelector((state: RootState) => state.getUserData.data); // Replace any with actual data type
    const [filteredData, setFilteredData] = useState<any[]>([]); // Replace any with actual data type
    const [unreadNotifications, setUnreadNotifications] = useState<any[]>([]);
    // Example filter function (replace with your actual filter logic)
    // const filterFunction = (item: any, searchText: string) => {
    //     // Replace with your actual filter logic
    //     return item.title.toLowerCase().includes(searchText.toLowerCase());
    // };

    // // Function to handle search from CustomMiddleComponent
    // const handleSearch = (text: string) => {
    //     const filtered = data.filter((item) => filterFunction(item, text));
    //     setFilteredData(filtered);
    // };

    useEffect(() => {
        socket.emit("authenticate", data._id);
        socket.on("notification", (data: any) => {
            console.log("notification", data);
        });

        return () => {
            socket.off("notification", () =>
                console.log("out of live notifications")
            );
        };
    }, []);

    const navigateToNotfications = () => {
        props.navigation.navigate("Notifications");
    };

    const toggleDrawer = () => {
        props.navigation.toggleDrawer();
    };

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

    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = [{ name: "For you" }, { name: "Following" }];

    // const selectTab = (index: number) => {
    //     setActiveIndex(index);
    // };

    // const currentTab = (tabs: any[]) => {
    //     if (activeIndex === 0) {
    //         return forYouTab;
    //     }
    //     return followingTab;
    // };

    // const showActiveTab = currentTab(tabs)!;

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
            case "foryou":
                return (
                    
                    <FollowingTab
                        following={true}
                        displayNotificationIn={displayNotificationIn}
                    />
                );
            case "betCommunity":
                return (
              <FollowingTab
                        following={false}
                        displayNotificationIn={displayNotificationIn}
                    />
                    
                );
            default:
                return null;
        }
    };

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "foryou", title: languageText.text257 },
        { key: "betCommunity", title: languageText.text258 },
    ]);

    const renderTabBar = (
        props: SceneRendererProps & {
            navigationState: NavigationState<{ key: string; title: string }>;
        }
    ) => {
        return (
            <SafeAreaView>
                <ToastNotification
                    show={show2}
                    text={notification.text}
                    textColor={color}
                    marginTop={Platform.OS === "ios" ? 0 : 0}
                    backgroundColor={backgroundColor}
                    icon={notification.icon}
                />

                <BottomSheetModalProvider>
                    <View
                        style={{
                            flexDirection: "row",
                            margin: 10,
                            paddingHorizontal: 10,
                            gap: 10,
                            justifyContent: "space-between",
                        }}
                    >
                        <Drawer
                            color={Colors.welcomeText}
                            onPress={toggleDrawer}
                        />
                        {/* <CustomMiddleComponent
                            ref={(ref: CustomMiddleComponentRef | null) => {}}
                            array={filteredData}
                            setArray={setFilteredData}
                            originalData={data}
                            filterFunction={filterFunction}
                        /> */}
                        <NotificationIcon
                            onPress={navigateToNotfications}
                            unreadNotifications={unreadNotifications}
                        />
                    </View>
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
                            // fontWeight: "700",
                            textTransform: "none",
                            fontSize: 16,
                            fontFamily: "sf-bold",
                        }}
                        activeColor={Colors.default1}
                        inactiveColor={Colors.tabbarLabelColor}
                    />
                </BottomSheetModalProvider>
            </SafeAreaView>
        );
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
                Animated.spring(animation, { toValue, useNativeDriver: true })
            )
        ).start();

        setExpanded(!expanded);
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
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
                    props={props}
                />
            </Pressable>
        </View>
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
    props,
}: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );

    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    function handleNavigation(iconName: any) {
        if (iconName === "bell") {
            props.navigation.navigate("Notifications");
            triggerAnimations();
        } else if (iconName === "edit") {
            props.navigation.navigate("AddPostScreen");
            triggerAnimations();
        } else if (iconName === "user") {
            props.navigation.navigate("CommunityProfile");
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
