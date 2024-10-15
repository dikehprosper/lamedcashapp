/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

// import { Link } from "@react-navigation/native";

// Get the screen height
const screenHeight = Dimensions.get("window").height;

// Calculate the percentage value
const percentageHeight = screenHeight * 0.075;
const ExploreHeader = ({ displayNotification, props }: any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const imageSource =
        data.image !== ""
            ? { uri: data.image }
            : {
                  uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
              };

    return (
      <SafeAreaView
        style={{
          paddingTop: 10,
          backgroundColor: Colors.background,
        }}
      >
        <View style={[styles.container, {backgroundColor: Colors.background}]}>
          <View style={styles.actionRow}>
            <TouchableOpacity>
              <Image source={imageSource} style={styles.profileImage} />
            </TouchableOpacity>
            <View style={styles.overallactionRow_2}>
              {data.betId && 
              <View
                style={[
                  styles.actionRow_2,
                  {
                    backgroundColor: Colors.betIdAllBackgroundColor,
                  },
                ]}
              >
               
                <View
                  style={[
                    styles.actionRow_2_background1,
                    {
                      backgroundColor: Colors.betIdBackgroundColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.actionRow_2_text1,
                      {color: Colors.betIdTextColor},
                    ]}
                  >
                    {data.betId}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => displayNotification(data.betId)}
                  style={[
                    styles.actionRow_2_background2,
                    {
                      backgroundColor: Colors.betIdBackgroundIconColor,
                    },
                  ]}
                >
                  <Text
                    style={[styles.actionRow_2_text2, {color: Colors.primary4}]}
                  >
                    <MaterialIcons
                      name='file-copy'
                      size={14}
                      color={Colors.primary4}
                    />
                  </Text>
                </TouchableOpacity>
              </View>}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Notification")}
              >
                <View style={styles.NotificationBox}>
                  <MaterialIcons
                    name='notifications'
                    size={21}
                    color={Colors.welcomeText}
                  />
                </View>
                {/* <Image source={Logo} style={styles.imageProfile} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: percentageHeight,

        // alignContent: "center",
        // justifyContent: "center"
    },
    actionRow: {
        flexDirection: "row",
        margin: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    overallactionRow_2: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
    },
    actionRow_2: {
        flexDirection: "row",
        display: "flex",
        width: "auto",
        alignItems: "center",
        textAlign: "auto",
        borderRadius: 4,
        height: 23,
    },
    actionRow_2_background1: {
        display: "flex",
        paddingLeft: 6,
        height: 23,
        paddingRight: 6,
        flexDirection: "row",
        alignItems: "center",
        borderTopStartRadius: 4,
        borderBottomLeftRadius: 4,
    },
    actionRow_2_text1: {
        // fontFamily: "mon-b",
        fontWeight: "900",
    },
    actionRow_2_background2: {
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",

        height: 23,
        paddingRight: 6,
        paddingLeft: 6,
    },
    actionRow_2_text2: {
        alignSelf: "center",
    },
    imageProfile: {
        width: 84,
        height: 25,
    },
    NotificationBox: {
        padding: 2.5,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 4,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default ExploreHeader;
