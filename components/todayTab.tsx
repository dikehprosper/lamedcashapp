/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import SinglePostPreview from "./card/SinglePostPreview3";
import LoadingCard from "./card/LoadingCard";
import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
import { FontAwesome6 } from "@expo/vector-icons";

const Today = ({displayNotificationIn, following, data}: any) => {
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





const [customerMadeDepositToday, setCustomerMadeDepositToday] = useState<any>(true)
  

  return (
    <IOScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => getForYouPosts()}
          tintColor={Colors.default1}
        />
      }
      contentContainerStyle={{}}
    >
      {customerMadeDepositToday === true ? (
        data.length > 0 ? (
         data.map((data: any) => {
          return (
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
          );
         })
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
              {languageText.text372}
            </Text>
          </View>
        )
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
};

export default Today;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
