/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Colors from "../../constants/Colors";
import {useState, useRef} from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  StyleSheet,
  Animated,
} from "react-native";

export default function OnboardingItem({item}: any) {
  const {width} = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        {
          width: width - 30,
          backgroundColor:
            item.id === "1" ? "purple" : item.id === "2" ? "blue" : "white",
        },
      ]}
    >
      {/* <Image
        source={Colors.background === "#0C121D" ? item.image2 : item.image}
        style={[styles.image, {width: 300, height: 400, resizeMode: "contain"}]}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
alignSelf: "center",
    borderRadius: 12,
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
});
