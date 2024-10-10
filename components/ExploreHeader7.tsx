/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import {Color} from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

// import { Link } from "@react-navigation/native";

// Get the screen height
const screenHeight = Dimensions.get("window").height;

// Calculate the percentage value
const percentageHeight = screenHeight * 0.075;
const ExploreHeader = () => {
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
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 26,
                        fontWeight: "800",
                        color: Colors.welcomeText,
                    }}
                >
                    Référence{" "}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: percentageHeight,
        backgroundColor: Color.background,
        paddingHorizontal: 24,
        justifyContent: "center",
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
