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
import React, {useEffect, useRef, useState, useCallback} from "react";
import forYouTab from "@/components/forYouTab";
import followingTab from "@/components/followingTab";
import {Color} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import TodayTab2 from "@/components/todayTab2";
import HistoryTab2 from "@/components/historyTab2";
import {useFocusEffect} from "@react-navigation/native";
import Moment from "moment";
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
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import CustomTabBar from "@/components/CustomTabBar";
import {Language} from "@/constants/languages";
import FollowingTab from "@/components/forYouTab";
import useNotification from "@/components/(Utils)/displayNotification";
import ToastNotification from "@/components/(Utils)/toastNotification";
import Icon from "react-native-vector-icons/FontAwesome";
import socket from "@/utils/socket";
import * as Notifications from "expo-notifications";
import DOMAIN from "@/components/(Utils)/domain";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {getMatchPrediction} from "@/state/userData/getUserData";
// const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator({navigation}: any) {
  const data1 = useSelector((state: RootState) => state.getUserData.data);
  const isAdmin = data1.email === "admin2@lamedcash.com" ? true : false;
  const dispatch = useDispatch<AppDispatch>();
  const [filteredData, setFilteredData] = useState<any[]>([]); // Replace any with actual data type
  const [unreadNotifications, setUnreadNotifications] = useState<any[]>([]);

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
  const tabs = [{name: "For you"}, {name: "Following"}];

  const layout = useWindowDimensions();

  const {backgroundColor, color, displayNotificationIn, notification, show2} =
    useNotification();

  const [data, setData] = useState([]);

  const todayData = data1.transactionHistory.filter((entry: any) =>
    Moment(entry.date).isSame(Moment(), "day")
  );
  const customerMadeDepositToday =
    todayData.length > 0 || isAdmin ? true : false;

  function forAllMatchPrediction() {
    dispatch(getMatchPrediction())
      .then((result: any) => {
        if (result.payload.success) {
          console.log(result.payload.allMatch, "allMatch");
          setData(result.payload.allMatch);
          // displayNotification1();
        } else {
          console.error(
            "Failed to fetch match predictions:",
            result.payload.message
          );
        }
      })
      .catch((error: any) => {
        console.error("Error fetching match predictions:", error);
        // displayNotification2();
        // setLoading(false);
      });
  }

  // useEffect(() => {
  //   forAllMatchPrediction();
  // }, []);

  // useEffect(() => {
  //   // Start interval to fetch data every 30 seconds
  //   const intervalId = setInterval(() => {
  //     forAllMatchPrediction();
  //   }, 30000);

  //   // Cleanup the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    if (isAdmin) {
      // Skip setting up the interval for admins
      console.log("Admin detected, no interval fetch.");
      return;
    }

    // Non-admin: Start interval to fetch data every 30 seconds
    forAllMatchPrediction(); // Fetch immediately on mount
    const intervalId = setInterval(() => {
      forAllMatchPrediction();
    }, 30000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isAdmin]);

  useFocusEffect(
    useCallback(() => {
      // Call the function when the screen comes into focus
      forAllMatchPrediction();
    }, []) // Empty dependency array means it runs on every focus
  );

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case "today":
        return (
          <TodayTab2
            isAdmin={isAdmin}
            displayNotificationIn={displayNotificationIn}
            data={data}
            forAllMatchPrediction={forAllMatchPrediction}
            navigation={navigation}
            customerMadeDepositToday={customerMadeDepositToday}
          />
        );
      case "history":
        return (
          <HistoryTab2
            isAdmin={isAdmin}
            displayNotificationIn={displayNotificationIn}
            data={data}
            forAllMatchPrediction={forAllMatchPrediction}
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
      {key: "history", title: languageText.text369},
      {key: "today", title: languageText.text370},
    ]);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
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
              flexDirection: "column",
              paddingHorizontal: 0,
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={styles.transaction_template_container_header_1}>
              <TouchableOpacity
                onPressIn={() => navigation.goBack()}
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  paddingRight: 3,
                  backgroundColor: "transparent",
                  borderColor: Colors.welcomeText,
                  opacity: 0.6,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <MaterialIcons
                  name='arrow-back-ios-new'
                  size={21}
                  color={Colors.welcomeText}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.welcomeText,
                  fontWeight: "600",
                  opacity: 0.8,
                  fontSize: 21,
                }}
              >
                {languageText.text368}
              </Text>
              <View></View>
            </View>
            {isAdmin && (
              <View style={styles.transaction_template_container_header_1}>
                <TouchableOpacity
                  onPressIn={() => navigation.push("editsecondsection")}
                  style={{
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingRight: 3,
                    paddingLeft: 10,
                    backgroundColor: "transparent",
                    borderColor: Colors.welcomeText,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 15,
                    borderWidth: 2,
                    borderRadius: 5,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.welcomeText,
                      fontWeight: "600",
                      opacity: 0.95,
                      fontSize: 21,
                    }}
                  >
                    {languageText.text375}
                  </Text>
                  <AntDesign
                    name='arrowright'
                    size={21}
                    color={Colors.welcomeText}
                    opacity={0.9}
                    fontWeight={900}
                  />
                </TouchableOpacity>

                <View></View>
              </View>
            )}
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

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
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
  transaction_template_container_header_1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "700",
    flexDirection: "row",
    padding: 15,
    gap: 20,
  },
});
