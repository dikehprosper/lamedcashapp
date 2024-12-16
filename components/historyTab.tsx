/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import SinglePostPreview from "./card/SinglePostPreview3";
import LoadingCard from "./card/LoadingCard";
import axios from "axios";
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
import chelsea from "@/assets/test/chelsea.jpeg";
import spain from "../assets/test/spain.png";
import laLiga from "../assets/test/La_Liga.png";
import premierLeague from "../assets/test/Premier_League.jpeg";
import brentford from "../assets/test/brentford.png";
import barcelona from "../assets/test/barcelona.png";

import DOMAIN from "./(Utils)/domain";
import {FontAwesome6} from "@expo/vector-icons";

const History = ({displayNotificationIn, following}: any) => {
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

  const getForYouPosts = async () => {
    setLoading(true);
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const request = {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
      };

      const response = await fetch(
        `${DOMAIN}/api/posts${following ? "/following" : ""}`,
        request
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(`${following ? "following" : ""}`, responseData.data.posts);
        setFYPosts(responseData.data.posts);
        setLoading(false);
        setRefreshing(false);
      }
    } else {
      setRefreshing(false);
      setLoading(false);
      console.log("No token found");
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data from an API
    getForYouPosts().then(() => setRefreshing(false));
  }, [fyPosts]);

  useFocusEffect(
    useCallback(() => {
      getForYouPosts();
    }, [])
  );
  const postMap = ["", "", "", ""];

  const [fyPosts, setFYPosts] = useState<any[]>([
    {_id: "1", title: "Post 1", content: "This is the content of Post 1"},
    {_id: "2", title: "Post 2", content: "This is the content of Post 2"},
    {_id: "3", title: "Post 3", content: "This is the content of Post 3"},
  ]);

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchPosts = async () => {
      const response = await fetch("https://api.example.com/posts");
      const data = await response.json();
      setFYPosts(data); // Assuming `data` is an array of posts
    };

    fetchPosts().catch(console.error);
  }, []);

 const data = [
   {
     id: 1,
     date: "2024-12-14", // Add the date here
     country: "Spain",
     time: "22:00",
     championship: "La Liga",
     championshipFlag: laLiga,
     team1: "Barcelona",
     team1_flag: barcelona,
     team2: "Spain",
     team2_flag: spain,
     tip: "1X",
     status: "NS",
     statusDisplay: "Pending",
   },
   {
     id: 2,
     date: "2024-12-15", // Add the date here
     country: "England",
     time: "23:00",
     championship: "Premier League",
     championshipFlag: premierLeague,
     team1: "Chelsea",
     team1_flag: chelsea,
     team2: "Brentford",
     team2_flag: brentford,
     tip: "1",
     status: "NS",
     statusDisplay: "Pending",
   },
   {
     id: 3,
     date: "2024-12-15", // Add the date here
     country: "England",
     time: "23:00",
     championship: "Premier League",
     championshipFlag: premierLeague,
     team1: "Chelsea",
     team1_flag: chelsea,
     team2: "Brentford",
     team2_flag: brentford,
     tip: "1",
     status: "NS",
     statusDisplay: "Pending",
   },
 ];


  const [customerMadeDepositToday, setCustomerMadeDepositToday] =
    useState<any>(true);



const transactionsByDate: any = {};

// Group transactions by date
data.forEach((transaction: any) => {
  const date = transaction.date;
  if (!transactionsByDate[date]) {
    transactionsByDate[date] = [];
  }
  transactionsByDate[date].push(transaction);
});

const restructuredData: any = [];

// Sort dates and their corresponding transactions
Object.keys(transactionsByDate)
  .sort((a, b) => Moment(b, "YYYY-MM-DD").diff(Moment(a, "YYYY-MM-DD"))) // Sort dates in descending order
  .forEach((date) => {
    const sortedTransactions = transactionsByDate[date].sort(
      (a: any, b: any) => {
        return Moment(b.time, "HH:mm").diff(Moment(a.time, "HH:mm")); // Sort transactions by time
      }
    );

    restructuredData.push({
      date: date,
      data: sortedTransactions,
    });
  });






  return (data.length > 0 ?
    <SectionList
      keyExtractor={(item, index) => item._id || index.toString()}
      stickySectionHeadersEnabled={true}
      sections={restructuredData}
      renderItem={({item}) => (
        <HistoryTemplate
          Colors={Colors}
          loading={loading}
          getForYouPosts={getForYouPosts}
          customerMadeDepositToday={customerMadeDepositToday}
          data={item}
          languageText={languageText}
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
          {Moment(section.date).format("DD MMM, YYYY")}
        </Text>
      )}
      SectionSeparatorComponent={() => <View style={{height: 5}} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ff00ff"]}
        />
      }
    />:    <View
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              height: 400,
              paddingTop: 150,
            }}
          >
            <Text
              style={{fontSize: 18, fontWeight: 500, color: Colors.welcomeText}}
            >
              {languageText.text372}
            </Text>
          </View>
  )
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
  customerMadeDepositToday,
  data,
  languageText,
}: any) {
  console.log(data, "restructuredData");
  return (
    <IOScrollView
     
      contentContainerStyle={{}}
    >
      {customerMadeDepositToday === true ? (
       
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
                      source={data.championshipFlag}
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
                    {data.country} - {data.championship}
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
                        source={data.team1_flag}
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
                        source={data.team2_flag}
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
                    >
                      {data.status} :-
                    </Text>
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
                    <MaterialIcons
                      name='timer'
                      size={20}
                      color={Colors.welcomeText}
                    />
                  </View>
                </View>
              </View>
        
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
          <Text
            style={{fontSize: 18, fontWeight: 500, color: Colors.welcomeText}}
          >
            {languageText.text373}
          </Text>
        </View>
      )}
    </IOScrollView>
  );
}