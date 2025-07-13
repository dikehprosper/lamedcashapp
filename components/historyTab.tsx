/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */

import React, {useCallback, useEffect, useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Moment from "moment";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  SectionList,
} from "react-native";
import {Color} from "@/constants/Colors";
import {RootState} from "@/state/store";
import {useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {IOScrollView} from "react-native-intersection-observer";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {Language} from "@/constants/languages";
import {
  Status,
  Status2,
  Status3,
  Status4,
  Status5,
  Status6,
  Status7,
} from "./skeleton3";
import useNotification from "./(Utils)/displayNotification";
import ToastNotification from "./(Utils)/toastNotification";

import DOMAIN from "./(Utils)/domain";
import {AntDesign, FontAwesome6} from "@expo/vector-icons";

const History = ({
  displayNotificationIn,
  following,
  data,
  forAllMatchPrediction,
  isAdmin,
  navigation,
}: any) => {
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

  const [loading, setLoading] = useState(false);
  


  const transactionsByDate: any = {};

  data
    .filter((transaction: any) => {
      // 🔥 Filter OUT today's data using raw createdAt
      return !Moment(transaction.createdAt).isSame(Moment(), "day");
    })
    .forEach((transaction: any) => {
      const date = Moment(transaction.createdAt).format("YYYY-MM-DD");
      if (!transactionsByDate[date]) {
        transactionsByDate[date] = [];
      }
      transactionsByDate[date].push(transaction);
    });



  const restructuredData: any = [];
  const now = Moment().startOf("day"); // Current day at midnight
  const yesterday = now.clone().subtract(1, "days"); // Yesterday at midnight

  // Sort dates and filter out today's transactions
  Object.keys(transactionsByDate)
    .filter((date) => Moment(date, "YYYY-MM-DD").isBefore(now, "day")) // Exclude today's transactions
    .sort((a, b) => Moment(b, "YYYY-MM-DD").diff(Moment(a, "YYYY-MM-DD"))) // Sort dates in descending order
    .forEach((date) => {
      const sortedTransactions = transactionsByDate[date].sort(
        (a: any, b: any) => {
          return Moment(b.time, "HH:mm").diff(Moment(a.time, "HH:mm")); // Sort transactions by time
        }
      );

      const isYesterday = Moment(date, "YYYY-MM-DD").isSame(yesterday, "day");

      restructuredData.push({
        date: isYesterday
          ? "Yesterday" // Label for yesterday
          : Moment(date).format("DD MMM, YYYY"), // Format for other dates
        data: sortedTransactions,
      });
    });

  return restructuredData.length > 0 ? (
    <SectionList
      keyExtractor={(item, index) => item._id || index.toString()}
      stickySectionHeadersEnabled={true}
      sections={restructuredData}
      renderItem={({item}) => (
        <HistoryTemplate
          Colors={Colors}
          loading={loading}
          // getForYouPosts={getForYouPosts}
          data={item}
          languageText={languageText}
          isAdmin={isAdmin}
          navigation={navigation}
        />
      )}
      showsVerticalScrollIndicator={false}
      renderSectionHeader={({section}) => (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: Colors.welcomeText,
            paddingLeft: 15,
            paddingBottom: 10,
            paddingTop: 15,
          }}
        >
          {section.date}
        </Text>
      )}
      SectionSeparatorComponent={() => <View style={{height: 5}} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => forAllMatchPrediction()}
          tintColor={Colors.default1}
        />
      }
    />
  ) : (
    <View
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        height: 400,
        paddingTop: 150,
      }}
    >
      <Text style={{fontSize: 18, fontWeight: 500, color: Colors.welcomeText}}>
        {languageText.text372}
      </Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const formatSortDate = (inputDate: any) => {
  const Moment = require("moment"); // Assuming CommonJS, adjust if using ES6 imports
  return Moment(inputDate).format("YYYY-MM-DD"); // Ensure this is for sorting
};

function HistoryTemplate({
  Colors,
  loading,
  getForYouPosts,
  data,
  languageText,
  isAdmin,
  navigation,
}: any) {
  return (
    <IOScrollView contentContainerStyle={{}}>
      {!isAdmin ? (
        <TouchableOpacity
          onPressIn={() =>
            navigation.push("editFirstSectionSpecial", {
              data_league: data.league,
              data_league_flag: data.league_flag,
              data_team1: data.team1,
              data_team1_flag: data.team1_flag,
              data_team2: data.team2,
              data_team2_flag: data.team2_flag,
              data_time: data.time,
              data_status: data.status,
              data_tip: data.tip,
              data_id: data._id,
            })
          }
          style={{
            flexDirection: "column",
            height: 110,
            borderBottomColor: "rgba(120, 120, 120, 0.3)",
            borderBottomWidth: 0.5,
            backgroundColor: Colors.background,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 8,
            // Add shadow properties
            shadowColor: "#000", // Shadow color
            shadowOffset: {width: 0, height: 2}, // Shadow displacement
            shadowOpacity: 0.65, // Shadow transparency
            shadowRadius: 4, // Shadow blur
            elevation: 5, // Android shadow
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                shadowColor: "#000", // Shadow color
                shadowOffset: {width: 0, height: 2}, // Shadow displacement
                shadowOpacity: 0.65, // Shadow transparency
                shadowRadius: 4, // Shadow blur
                elevation: 5,
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
              }}
            >
              {/* <Image
                        source={{uri: image}}
                            style={{width: "100%", height: "100%", borderRadius: 4 }}
                      /> */}
              {`${DOMAIN}/${data.league_flag}` === "" ? 
              <Text>
                <FontAwesome6
                  name='bolt-lightning'
                  size={15}
                  color={Colors.welcomeText}
                  style={{position: "absolute"}}
                />
              </Text>:

              <Image
                source={{uri: `${DOMAIN}/${data.league_flag}`}}
                style={{width: "100%", height: "100%", borderRadius: 4}}
              />}
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: Colors.welcomeText,
                opacity: 0.6,
              }}
            >
              {data.league}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "row",
                gap: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {data.team1}
              </Text>

              <View
                style={{
                  shadowColor: "#000", // Shadow color
                  shadowOffset: {width: 0, height: 2}, // Shadow displacement
                  shadowOpacity: 0.65, // Shadow transparency
                  shadowRadius: 4, // Shadow blur
                  elevation: 5,
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                }}
              >
                {/* <Image
                        source={{uri: image}}
                            style={{width: "100%", height: "100%", borderRadius: 4 }}
                      /> */}

                <FontAwesome6
                  name='bolt-lightning'
                  size={15}
                  color={Colors.welcomeText}
                  style={{position: "absolute"}}
                />
                <Image
                  source={{uri: `${DOMAIN}/${data.team1_flag}`}}
                  style={{width: "100%", height: "100%", borderRadius: 4}}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                flexDirection: "row",
                marginLeft: 1,
                marginRight: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {data.time}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
                gap: 7,
              }}
            >
              <View
                style={{
                  shadowColor: "#000", // Shadow color
                  shadowOffset: {width: 0, height: 2}, // Shadow displacement
                  shadowOpacity: 0.65, // Shadow transparency
                  shadowRadius: 4, // Shadow blur
                  elevation: 5,
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                }}
              >
                {/* <Image
                        source={{uri: image}}
                            style={{width: "100%", height: "100%", borderRadius: 4 }}
                      /> */}

                <FontAwesome6
                  name='bolt-lightning'
                  size={15}
                  color={Colors.welcomeText}
                  style={{position: "absolute"}}
                />
                <Image
                  source={{uri: `${DOMAIN}/${data.team2_flag}`}}
                  style={{width: "100%", height: "100%", borderRadius: 4}}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {data.team2}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 17,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                Tip: {data.tip}
              </Text>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: "flex-start",
                flexDirection: "row",
                marginLeft: 7,
                marginRight: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              ></Text>
            </View>

            <View
              style={{
                flex: 1,
                shadowColor: "#000", // Shadow color
                shadowOffset: {width: 0, height: 2}, // Shadow displacement
                shadowOpacity: 0.65, // Shadow transparency
                shadowRadius: 4, // Shadow blur
                elevation: 5,
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              {/* <Image
                        source={{uri: image}}
                        style={{width: 50, height: 50, borderRadius: 25}}
                      /> */}
              {data.status === "Pending" ? (
                <MaterialIcons
                  name='timer'
                  size={20}
                  color={Colors.welcomeText}
                />
              ) : data.status === "Successful" ? (
                <AntDesign name='checkcircleo' size={24} color='green' />
              ) : (
                <MaterialIcons name='cancel' size={24} color='red' />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flexDirection: "column",
            height: 110,
            borderBottomColor: "rgba(120, 120, 120, 0.3)",
            borderBottomWidth: 0.5,
            backgroundColor: Colors.background,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 8,
            // Add shadow properties
            shadowColor: "#000", // Shadow color
            shadowOffset: {width: 0, height: 2}, // Shadow displacement
            shadowOpacity: 0.65, // Shadow transparency
            shadowRadius: 4, // Shadow blur
            elevation: 5, // Android shadow
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                shadowColor: "#000", // Shadow color
                shadowOffset: {width: 0, height: 2}, // Shadow displacement
                shadowOpacity: 0.65, // Shadow transparency
                shadowRadius: 4, // Shadow blur
                elevation: 5,
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
              }}
            >
              {/* <Image
                        source={{uri: image}}
                            style={{width: "100%", height: "100%", borderRadius: 4 }}
                      /> */}

              <FontAwesome6
                name='bolt-lightning'
                size={15}
                color={Colors.welcomeText}
                style={{position: "absolute"}}
              />
              <Image
                source={{uri: `${DOMAIN}/${data.league_flag}`}}
                style={{width: "100%", height: "100%", borderRadius: 4}}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: Colors.welcomeText,
                opacity: 0.6,
              }}
            >
              {data.league}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "row",
                gap: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {data.team1}
              </Text>

              <View
                style={{
                  shadowColor: "#000", // Shadow color
                  shadowOffset: {width: 0, height: 2}, // Shadow displacement
                  shadowOpacity: 0.65, // Shadow transparency
                  shadowRadius: 4, // Shadow blur
                  elevation: 5,
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                }}
              >
                {/* <Image
                        source={{uri: image}}
                            style={{width: "100%", height: "100%", borderRadius: 4 }}
                      /> */}

                <FontAwesome6
                  name='bolt-lightning'
                  size={15}
                  color={Colors.welcomeText}
                  style={{position: "absolute"}}
                />
                <Image
                  source={{uri: `${DOMAIN}/${data.team1_flag}`}}
                  style={{width: "100%", height: "100%", borderRadius: 4}}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                flexDirection: "row",
                marginLeft: 1,
                marginRight: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {data.time}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
                gap: 7,
              }}
            >
              <View
                style={{
                  shadowColor: "#000", // Shadow color
                  shadowOffset: {width: 0, height: 2}, // Shadow displacement
                  shadowOpacity: 0.65, // Shadow transparency
                  shadowRadius: 4, // Shadow blur
                  elevation: 5,
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                }}
              >
                {/* <Image
                        source={{uri: image}}
                            style={{width: "100%", height: "100%", borderRadius: 4 }}
                      /> */}

                <FontAwesome6
                  name='bolt-lightning'
                  size={15}
                  color={Colors.welcomeText}
                  style={{position: "absolute"}}
                />
                <Image
                  source={{uri: `${DOMAIN}/${data.team2_flag}`}}
                  style={{width: "100%", height: "100%", borderRadius: 4}}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                {data.team2}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 17,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              >
                Tip: {data.tip}
              </Text>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: "flex-start",
                flexDirection: "row",
                marginLeft: 7,
                marginRight: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: Colors.welcomeText,
                  opacity: 0.6,
                }}
              ></Text>
            </View>

            <View
              style={{
                flex: 1,
                shadowColor: "#000", // Shadow color
                shadowOffset: {width: 0, height: 2}, // Shadow displacement
                shadowOpacity: 0.65, // Shadow transparency
                shadowRadius: 4, // Shadow blur
                elevation: 5,
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              {/* <Image
                        source={{uri: image}}
                        style={{width: 50, height: 50, borderRadius: 25}}
                      /> */}
              {data.status === "Pending" ? (
                <MaterialIcons
                  name='timer'
                  size={20}
                  color={Colors.welcomeText}
                />
              ) : data.status === "Successful" ? (
                <AntDesign name='checkcircleo' size={24} color='green' />
              ) : (
                <MaterialIcons name='cancel' size={24} color='red' />
              )}
            </View>
          </View>
        </View>
      )}
    </IOScrollView>
  );
}
