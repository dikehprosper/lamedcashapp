import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Pressable,
  Animated,
} from "react-native";
import Moment from "moment";
import React, {useCallback, useEffect, useRef, useState} from "react";
import TodayTab from "@/components/todayTab";
import HistoryTab from "@/components/historyTab";
import {Color} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {useFocusEffect} from "@react-navigation/native";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {MaterialIcons, AntDesign} from "@expo/vector-icons";
import {Language} from "@/constants/languages";
import useNotification from "@/components/(Utils)/displayNotification";
import ToastNotification from "@/components/(Utils)/toastNotification";
import {
  getMatchPrediction,
  getMatchPrediction2,
} from "@/state/userData/getUserData";

export default function OrderListNavigatorFirstSection({navigation}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const data1 = useSelector((state: RootState) => state.getUserData.data);
  const isAdmin = data1.email === "admin2@lamedcash.com";
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0); // Custom tab index
  const tabs = ["History", "Today"];

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

  const {backgroundColor, color, displayNotificationIn, notification, show2} =
    useNotification();

  const todayData = data1.transactionHistory.filter((entry: any) =>
    Moment(entry.date).isSame(Moment(), "day")
  );
  const customerMadeDepositToday =
    todayData.length > 0 || isAdmin ? true : false;

  function forAllMatchPrediction() {
    dispatch(getMatchPrediction())
      .then((result: any) => {
        if (result.payload.success) {
          setData(result.payload.allMatch);
        } else {
          console.error(
            "Failed to fetch match predictions:",
            result.payload.message
          );
        }
      })
      .catch((error: any) => {
        console.error("Error fetching match predictions:", error);
      });
  }

  useFocusEffect(
    useCallback(() => {
      forAllMatchPrediction();
    }, [])
  );

  useEffect(() => {
    console.log(data, "data");
  }, [data]);

  const renderTabContent = () => {
    return index === 1 ? (
      <TodayTab
        isAdmin={isAdmin}
        displayNotificationIn={displayNotificationIn}
        data={data}
        forAllMatchPrediction={forAllMatchPrediction}
        navigation={navigation}
        customerMadeDepositToday={customerMadeDepositToday}
      />
    ) : (
      <HistoryTab
        isAdmin={isAdmin}
        displayNotificationIn={displayNotificationIn}
        data={data}
        forAllMatchPrediction={forAllMatchPrediction}
        navigation={navigation}
      />
    );
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
          <View style={styles.header}>
            {/* <TouchableOpacity
              onPressIn={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialIcons
                name='arrow-back-ios-new'
                size={21}
                color={Colors.welcomeText}
              />
            </TouchableOpacity> */}
            <Text style={[styles.headerTitle, {color: Colors.welcomeText}]}>
              {languageText.text366}
            </Text>
            <View />
          </View>

          {isAdmin && (
            <View style={styles.adminButtonWrapper}>
              <TouchableOpacity
                onPressIn={() => navigation.push("editfirstsection")}
                style={[styles.adminButton, {borderColor: Colors.welcomeText}]}
              >
                <Text
                  style={[styles.adminButtonText, {color: Colors.welcomeText}]}
                >
                  {languageText.text375}
                </Text>
                <AntDesign
                  name='arrowright'
                  size={21}
                  color={Colors.welcomeText}
                />
              </TouchableOpacity>
              <View />
            </View>
          )}

          <View style={styles.tabContainer}>
            {tabs.map((tabTitle, i) => (
              <TouchableOpacity
                key={tabTitle}
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
                    fontFamily: "sf-bold",
                    color:
                      index === i ? Colors.default1 : Colors.tabbarLabelColor,
                  }}
                >
                  {tabTitle === "History"
                    ? languageText.text369
                    : languageText.text370}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>

      {renderTabContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    opacity: 0.6,
  },
  headerTitle: {
    fontWeight: "600",
    opacity: 0.8,
    fontSize: 21,
    color: "#fff",
  },
  adminButtonWrapper: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    gap: 10,
  },
  adminButtonText: {
    fontWeight: "600",
    fontSize: 21,
    opacity: 0.95,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 12,
    alignItems: "center",
  },
});
