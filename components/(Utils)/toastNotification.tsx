/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useRef, useState} from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import {Color} from "@/constants/Colors";
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
const color: any = colorScheme.state;
const Colors = color === 2 ? Color.darkMode : Color.lightMode;

const ToastNotification = ({
  startPositionY,
  positionAnimationSpeed,
  children,
  text,
  show,
  icon,
  textColor,
  marginTop,
  backgroundColor,
}: any) => {
  const [show2, setShow2] = useState(false);
  const finalShow = show2 ? !show2 : !show;

  const translateYAnim = useRef(new Animated.Value(-400)).current;
  function showNotification() {
    Animated.parallel([
      Animated.spring(translateYAnim, {
        toValue: finalShow ? 0 : -400,
        useNativeDriver: true,
        speed: positionAnimationSpeed ? positionAnimationSpeed : 3,
      }),
    ]).start();
  }

  function closeFinalShow() {
    console.log("true");
    setShow2(true);
    setTimeout(() => {
      setShow2(false);
    }, 3000);
  }
  useEffect(() => {
    showNotification();
  });

  const styles = StyleSheet.create({
    container: {
      zIndex: 50,
    },
  });

  return (
    <Animated.View
      style={{
        transform: [{translateY: translateYAnim}],
        width: "100%",
        height: 90,
        position: "absolute",
        zIndex: 50,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: marginTop ? marginTop : 0,
      }}
    >
      <TouchableOpacity
        onPress={() => closeFinalShow()}
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.toastModalBackgroundColor,
          flex: 1,
          width: "100%",
          borderRadius: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          // elevation: 5, // For Android
          // shadowColor: "#000", // For iOS
          // shadowOffset: {
          //   width: 0,
          //   height: 10,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
        }}
      >
        <View style={{marginLeft: 15}}>
          <Text>{icon}</Text>
        </View>
        <View style={{marginLeft: 15, width: "80%"}}>
          <Text
            style={{
              fontWeight: "800",
              color: textColor,
              fontSize: 17,
              width: "100%", // Adjust width to match parent View's width
            }}
            numberOfLines={2} // Set maximum number of lines
            ellipsizeMode='tail' // Specify how text should be truncated if it overflows
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ToastNotification;
