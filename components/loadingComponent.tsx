/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {View} from "react-native";
import LottieView from "lottie-react-native";

const LoadingComponent = ({backgroundColor}: any) => {
  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        paddingLeft: 40,
        zIndex: 1000,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require(".././assets/images/loading.json")}
        style={{width: 240, height: 270, marginLeft: 75, marginTop: 30}}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingComponent;
