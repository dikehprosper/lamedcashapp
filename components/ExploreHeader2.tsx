/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import {Color} from "@/constants/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
// Get the screen height
const screenHeight = Dimensions.get("window").height;

// Calculate the percentage value
const percentageHeight = screenHeight * 0.075;
const ExploreHeader2 = ({name, description}: any) => {
   const colorScheme = useSelector(
       (state: RootState) => state.getUserData.colorScheme,
   );
   const Colors =
       parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    return (
        <SafeAreaView
            style={{
                paddingTop: 10,
                backgroundColor: Colors.background,
            }}
        >
            <StatusBar barStyle={Colors.statusBar} />
            <View>
                <View style={styles.container1}>
                    <View style={styles.actionRow1}>
                        {/* <Link href={"/(tabs)/profile"}>
              <MaterialIcons name='arrow-back-ios' size={24} color='white' />
            </Link> */}
                        <View style={styles.actionRow_1}>
                            <Text
                                style={[
                                    styles.actionRow_1_text1,
                                    { color: Colors.primary3 },
                                ]}
                            >
                                {name}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.actionRow_2,
                                {
                                    backgroundColor:
                                        Colors.betIdAllBackgroundColor,
                                },
                            ]}
                        >
                            {/* <Text style={styles.actionRow_2_text2}>
                {data?.betId}
              </Text> */}
                            <View
                                style={[
                                    styles.actionRow_2_background1,
                                    {
                                        backgroundColor:
                                            Colors.betIdBackgroundColor,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.actionRow_2_text1,
                                        { color: Colors.betIdTextColor },
                                    ]}
                                >
                                    4345677654
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.actionRow_2_background2,
                                    {
                                        backgroundColor:
                                            Colors.betIdBackgroundIconColor,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.actionRow_2_text2,
                                        { color: Colors.primary4 },
                                    ]}
                                >
                                    <MaterialIcons
                                        name="file-copy"
                                        size={14}
                                        color={Colors.primary4}
                                    />
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.actionRow2}>
                        <Text
                            style={[
                                styles.actionRow2_text1,
                                { color: Colors.primary4 },
                            ]}
                        >
                            {description}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container1: {
    height: percentageHeight,
    backgroundColor: "transparent",
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
  },
  actionRow1: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  actionRow_1: {
    flexDirection: "row",
    display: "flex",
    width: "auto",
    alignItems: "center",
  },
  actionRow_1_text1: {
    fontSize: 27,
    fontWeight: "bold",
   
  },
  actionRow_2: {
    flexDirection: "row",
    display: "flex",
    width: "auto",
    alignItems: "center",
    textAlign: "auto",
    borderRadius: 4,
    height: 23,

    borderWidth: 1,
    borderColor: "white",
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
    borderWidth: 1,
    borderColor: "white",
  },
  actionRow_2_text1: {
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
  actionRow2: {
    flexDirection: "row",
    display: "flex",
  },
  actionRow2_text1: {
    fontSize: 13,
    fontWeight: "400",

  },

  imageProfile: {
    width: 84,
    height: 25,
  },
  NotificationBox: {
    padding: 2.5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
  },
});

export default ExploreHeader2;
