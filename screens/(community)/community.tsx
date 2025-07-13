/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {Color} from "@/constants/Colors";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import Drawer from "@/components/icons/Drawer";
import NotificationIcon from "@/components/icons/NotificationIcon";
import {Ionicons} from "@expo/vector-icons";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {Language} from "@/constants/languages";
import FollowingTab from "@/components/forYouTab";
import useNotification from "@/components/(Utils)/displayNotification";
import ToastNotification from "@/components/(Utils)/toastNotification";
import Icon from "react-native-vector-icons/FontAwesome";
import socket from "@/utils/socket";
import DOMAIN from "@/components/(Utils)/domain";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderListNavigator(props: any) {
  const data = useSelector((state: RootState) => state.getUserData.data);
  const [unreadNotifications, setUnreadNotifications] = useState<any[]>([]);

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

  const [index, setIndex] = React.useState(0);
  const tabs = [
    {title: languageText.text257, key: "foryou"},
    {title: languageText.text258, key: "betCommunity"},
  ];

  const layout = useWindowDimensions();

  const {backgroundColor, color, displayNotificationIn, notification, show2} =
    useNotification();

  const renderTabContent = () => {
    return (
      <View style={{flex: 1}}>
        {index === 0 ? (
          <FollowingTab
            following={true}
            displayNotificationIn={displayNotificationIn}
            isFocused={true}
            index={index}
          />
        ) : (
          <FollowingTab
            following={false}
            displayNotificationIn={displayNotificationIn}
            isFocused={true}
            index={index}
          />
        )}
      </View>
    );
  };

  const [expanded, setExpanded] = useState(false);
  const animations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const triggerAnimations = () => {
    const toValue = expanded ? 0 : 1;
    Animated.stagger(
      50,
      animations.map((animation) =>
        Animated.spring(animation, {toValue, useNativeDriver: true})
      )
    ).start();
    setExpanded(!expanded);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
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
            <Drawer color={Colors.welcomeText} onPress={toggleDrawer} />
            <NotificationIcon
              onPress={navigateToNotfications}
              unreadNotifications={unreadNotifications}
            />
          </View>

          <View style={styles.tabContainer}>
            {tabs.map((tab, i) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setIndex(i)}
                style={[
                  styles.tab,
                  index === i && {
                    borderBottomColor: Colors.default1,
                    borderBottomWidth: 2,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 16,
                    textTransform: "none",
                    color:
                      index === i ? Colors.default1 : Colors.tabbarLabelColor,
                  }}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>

      {renderTabContent()}

      {expanded && (
        <TouchableOpacity
          onPress={triggerAnimations}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <Pressable
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          borderRadius: 90,
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 12,
    alignItems: "center",
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
    } else if (iconName === "edit") {
      props.navigation.navigate("AddPostScreen");
    } else if (iconName === "user") {
      props.navigation.navigate("CommunityProfile");
    }
    triggerAnimations();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={triggerAnimations}
        style={[
          styles.button,
          {backgroundColor: !expanded ? Colors.default1 : Colors.default1},
        ]}
      >
        <Ionicons name='add' size={30} color={"#fff"} />
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
          <TouchableOpacity onPress={() => handleNavigation(iconName)}>
            <Icon name={iconName} size={23} color='#FFF' />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};
